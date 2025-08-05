import { defineDashboardExtension } from "@vendure/dashboard";
import { FileTextIcon } from "lucide-react";
import { pageList } from "./page-list";
import { pageDetail } from "./page-detail";

export default defineDashboardExtension({
  routes: [pageList, pageDetail],
  navSections: [
    {
      id: "content-management",
      title: "Content",
      icon: FileTextIcon,
      order: 350,
    },
  ],
  pageBlocks: [],
  actionBarItems: [],
  alerts: [],
  widgets: [],
  customFormComponents: {},
  dataTables: [],
  detailForms: [],
  login: {},
});
