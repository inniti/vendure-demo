import { Inject, Injectable } from "@nestjs/common";
import {
  DeletionResponse,
  DeletionResult,
} from "@vendure/common/lib/generated-types";
import {
  CustomFieldsObject,
  ID,
  PaginatedList,
} from "@vendure/common/lib/shared-types";
import {
  CustomFieldRelationService,
  ListQueryBuilder,
  ListQueryOptions,
  RelationPaths,
  RequestContext,
  TransactionalConnection,
  TranslatableSaver,
  Translated,
  TranslationInput,
  TranslatorService,
  assertFound,
} from "@vendure/core";
import { STOREFRONT_PLUGIN_OPTIONS } from "../constants";
import { PageTranslation } from "../entities/page-translation.entity";
import { Page } from "../entities/page.entity";
import { PluginInitOptions } from "../types";

// These can be replaced by generated types if you set up code generation
interface CreatePageInput {
  customFields?: CustomFieldsObject;
  translations: Array<TranslationInput<Page>>;
  publishFrom: Date | null;
}
interface UpdatePageInput {
  id: ID;
  customFields?: CustomFieldsObject;
  translations: Array<TranslationInput<Page>>;
  publishFrom: Date | null;
}

@Injectable()
export class PageService {
  constructor(
    private connection: TransactionalConnection,
    private translatableSaver: TranslatableSaver,
    private listQueryBuilder: ListQueryBuilder,
    private customFieldRelationService: CustomFieldRelationService,
    private translator: TranslatorService,
    @Inject(STOREFRONT_PLUGIN_OPTIONS) private options: PluginInitOptions
  ) {}

  findAll(
    ctx: RequestContext,
    options?: ListQueryOptions<Page>,
    relations?: RelationPaths<Page>
  ): Promise<PaginatedList<Translated<Page>>> {
    return this.listQueryBuilder
      .build(Page, options, {
        relations,
        ctx,
      })
      .getManyAndCount()
      .then(([items, totalItems]) => {
        return {
          items: items.map((item) => this.translator.translate(item, ctx)),
          totalItems,
        };
      });
  }

  findOne(
    ctx: RequestContext,
    id: ID,
    relations?: RelationPaths<Page>
  ): Promise<Translated<Page> | null> {
    return this.connection
      .getRepository(ctx, Page)
      .findOne({
        where: { id },
        relations,
      })
      .then((entity) => entity && this.translator.translate(entity, ctx));
  }

  async create(
    ctx: RequestContext,
    input: CreatePageInput
  ): Promise<Translated<Page>> {
    const newEntity = await this.translatableSaver.create({
      ctx,
      input,
      entityType: Page,
      translationType: PageTranslation,
      beforeSave: async (f) => {
        // Any pre-save logic can go here
      },
    });
    await this.customFieldRelationService.updateRelations(
      ctx,
      Page,
      input,
      newEntity
    );
    return assertFound(this.findOne(ctx, newEntity.id));
  }

  async update(
    ctx: RequestContext,
    input: UpdatePageInput
  ): Promise<Translated<Page>> {
    const updatedEntity = await this.translatableSaver.update({
      ctx,
      input,
      entityType: Page,
      translationType: PageTranslation,
      beforeSave: async (f) => {
        // Any pre-save logic can go here
      },
    });
    await this.customFieldRelationService.updateRelations(
      ctx,
      Page,
      input,
      updatedEntity
    );
    return assertFound(this.findOne(ctx, updatedEntity.id));
  }

  async delete(ctx: RequestContext, id: ID): Promise<DeletionResponse> {
    const entity = await this.connection.getEntityOrThrow(ctx, Page, id);
    try {
      await this.connection.getRepository(ctx, Page).remove(entity);
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
}
