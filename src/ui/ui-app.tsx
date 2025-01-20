import React, { useEffect, useRef } from "react";
import { Box, Newline, Text, render } from "ink";
import { useMetrics } from "./use-metrics.js";
import { useCrawler } from "./use-crawler.js";
import { plot } from "asciichart";
import { useMetricHistory } from "./use-metric-history.js";

export const UiApp = () => {
  const { crawlerMetrics, queuePushTiming, wikiTiming } = useMetrics();
  const crawler = useCrawler();
  const timing = useMetricHistory(wikiTiming);

  return (
    <>
      <Box
        borderStyle="round"
        borderColor="#FAC898"
        justifyContent="space-around"
        width={"40%"}
      >
        <Text color="green">{crawlerMetrics.title}</Text>
        <Text color="green">{crawlerMetrics.numOutgoingPages}</Text>
      </Box>
      <Text>
        Remaining elements in queue:
        <Text color="green">{crawlerMetrics.queueSize}</Text>
      </Text>
      <Text>
        Processed pages:
        <Text color="green">{crawlerMetrics.numProcessedPages}</Text>
      </Text>

      <Text>
        wikipedia api query time:
        <Text color="green">{Math.round(wikiTiming)}</Text>
      </Text>
      <Text>
        queue push timing:
        <Text color="green">{Math.round(queuePushTiming)}</Text>
      </Text>
      <Newline />
      <Text color="#FAC898">{plot(timing, { height: 10 })}</Text>
    </>
  );
};

render(<UiApp />);
