import { CrawlerMetrics } from "./metrics/crawler-metrics.js";
import { PubSub } from "./pub-sub.js";

export const channels = {
  metrics: new PubSub<CrawlerMetrics>(),
  apiTiming: new PubSub<number>(),
  addToQueueTiming: new PubSub<number>(),
};
