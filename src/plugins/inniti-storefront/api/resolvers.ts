import { Args, Query, Resolver } from "@nestjs/graphql";
import { Ctx, RequestContext } from "@vendure/core";

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
