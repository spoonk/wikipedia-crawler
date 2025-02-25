import { CrawlerMetrics } from "./messages/crawler-metrics.js";
import { PageUpdate } from "./messages/page-updates.js";
import { PubSub } from "./pub-sub.js";

export const channels = {
  metrics: new PubSub<CrawlerMetrics>(),
  apiTiming: new PubSub<number>(),
  addToQueueTiming: new PubSub<number>(),
  lastPages: new PubSub<PageUpdate[]>(),
};
