import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import {
  DeletionResponse,
  Permission,
} from "@vendure/common/lib/generated-types";
import { CustomFieldsObject } from "@vendure/common/lib/shared-types";
import {
  Allow,
  Ctx,
  ID,
  ListQueryOptions,
  PaginatedList,
  RelationPaths,
  Relations,
  RequestContext,
  Transaction,
  TranslationInput,
} from "@vendure/core";
import { Page } from "../entities/page.entity";
import { PageService } from "../services/page.service";

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

@Resolver()
export class PageAdminResolver {
  constructor(private pageService: PageService) {}

  @Query()
  @Allow(Permission.SuperAdmin)
  async page(
    @Ctx() ctx: RequestContext,
    @Args() args: { id: ID },
    @Relations(Page) relations: RelationPaths<Page>
  ): Promise<Page | null> {
    return this.pageService.findOne(ctx, args.id, relations);
  }

  @Query()
  @Allow(Permission.SuperAdmin)
  async pages(
    @Ctx() ctx: RequestContext,
    @Args() args: { options: ListQueryOptions<Page> },
    @Relations(Page) relations: RelationPaths<Page>
  ): Promise<PaginatedList<Page>> {
    return this.pageService.findAll(ctx, args.options || undefined, relations);
  }

  @Mutation()
  @Transaction()
  @Allow(Permission.SuperAdmin)
  async createPage(
    @Ctx() ctx: RequestContext,
    @Args() args: { input: CreatePageInput }
  ): Promise<Page> {
    return this.pageService.create(ctx, args.input);
  }

  @Mutation()
  @Transaction()
  @Allow(Permission.SuperAdmin)
  async updatePage(
    @Ctx() ctx: RequestContext,
    @Args() args: { input: UpdatePageInput }
  ): Promise<Page> {
    return this.pageService.update(ctx, args.input);
  }

  @Mutation()
  @Transaction()
  @Allow(Permission.SuperAdmin)
  async deletePage(
    @Ctx() ctx: RequestContext,
    @Args() args: { id: ID }
  ): Promise<DeletionResponse> {
    return this.pageService.delete(ctx, args.id);
  }
}
