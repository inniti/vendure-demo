import { PluginCommonModule, Type, VendurePlugin } from "@vendure/core";

import { adminApiExtensions } from "./api/api-extensions";
import { PageAdminResolver } from "./api/page-admin.resolver";
import { STOREFRONT_PLUGIN_OPTIONS } from "./constants";
import { PageTranslation } from "./entities/page-translation.entity";
import { Page } from "./entities/page.entity";
import { PageService } from "./services/page.service";
import { PluginInitOptions } from "./types";

@VendurePlugin({
  imports: [PluginCommonModule],
  providers: [
    {
      provide: STOREFRONT_PLUGIN_OPTIONS,
      useFactory: () => StorefrontPlugin.options,
    },
    PageService,
  ],
  configuration: (config) => {
    // Plugin-specific configuration
    // such as custom fields, custom permissions,
    // strategies etc. can be configured here by
    // modifying the `config` object.
    return config;
  },
  compatibility: "^3.4.0",
  entities: [Page, PageTranslation],
  adminApiExtensions: {
    schema: adminApiExtensions,
    resolvers: [PageAdminResolver],
  },
  dashboard: "./dashboard/index.tsx",
})
export class StorefrontPlugin {
  static options: PluginInitOptions;

  static init(options: PluginInitOptions): Type<StorefrontPlugin> {
    this.options = options;
    return StorefrontPlugin;
  }
}
