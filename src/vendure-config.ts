import { AdminUiPlugin } from "@vendure/admin-ui-plugin";
import { AssetServerPlugin } from "@vendure/asset-server-plugin";
import {
  cleanSessionsTask,
  DefaultJobQueuePlugin,
  DefaultSchedulerPlugin,
  DefaultSearchPlugin,
  dummyPaymentHandler,
  VendureConfig,
} from "@vendure/core";
import {
  defaultEmailHandlers,
  EmailPlugin,
  FileBasedTemplateLoader,
} from "@vendure/email-plugin";
import { HardenPlugin } from "@vendure/harden-plugin";
import path from "path";
import { DemoModePlugin } from "./plugins/demo-mode/demo-mode-plugin";
import { LandingPagePlugin } from "./plugins/landing-page/landing-page-plugin";

const PUBLIC_URL = process.env.PUBLIC_URL;
const STOREFRONT_URL = process.env.STOREFRONT_URL;

export const config: VendureConfig = {
  apiOptions: {
    port: 3000,
    adminApiPath: "admin-api",
    shopApiPath: "shop-api",
    adminApiPlayground: {
      settings: { "request.credentials": "include" },
    },
    adminApiDebug: true,
    shopApiPlayground: {
      settings: { "request.credentials": "include" },
    },
    shopApiDebug: true,
  },
  authOptions: {
    cookieOptions: {
      secret: "asdfjklö",
    },
    requireVerification: true,
    tokenMethod: ["cookie", "bearer"],
    superadminCredentials: {
      identifier: process.env.SUPERADMIN_USERNAME ?? "superadmin",
      password: process.env.SUPERADMIN_PASSWORD ?? "superadmin",
    },
  },
  dbConnectionOptions: {
    type: "better-sqlite3",
    synchronize: false,
    logging: false,
    database: path.join(__dirname, "../vendure.sqlite"),
  },
  paymentOptions: {
    paymentMethodHandlers: [dummyPaymentHandler],
  },
  customFields: {},
  plugins: [
    DefaultSchedulerPlugin.init(),
    DefaultJobQueuePlugin,
    AssetServerPlugin.init({
      route: "assets",
      assetUploadDir: path.join(__dirname, "../static/assets"),
      assetUrlPrefix: `${PUBLIC_URL}/assets/`,
    }),
    EmailPlugin.init({
      route: "mailbox",
      handlers: defaultEmailHandlers,
      templateLoader: new FileBasedTemplateLoader(
        path.join(__dirname, "../static/email/templates")
      ),
      outputPath: path.join(__dirname, "../static/email/output"),
      globalTemplateVars: {
        fromAddress: '"inniti Storefront Template" <hey@inniti.de>',
        verifyEmailAddressUrl: `${STOREFRONT_URL}/registration/verify`,
        passwordResetUrl: `${STOREFRONT_URL}/account/reset-password`,
        changeEmailAddressUrl: `${STOREFRONT_URL}/account/change-email-address`,
      },
      devMode: true,
    }),
    DefaultSearchPlugin,
    AdminUiPlugin.init({
      route: "admin",
      port: 3002,
      adminUiConfig: {
        apiHost: "auto",
        apiPort: "auto",
      },
    }),
    LandingPagePlugin,
    DemoModePlugin,
    HardenPlugin.init({
      maxQueryComplexity: 10000,
      hideFieldSuggestions: false,
      apiMode: "dev",
    }),
  ],
  schedulerOptions: {
    tasks: [
      cleanSessionsTask.configure({
        params: {
          batchSize: 100,
        },
      }),
    ],
  },
};
