import { CrawlerMetrics } from "./metrics/crawler-metrics";
import _ from "lodash";

export class MetricPubSub {
  private static currItem: CrawlerMetrics;
  private static subscriptions: ((metrics: CrawlerMetrics) => void)[] = [];
  static pushMetrics(metrics: CrawlerMetrics) {
    MetricPubSub.currItem = metrics;
    _.forEach(this.subscriptions, (fn) => fn(MetricPubSub.currItem));
  }

  static subscribe(callback: (metrics: CrawlerMetrics) => void) {
    MetricPubSub.subscriptions.push(callback);
  }
}
