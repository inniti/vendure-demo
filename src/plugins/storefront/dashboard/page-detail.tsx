import {
  DashboardRouteDefinition,
  detailPageRouteLoader,
  useDetailPage,
  Page,
  PageTitle,
  PageActionBar,
  PageActionBarRight,
  PermissionGuard,
  Button,
  PageLayout,
  PageBlock,
  FormFieldWrapper,
  DetailFormGrid,
  Switch,
  Input,
  DateTimeInput,
  RichTextInput,
  CustomFieldsPageBlock,
  DetailPage,
} from "@vendure/dashboard";
import { AnyRoute, useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";

import { graphql } from "@/gql";

const pageDetailDocument = graphql(`
  query GetPageDetail($id: ID!) {
    page(id: $id) {
      id
      createdAt
      updatedAt
      title
      slug
      content
      customFields
      publishFrom
      translations {
        languageCode
        title
        slug
        content
      }
    }
  }
`);

const createPageDocument = graphql(`
  mutation CreatePage($input: CreatePageInput!) {
    createPage(input: $input) {
      id
    }
  }
`);

const updatePageDocument = graphql(`
  mutation UpdatePage($input: UpdatePageInput!) {
    updatePage(input: $input) {
      id
    }
  }
`);

function PageDetailPage({ route }: { route: AnyRoute }) {
  const params = route.useParams();
  const navigate = useNavigate();
  const creatingNewEntity = params.id === "new";

  const { form, submitHandler, entity, isPending, resetForm } = useDetailPage({
    queryDocument: pageDetailDocument,
    createDocument: createPageDocument,
    updateDocument: updatePageDocument,
    setValuesForUpdate: (page) => {
      let content = "";
      if (page?.content) {
        try {
          content = JSON.stringify(page.content, null, 2);
        } catch (err) {
          console.warn("Invalid json");
        }
      }

      return {
        id: page?.id ?? "",
        title: page?.title ?? "",
        slug: page?.slug ?? "",
        content,
        publishFrom: page?.publishFrom ?? null,
        translations: page?.translations ?? [],
      };
    },
    params: { id: params.id },
    onSuccess: async (data) => {
      toast("Successfully updated page");
      resetForm();
      if (creatingNewEntity) {
        await navigate({ to: `../$id`, params: { id: data.id } });
      }
    },
    onError: (err) => {
      toast("Failed to update page", {
        description: err instanceof Error ? err.message : "Unknown error",
      });
    },
  });

  return (
    <Page pageId="page-detail" form={form} submitHandler={submitHandler}>
      <PageTitle>
        {creatingNewEntity ? "New page" : (entity?.title ?? "")}
      </PageTitle>
      <PageActionBar>
        <PageActionBarRight>
          <PermissionGuard
            requires={
              [
                /* Custom permissions */
              ]
            }
          >
            <Button
              type="submit"
              disabled={
                !form.formState.isDirty || !form.formState.isValid || isPending
              }
            >
              Update
            </Button>
          </PermissionGuard>
        </PageActionBarRight>
      </PageActionBar>
      <PageLayout>
        <PageBlock column="side" blockId="publish-from">
          <FormFieldWrapper
            control={form.control}
            name="publishFrom"
            label="Publish from"
            render={({ field }) => <DateTimeInput {...field} />}
          />
        </PageBlock>
        <PageBlock column="main" blockId="main-form">
          <DetailFormGrid>
            <FormFieldWrapper
              control={form.control}
              name="title"
              label="Title"
              render={({ field }) => <Input {...field} />}
            />
            <FormFieldWrapper
              control={form.control}
              name="slug"
              label="Slug"
              render={({ field }) => <Input {...field} />}
            />
          </DetailFormGrid>
          <FormFieldWrapper
            control={form.control}
            name="content"
            label="Content"
            render={({ field }) => (
              <textarea value={field.value ?? ""} onChange={field.onChange} />
            )}
          />
        </PageBlock>
        <CustomFieldsPageBlock
          column="main"
          entityType="Page"
          control={form.control}
        />
      </PageLayout>
    </Page>
  );
}

export const pageDetail: DashboardRouteDefinition = {
  path: "/pages/$id",
  loader: detailPageRouteLoader({
    queryDocument: pageDetailDocument,
    breadcrumb: (isNew, entity) => [
      { path: "/pages", label: "Pages" },
      isNew ? "New page" : entity?.title,
    ],
  }),
  component: (route) => {
    return <PageDetailPage route={route} />;
  },

  // component: (route) => {
  //   return (
  //     <DetailPage
  //       pageId="page-detail"
  //       queryDocument={pageDetailDocument}
  //       createDocument={createPageDocument}
  //       updateDocument={updatePageDocument}
  //       route={route}
  //       title={(page) => page?.title ?? "New page"}
  //       setValuesForUpdate={(page) => {
  //         return {
  //           id: page?.id ?? "",
  //           title: page?.title ?? "",
  //           slug: page?.slug ?? "",
  //           content: page?.content ?? "",
  //         };
  //       }}
  //     />
  //   );
  // },
};
