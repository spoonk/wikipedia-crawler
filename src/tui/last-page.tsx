import React from "react";
import { Box, Text } from "ink";
import { PageUpdate } from "../packages/utils/metrics/page-updates";

type LastPageProps = {
  lastPages: PageUpdate[];
  lastPageTitle: string | null;
  numOutgoingPages: number | null;
  width: number | string;
  height: number | string;
  numProcessed: number | null;
  queueSize: number | null;
};

export const LastPage = ({
  lastPages,
  lastPageTitle,
  numOutgoingPages,
  width,
  height,
  numProcessed,
  queueSize,
}: LastPageProps) => {
  return (
    <Box
      padding={1}
      width={width}
      height={height}
      borderColor="#494d64"
      borderStyle="single"
      flexDirection="column"
      overflowY="hidden"
    >
      <Box padding={1} justifyContent="center">
        <Text bold color="#f4dbd6">
          {lastPageTitle} - <Text color="#ee99a0">{numOutgoingPages}</Text>
        </Text>
      </Box>
      <Box padding={1} justifyContent="center">
        {numProcessed && queueSize && (
          <Text bold color="#f4dbd6">
            {numProcessed} -{" "}
            {`${Math.round((10000000 * numProcessed) / (queueSize + numProcessed)) / 100000}%`}
          </Text>
        )}
      </Box>
      {lastPages.slice(0, 50).map((page) => {
        return (
          <Text
            key={`${page.isNew}${page.title}`}
            color="green"
            dimColor={!page.isNew}
          >
            {`  ${page.title}`}
          </Text>
        );
      })}
    </Box>
  );
};
