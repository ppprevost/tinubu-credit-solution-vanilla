import { setupWorker } from "msw/browser";
import {
  searchBrokersByName,
  getBroker,
  postBroker,
  patchBroker,
} from "./handlers";

export const worker = setupWorker(
  searchBrokersByName,
  getBroker,
  postBroker,
  patchBroker
);
