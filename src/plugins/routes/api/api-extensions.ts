import gql from "graphql-tag";

const routeAdminApiExtensions = gql`
  type Route implements Node {
    id: ID!
    createdAt: DateTime!
    updatedAt: DateTime!
    path: String!
    entity: String!
    entityId: Int!
    channels: [Channel!]!
  }

  type RouteList implements PaginatedList {
    items: [Route!]!
    totalItems: Int!
  }

  type GenerateProductRoutesResponse {
    jobId: ID!
  }

  # Generated at run-time by Vendure
  input RouteListOptions

  extend type Query {
    route(id: ID!): Route
    routeByPath(path: String!): Route
    routes(options: RouteListOptions): RouteList!
  }

  input CreateRouteInput {
    path: String!
    entity: String!
    entityId: Int!
  }

  input UpdateRouteInput {
    id: ID!
    path: String
  }

  extend type Mutation {
    createRoute(input: CreateRouteInput!): Route!
    updateRoute(input: UpdateRouteInput!): Route!
    deleteRoute(id: ID!): DeletionResponse!
    generateProductRoutes: GenerateProductRoutesResponse!
  }
`;
export const adminApiExtensions = gql`
  ${routeAdminApiExtensions}
`;

const routeShopApiExtensions = gql`
  type Route implements Node {
    id: ID!
    createdAt: DateTime!
    updatedAt: DateTime!
    path: String!
    entity: String!
    entityId: Int!
  }

  extend type Query {
    routeByPath(path: String!): Route
  }
`;

export const shopApiExtensions = gql`
  ${routeShopApiExtensions}
`;
