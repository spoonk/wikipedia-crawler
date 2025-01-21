import { CrawlerMetrics } from "./messages/crawler-metrics.js";

export const getPercentProcessed = ({
  numProcessedPages,
  queueSize,
}: Pick<CrawlerMetrics, "numProcessedPages" | "queueSize">) => {
  const PRECISION = 6;

  if (numProcessedPages === null || queueSize === null) return null;
  const num = Math.round(100 * 10 ** PRECISION * numProcessedPages);
  const denom = (queueSize + numProcessedPages) * 10 ** PRECISION;
  return num / denom;
};
