import React from "react";
import { Text, Box, Newline } from "ink";
import { plot } from "asciichart";

type MetricChartProps = {
  metricHistory: number[];
  metricName: string;
};

export const MetricChart = ({
  metricHistory,
  metricName,
}: MetricChartProps) => {
  return (
    <Box borderColor="green" borderStyle="round" flexDirection="column">
      <Text color="green">{metricName}</Text>
      <Newline />
      <Text color="blue">
        {metricHistory.length ? plot(metricHistory, { height: 10 }) : ""}
      </Text>
      <Newline />
    </Box>
  );
};
