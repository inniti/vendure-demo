import { ModuleRef } from "@nestjs/core";
import {
  Injector,
  PluginCommonModule,
  Type,
  VendurePlugin,
} from "@vendure/core";
import { adminApiExtensions, shopApiExtensions } from "./api/api-extensions";
import { RouteAdminResolver } from "./api/route-admin.resolver";
import { RouteShopResolver } from "./api/route-shop.resolver";
import { ROUTES_PLUGIN_OPTIONS } from "./constants";
import { Route } from "./entities/route.entity";
import { RouteService } from "./services/route.service";
import { DefaultProductRouteStrategy } from "./strategies/default-product-route.strategy";
import { PluginInitOptions } from "./types";

@VendurePlugin({
  imports: [PluginCommonModule],
  providers: [
    { provide: ROUTES_PLUGIN_OPTIONS, useFactory: () => RoutesPlugin.options },
    RouteService,
  ],
  configuration: (config) => {
    // Plugin-specific configuration
    // such as custom fields, custom permissions,
    // strategies etc. can be configured here by
    // modifying the `config` object.
    return config;
  },
  compatibility: "^3.4.0",
  entities: [Route],
  adminApiExtensions: {
    schema: adminApiExtensions,
    resolvers: [RouteAdminResolver],
  },
  shopApiExtensions: {
    schema: shopApiExtensions,
    resolvers: [RouteShopResolver],
  },
})
export class RoutesPlugin {
  static options: PluginInitOptions;

  constructor(private moduleRef: ModuleRef) {}

  static init(options: PluginInitOptions): Type<RoutesPlugin> {
    this.options = {
      productRouteStrategy: new DefaultProductRouteStrategy(),
      ...options,
    };
    return RoutesPlugin;
  }

  async onApplicationBootstrap() {
    await this.initStrategy();
  }

  async onApplicationShutdown() {
    await this.destroyStrategy();
  }

  private async initStrategy() {
    const strategy = RoutesPlugin.options.productRouteStrategy;
    if (strategy && typeof strategy.init === "function") {
      const injector = new Injector(this.moduleRef);
      await strategy.init(injector);
    }
  }

  private async destroyStrategy() {
    const strategy = RoutesPlugin.options.productRouteStrategy;
    if (strategy && typeof strategy.destroy === "function") {
      await strategy.destroy();
    }
  }
}
