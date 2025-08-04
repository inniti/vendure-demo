import { Inject, Injectable, OnModuleInit } from "@nestjs/common";
import {
  DeletionResponse,
  DeletionResult,
} from "@vendure/common/lib/generated-types";
import type { ID, PaginatedList } from "@vendure/common/lib/shared-types";
import {
  ListQueryBuilder,
  ListQueryOptions,
  RelationPaths,
  RequestContext,
  TransactionalConnection,
  assertFound,
  patchEntity,
  ChannelService,
  JobQueue,
  JobQueueService,
  ProductService,
  Logger,
  RequestContextService,
  Job,
  Product,
  ProductTranslation,
} from "@vendure/core";
import { ROUTES_PLUGIN_OPTIONS, loggerCtx } from "../constants";
import { Route } from "../entities/route.entity";
import { PluginInitOptions } from "../types";

// These can be replaced by generated types if you set up code generation
interface CreateRouteInput {
  path: string;
  entity: string;
  entityId: number;
  // Define the input fields here
}
interface UpdateRouteInput {
  id: ID;
  path?: string;
  // Define the input fields here
}

@Injectable()
export class RouteService implements OnModuleInit {
  private generateProductRoutesJobQueue: JobQueue<{ batchSize: number }>;

  constructor(
    private jobQueueService: JobQueueService,
    private connection: TransactionalConnection,
    private listQueryBuilder: ListQueryBuilder,
    private channelService: ChannelService,
    private productService: ProductService,
    private requestContextService: RequestContextService,
    @Inject(ROUTES_PLUGIN_OPTIONS) private options: PluginInitOptions
  ) {}

  private async processGenerateProductRoutes(batchSize = 100) {
    const strategy = this.options.productRouteStrategy;

    if (!strategy) {
      Logger.error("Product route strategy not defined", loggerCtx);
      return;
    }

    const ctx = await this.requestContextService.create({
      apiType: "admin",
    });

    const productRepository = this.connection.getRepository(ctx, Product);

    const queryBuilder = productRepository.createQueryBuilder();
    queryBuilder.select(["product.id"]);
    queryBuilder.leftJoinAndSelect(
      Route,
      "route",
      "route.entityId = product.id AND route.entity = 'product'"
    );
    queryBuilder.where("route.id IS NULL");
    queryBuilder.limit(batchSize);
    queryBuilder.offset(0);

    const total = await queryBuilder.getCount();

    const batches = Math.ceil(total / batchSize);

    let created = 0;

    for (let i = 0; i < batches; i++) {
      queryBuilder.offset(i * batchSize);
      const result = await queryBuilder.getRawAndEntities();

      for (const raw of result.raw) {
        const product = await this.productService.findOne(ctx, raw.id);

        const path = await strategy.getPath(product!);

        const route = await this.create(ctx, {
          path,
          entity: "product",
          entityId: +product!.id,
        });

        Logger.debug(
          `Created route ${route.id} for product ${product!.id}`,
          loggerCtx
        );

        created++;
      }
    }

    return { total, created };
  }

  async onModuleInit() {
    this.generateProductRoutesJobQueue = await this.jobQueueService.createQueue(
      {
        name: "generate-product-routes",
        process: async (job) => {
          return this.processGenerateProductRoutes(job.data.batchSize);
        },
      }
    );
  }

  findAll(
    ctx: RequestContext,
    options?: ListQueryOptions<Route>,
    relations?: RelationPaths<Route>
  ): Promise<PaginatedList<Route>> {
    return this.listQueryBuilder
      .build(Route, options, {
        relations,
        ctx,
        channelId: ctx.channelId,
      })
      .getManyAndCount()
      .then(([items, totalItems]) => {
        return {
          items,
          totalItems,
        };
      });
  }

  findOne(
    ctx: RequestContext,
    id: ID,
    relations?: RelationPaths<Route>
  ): Promise<Route | null> {
    return this.connection.getRepository(ctx, Route).findOne({
      where: { id, channels: { id: ctx.channelId } },
      relations,
    });
  }

  findOneByPath(
    ctx: RequestContext,
    path: string,
    relations?: RelationPaths<Route>
  ): Promise<Route | null> {
    return this.connection.getRepository(ctx, Route).findOne({
      where: { path, channels: { id: ctx.channelId } },
      relations,
    });
  }

  async create(ctx: RequestContext, input: CreateRouteInput): Promise<Route> {
    const newRoute = new Route(input);

    await this.channelService.assignToCurrentChannel(newRoute, ctx);

    const newEntity = await this.connection
      .getRepository(ctx, Route)
      .save(newRoute);

    return assertFound(this.findOne(ctx, newEntity.id));
  }

  async update(ctx: RequestContext, input: UpdateRouteInput): Promise<Route> {
    const entity = await this.connection.getEntityOrThrow(ctx, Route, input.id);
    const updatedEntity = patchEntity(entity, input);
    await this.connection
      .getRepository(ctx, Route)
      .save(updatedEntity, { reload: false });
    return assertFound(this.findOne(ctx, updatedEntity.id));
  }

  async delete(ctx: RequestContext, id: ID): Promise<DeletionResponse> {
    const entity = await this.connection.getEntityOrThrow(ctx, Route, id);
    try {
      await this.connection.getRepository(ctx, Route).remove(entity);
      return {
        result: DeletionResult.DELETED,
      };
    } catch (e: any) {
      return {
        result: DeletionResult.NOT_DELETED,
        message: e.toString(),
      };
    }
  }

  async generateProductRoutes(ctx: RequestContext) {
    return this.generateProductRoutesJobQueue.add({
      batchSize: 100,
    });
  }
}
