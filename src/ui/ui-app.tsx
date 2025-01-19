import React, { useState, useEffect, useRef } from "react";
import { Newline, Text, render } from "ink";
import { useMetrics } from "./use-metrics.js";
import { useCrawler } from "./use-crawler.js";
import _ from "lodash";

export const UiApp = () => {
  const metrics = useMetrics();
  const crawler = useCrawler();

  return (
    <>
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
