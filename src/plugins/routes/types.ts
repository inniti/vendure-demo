import { ProductRouteStrategy } from "./strategies/product-route.strategy";

/**
 * @description
 * The plugin can be configured using the following options:
 */
export interface PluginInitOptions {
  productRouteStrategy?: ProductRouteStrategy;
}
