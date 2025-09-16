import { bootstrap } from "@vendure/core";
import { config } from "./vendure-config";

bootstrap(config).catch(console.error);
