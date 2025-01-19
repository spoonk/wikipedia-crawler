import React from "react";
import { Box, Text, render } from "ink";
import { useMetrics } from "./use-metrics.js";
import { useCrawler } from "./use-crawler.js";
import _ from "lodash";

export const UiApp = () => {
  const metrics = useMetrics();
  const crawler = useCrawler();

  return (
    <>
      <Box
        borderStyle="round"
        borderColor="#FAC898"
        justifyContent="space-around"
        width={"40%"}
      >
        <Text color="green">{metrics.title}</Text>
        <Text color="green">{metrics.numOutgoingPages}</Text>
      </Box>
      <Text>
        Remaining elements in queue:
        <Text color="green">{metrics.queueSize}</Text>
      </Text>
      <Text>
        Processed pages:
        <Text color="green">{metrics.numProcessedPages}</Text>
      </Text>
    </>
  );
};

render(<UiApp />);
