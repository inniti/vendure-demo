import { Inject, Injectable } from "@nestjs/common";
import {
  ProductVariantService,
  RequestContext,
  TransactionalConnection,
} from "@vendure/core";
import { INNITI_STOREFRONT_PLUGIN_OPTIONS } from "../constants";
import { PluginInitOptions } from "../types";

@Injectable()
export class InnitiStorefrontService {
  constructor(
    private connection: TransactionalConnection,
    private productVariantService: ProductVariantService,
    @Inject(INNITI_STOREFRONT_PLUGIN_OPTIONS) private options: PluginInitOptions
  ) {}

  async findProductVariantByIdentifier(
    ctx: RequestContext,
    identifier: string
  ) {
    const fieldFilters = (
      this.options.searchShortcut?.fields || ["id", "sku"]
    ).map((field) => {
      return {
        [field]: {
          eq: identifier,
        },
      };
    });

    const result = await this.productVariantService.findAll(ctx, {
      filter: {
        _or: fieldFilters,
      },
    });
    return result?.items?.[0] || null;
  }
}
