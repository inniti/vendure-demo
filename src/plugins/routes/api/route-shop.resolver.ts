import { Args, Query, Resolver } from "@nestjs/graphql";
import { Permission } from "@vendure/common/lib/generated-types";
import {
  Allow,
  Ctx,
  RelationPaths,
  Relations,
  RequestContext,
} from "@vendure/core";
import { Route } from "../entities/route.entity";
import { RouteService } from "../services/route.service";

@Resolver()
export class RouteShopResolver {
  constructor(private routeService: RouteService) {}

  @Query()
  @Allow(Permission.Public)
  async routeByPath(
    @Ctx() ctx: RequestContext,
    @Args() args: { path: string },
    @Relations(Route) relations: RelationPaths<Route>
  ): Promise<Route | null> {
    return this.routeService.findOneByPath(ctx, args.path, relations);
  }
}
