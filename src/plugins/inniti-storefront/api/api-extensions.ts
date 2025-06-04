import gql from "graphql-tag";

export const shopApiExtensions = gql`
  extend type Query {
    findProductVariantByIdentifier(identifier: String!): ProductVariant
  }
`;
