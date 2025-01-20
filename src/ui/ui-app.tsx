import React, { useEffect, useRef } from "react";
import { Box, Newline, Text, render } from "ink";
import { useMetrics } from "./use-metrics.js";
import { useCrawler } from "./use-crawler.js";
import { plot } from "asciichart";
import { useMetricHistory } from "./use-metric-history.js";
import { MetricChart } from "./metric-chart.js";

export const UiApp = () => {
  const { crawlerMetrics, queuePushTiming, wikiTiming } = useMetrics();
  const crawler = useCrawler();
  const timing = useMetricHistory(wikiTiming);
  const pushTiming = useMetricHistory(queuePushTiming);
  const queueSizeHistory = useMetricHistory(crawlerMetrics.queueSize);

  return (
    <Box flexDirection="row">
      <Box
        borderStyle="round"
        borderColor="#FAC898"
        justifyContent="space-around"
        width={"40%"}
      >
        <Text color="green">{crawlerMetrics.title}</Text>
        <Text color="green">{crawlerMetrics.numOutgoingPages}</Text>
      </Box>
      <Box flexDirection="column">
        <MetricChart metricName="api timing" metricHistory={timing} />
        <MetricChart metricName="queue timing" metricHistory={pushTiming} />
        <MetricChart
          metricName="remaining items in queue"
          metricHistory={queueSizeHistory}
        />
      </Box>
    </Box>
  );
};

render(<UiApp />);
