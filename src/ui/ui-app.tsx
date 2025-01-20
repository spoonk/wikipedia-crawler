import React from "react";
import { Box, Text, render } from "ink";
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

  return (
    <Box flexDirection="row">
      <Box width={"60%"} height={"100%"} flexDirection="column">
        <MetricChart metricName="api timing" metricHistory={timing} />
        <MetricChart metricName="queue timing" metricHistory={pushTiming} />
        <MetricChart
          metricName="remaining items in queue"
          metricHistory={queueSizeHistory}
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
