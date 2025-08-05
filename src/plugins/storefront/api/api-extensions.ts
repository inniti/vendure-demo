import gql from "graphql-tag";

const pageAdminApiExtensions = gql`
  type PageTranslation {
    id: ID!
    createdAt: DateTime!
    updatedAt: DateTime!
    languageCode: LanguageCode!
    title: String!
    slug: String!
    content: JSON!
  }

  type Page implements Node {
    id: ID!
    createdAt: DateTime!
    updatedAt: DateTime!
    title: String!
    slug: String!
    content: JSON!
    publishFrom: DateTime
    translations: [PageTranslation!]!
  }

  type PageList implements PaginatedList {
    items: [Page!]!
    totalItems: Int!
  }

  # Generated at run-time by Vendure
  input PageListOptions

  extend type Query {
    page(id: ID!): Page
    pages(options: PageListOptions): PageList!
  }

  input PageTranslationInput {
    id: ID
    languageCode: LanguageCode!
    title: String
    slug: String
    content: JSON!
  }

  input CreatePageInput {
    title: String!
    slug: String!
    content: JSON!
    translations: [PageTranslationInput!]!
    publishFrom: DateTime
  }

  input UpdatePageInput {
    id: ID!
    title: String
    slug: String
    content: JSON
    translations: [PageTranslationInput!]
    publishFrom: DateTime
  }

  extend type Mutation {
    createPage(input: CreatePageInput!): Page!
    updatePage(input: UpdatePageInput!): Page!
    deletePage(id: ID!): DeletionResponse!
  }
`;
export const adminApiExtensions = gql`
  ${pageAdminApiExtensions}
`;
