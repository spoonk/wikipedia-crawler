import React from "react";
import { Box, Text } from "ink";
import { PageUpdate } from "../packages/utils/metrics/page-updates";

type LastPageProps = {
  lastPages: PageUpdate[];
  lastPageTitle: string | null;
  numOutgoingPages: number | null;
  width: number | string;
  height: number | string;
};

export const LastPage = ({
  lastPages,
  lastPageTitle,
  numOutgoingPages,
  width,
  height,
}: LastPageProps) => {
  return (
    <Box
      width={width}
      height={height}
      borderColor="rgb(232, 131, 136)"
      borderStyle="single"
      flexDirection="column"
      overflowY="hidden"
    >
      <Text bold color="green">
        {lastPageTitle}
      </Text>
      <Text bold color="green" dimColor>
        {numOutgoingPages}
      </Text>
      {lastPages.slice(0, 50).map((page) => {
        return (
          <Text
            key={`${page.isNew}${page.title}`}
            color={page.isNew ? "green" : "red"}
          >
            {page.isNew ? "+" : "-"}
            {page.title}
          </Text>
        );
      })}
    </Box>
  );
};
