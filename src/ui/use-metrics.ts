import { useEffect, useState } from "react";
import { MetricPubSub } from "../packages/utils/metric-pub-sub.js";
import { CrawlerMetrics } from "../packages/utils/metrics/crawler-metrics.js";

export function useMetrics() {
  const [metrics, setMetrics] = useState<CrawlerMetrics>({
    title: "",
    numOutgoingPages: 0,
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
