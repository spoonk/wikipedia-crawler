import { useEffect, useState } from "react";
import { CrawlerMetrics } from "../packages/utils/metrics/crawler-metrics.js";
import { channels } from "../packages/utils/channels.js";

export function useMetrics() {
  const [crawlerMetrics, setMetrics] = useState<CrawlerMetrics>({
    title: "",
    numOutgoingPages: null,
    queueSize: null,
    numProcessedPages: null,
  });

  const [wikiTiming, setWikiTiming] = useState<number>(0);
  const [queuePushTiming, setQueuePushTiming] = useState<number>(0);

  useEffect(() => {
    channels.metrics.subscribe(setMetrics);
    channels.apiTiming.subscribe(setWikiTiming);
    channels.addToQueueTiming.subscribe(setQueuePushTiming);
  }, []);

  return {
    crawlerMetrics,
    wikiTiming,
    queuePushTiming,
  };
}
