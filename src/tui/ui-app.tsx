import React from "react";
import { Box, render } from "ink";
import { useMetrics } from "./use-metrics.js";
import { useCrawler } from "./use-crawler.js";
import { useMetricHistory } from "./use-metric-history.js";
import { MetricChart } from "./metric-chart.js";
import { LastPage } from "./last-page.js";

export const UiApp = () => {
  const { crawlerMetrics, queuePushTiming, wikiTiming, lastPages } =
    useMetrics();
  const crawler = useCrawler();
  const timing = useMetricHistory(wikiTiming);
  const pushTiming = useMetricHistory(queuePushTiming);
  const queueSizeHistory = useMetricHistory(crawlerMetrics.queueSize);
  const numProcessedHistory = useMetricHistory(
    crawlerMetrics.numProcessedPages,
  );

  const processedRatioHistory = useMetricHistory(
    crawlerMetrics.numProcessedPages && crawlerMetrics.queueSize
      ? Math.round(
          (100 * 10000000 * crawlerMetrics.numProcessedPages) /
            (crawlerMetrics.queueSize + crawlerMetrics.numProcessedPages),
        ) / 10000000
      : 0,
    100,
  );

  return (
    <Box flexDirection="row">
      <Box width={"60%"} height={"100%"} flexDirection="column">
        <Box width={"100%"} flexDirection="row">
          <MetricChart metricName="api timing" metricHistory={timing} />
          <MetricChart metricName="queue timing" metricHistory={pushTiming} />
        </Box>
        <Box width={"100%"} flexDirection="row">
          <MetricChart
            metricName="remaining items in queue"
            metricHistory={queueSizeHistory}
          />
          <MetricChart
            metricName="processed pages"
            metricHistory={numProcessedHistory}
          />
        </Box>

        <MetricChart
          metricName="% processed"
          metricHistory={processedRatioHistory}
        />
      </Box>

      <LastPage
        queueSize={crawlerMetrics.queueSize}
        numProcessed={crawlerMetrics.numProcessedPages}
        width={"40%"}
        height={"100%"}
        lastPages={lastPages}
        lastPageTitle={crawlerMetrics.title}
        numOutgoingPages={crawlerMetrics.numOutgoingPages}
      ></LastPage>
    </Box>
  );
};

render(<UiApp />);
