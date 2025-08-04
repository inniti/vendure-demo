import { Injector, Logger, ProductService, Product } from "@vendure/core";
import { loggerCtx } from "../constants";
import { ProductRouteStrategy } from "./product-route.strategy";

export class DefaultProductRouteStrategy implements ProductRouteStrategy {
  private productService: ProductService;

  async init(injector: Injector): Promise<void> {
    this.productService = injector.get(ProductService);

    Logger.info("DefaultProductPathStrategy initialized", loggerCtx);
  }

  async getPath(product: Product): Promise<string> {
    return `/p/${product.slug}`;
  }
}
