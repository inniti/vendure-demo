import { InjectableStrategy, Product } from "@vendure/core";

export interface ProductRouteStrategy extends InjectableStrategy {
    getPath(product: Product): Promise<string>;
}