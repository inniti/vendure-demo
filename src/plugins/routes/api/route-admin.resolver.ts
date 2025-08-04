import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import {
  DeletionResponse,
  Permission,
} from "@vendure/common/lib/generated-types";
import {
  Allow,
  Ctx,
  type ID,
  ListQueryOptions,
  PaginatedList,
  RelationPaths,
  Relations,
  RequestContext,
  Transaction,
} from "@vendure/core";
import { Route } from "../entities/route.entity";
import { RouteService } from "../services/route.service";

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
  entity?: string;
  entityId?: ID;
  // Define the input fields here
}

interface GenerateProductRoutesJobResponse {
  jobId: ID;
}

@Resolver()
export class RouteAdminResolver {
  constructor(private routeService: RouteService) {}

  @Query()
  @Allow(Permission.SuperAdmin)
  async route(
    @Ctx() ctx: RequestContext,
    @Args() args: { id: ID },
    @Relations(Route) relations: RelationPaths<Route>
  ): Promise<Route | null> {
    return this.routeService.findOne(ctx, args.id, relations);
  }

  @Query()
  @Allow(Permission.SuperAdmin)
  async routeByPath(
    @Ctx() ctx: RequestContext,
    @Args() args: { path: string },
    @Relations(Route) relations: RelationPaths<Route>
  ): Promise<Route | null> {
    return this.routeService.findOneByPath(ctx, args.path, relations);
  }

  @Query()
  @Allow(Permission.SuperAdmin)
  async routes(
    @Ctx() ctx: RequestContext,
    @Args() args: { options: ListQueryOptions<Route> },
    @Relations(Route) relations: RelationPaths<Route>
  ): Promise<PaginatedList<Route>> {
    return this.routeService.findAll(ctx, args.options || undefined, relations);
  }

  @Mutation()
  @Transaction()
  @Allow(Permission.SuperAdmin)
  async createRoute(
    @Ctx() ctx: RequestContext,
    @Args() args: { input: CreateRouteInput }
  ): Promise<Route> {
    return this.routeService.create(ctx, args.input);
  }

  @Mutation()
  @Transaction()
  @Allow(Permission.SuperAdmin)
  async updateRoute(
    @Ctx() ctx: RequestContext,
    @Args() args: { input: UpdateRouteInput }
  ): Promise<Route> {
    return this.routeService.update(ctx, args.input);
  }

  @Mutation()
  @Transaction()
  @Allow(Permission.SuperAdmin)
  async deleteRoute(
    @Ctx() ctx: RequestContext,
    @Args() args: { id: ID }
  ): Promise<DeletionResponse> {
    return this.routeService.delete(ctx, args.id);
  }

  @Mutation()
  @Transaction()
  @Allow(Permission.SuperAdmin)
  async generateProductRoutes(
    @Ctx() ctx: RequestContext,
    @Args() args: {}
  ): Promise<GenerateProductRoutesJobResponse> {
    const job = await this.routeService.generateProductRoutes(ctx);

    return {
      jobId: job.id as ID,
    };
  }
}
