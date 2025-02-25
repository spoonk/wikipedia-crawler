import React from "react";
import { Box } from "ink";
import { useMetrics } from "../hooks/use-metrics.js";
import { useCrawler } from "../hooks/use-crawler.js";
import { useMetricHistory } from "../hooks/use-metric-history.js";
import { MetricChart } from "./metric-chart.js";
import { LastPage } from "./last-page.js";
import { getPercentProcessed } from "../../packages/utils/compute.js";

export const Dashboard = () => {
  const { crawlerMetrics, queuePushTiming, wikiTiming, lastPages } =
    useMetrics();
  useCrawler();

  const timing = useMetricHistory(wikiTiming);
  const pushTiming = useMetricHistory(queuePushTiming);
  const queueSizeHistory = useMetricHistory(crawlerMetrics.queueSize);
  const numProcessedHistory = useMetricHistory(
    crawlerMetrics.numProcessedPages,
  );

  const processedRatioHistory = useMetricHistory(
    getPercentProcessed({ ...crawlerMetrics }),
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
        width={"40%"}
        height={"100%"}
        lastPages={lastPages}
        lastPageTitle={crawlerMetrics.title}
        numOutgoingPages={crawlerMetrics.numOutgoingPages}
      ></LastPage>
    </Box>
  );
};
