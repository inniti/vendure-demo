import {
  Button,
  DashboardRouteDefinition,
  ListPage,
  PageActionBarRight,
  DetailPageButton,
} from '@vendure/dashboard';
import { Link } from '@tanstack/react-router';
import { PlusIcon } from 'lucide-react';

// This function is generated for you by the `vendureDashboardPlugin` in your Vite config.
// It uses gql-tada to generate TypeScript types which give you type safety as you write
// your queries and mutations.
import { graphql } from '@/gql';

// The fields you select here will be automatically used to generate the appropriate columns in the
// data table below.
const getPageList = graphql(`
  query GetPages($options: PageListOptions) {
      pages(options: $options) {
          items {
              id
              createdAt
              updatedAt
              title
              slug
          }
      }
  }
`);

const deletePageList = graphql(`
  mutation DeletePage($id: ID!) {
      deletePage(id: $id) {
          result
      }
  }
`);

export const pageList: DashboardRouteDefinition = {
  navMenuItem: {
      sectionId: 'content-management',
      id: 'pages',
      url: '/pages',
      title: 'Pages',
  },
  path: '/pages',
  loader: () => ({
      breadcrumb: 'Pages',
  }),
  component: route => (
      <ListPage
          pageId="page-list"
          title="Pages"
          listQuery={getPageList}
          deleteMutation={deletePageList}
          route={route}
          customizeColumns={{
              title: {
                  cell: ({ row }) => {
                      const page = row.original;
                      return <DetailPageButton id={page.id} label={page.title} />;
                  },
              },
          }}
      >
          <PageActionBarRight>
              <Button asChild>
                  <Link to="./new">
                      <PlusIcon className="mr-2 h-4 w-4" />
                      New page
                  </Link>
              </Button>
          </PageActionBarRight>
      </ListPage>
  ),
};