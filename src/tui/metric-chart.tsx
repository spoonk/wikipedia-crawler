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
    <Box
      borderColor="#494d64"
      borderStyle="round"
      flexDirection="column"
      width={"100%"}
      overflowX="hidden"
      padding={1}
    >
      <Text color="green">{metricName}</Text>
      <Newline />
      <Text color="#a5adcb">
        {metricHistory.length
          ? plot(metricHistory, {
              height: 10,
              //format: function (x) {
              //  return String(Math.round(x));
              //},
            })
          : ""}
      </Text>
      <Newline />
    </Box>
  );
};
