import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import {
  Allow,
  Ctx,
  Permission,
  RequestContext,
  Transaction,
} from "@vendure/core";

import { InnitiStorefrontService } from "../services/inniti-storefront.service";

@Resolver()
export class FindProductVariantByIdentifierResolver {
  constructor(private innitiStorefrontService: InnitiStorefrontService) {}

  @Query()
  async findProductVariantByIdentifier(
    @Ctx() ctx: RequestContext,
    @Args() { identifier }: { identifier: string }
  ) {
    return this.innitiStorefrontService.findProductVariantByIdentifier(
      ctx,
      identifier
    );
  }
}
