import { useEffect, useState } from "react";
import { MetricPubSub } from "../packages/utils/metric-pub-sub.js";
import { CrawlerMetrics } from "../crawler/crawler-metrics.js";

export function useMetrics() {
  const [metrics, setMetrics] = useState<CrawlerMetrics>({
    queueSize: 0,
    numProcessedPages: 0,
  });

  const overrideSet = (metrics: CrawlerMetrics) => {
    //console.log(`setting metrics to: ${JSON.stringify(metrics)}`);
    setMetrics(metrics);
  };

  useEffect(() => {
    MetricPubSub.subscribe(overrideSet);
  }, []);

  return metrics;
}
