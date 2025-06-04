import { PluginCommonModule, Type, VendurePlugin } from "@vendure/core";
import { shopApiExtensions } from "./api/api-extensions";
import { INNITI_STOREFRONT_PLUGIN_OPTIONS } from "./constants";
import { InnitiStorefrontService } from "./services/inniti-storefront.service";
import { PluginInitOptions } from "./types";
import { FindProductVariantByIdentifierResolver } from "./api/resolvers";

@VendurePlugin({
  imports: [PluginCommonModule],
  providers: [
    {
      provide: INNITI_STOREFRONT_PLUGIN_OPTIONS,
      useFactory: () => InnitiStorefrontPlugin.options,
    },
    InnitiStorefrontService,
  ],
  configuration: (config) => {
    // Plugin-specific configuration
    // such as custom fields, custom permissions,
    // strategies etc. can be configured here by
    // modifying the `config` object.
    return config;
  },
  shopApiExtensions: {
    schema: shopApiExtensions,
    resolvers: [FindProductVariantByIdentifierResolver],
  },
  compatibility: "^3.0.0",
})
export class InnitiStorefrontPlugin {
  static options: PluginInitOptions;

  static init(options: PluginInitOptions): Type<InnitiStorefrontPlugin> {
    this.options = options;
    return InnitiStorefrontPlugin;
  }
}
