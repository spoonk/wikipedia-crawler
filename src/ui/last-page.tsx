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
      {lastPages.slice(0, 50).map((page) => {
        return (
          <Text
            key={`${page.isNew}${page.title}`}
            color={page.isNew ? "#c6a0f6" : "#c6a0f6"}
            dimColor={!page.isNew}
          >
            {page.isNew ? "" : "󰑖"}
            {`  ${page.title}`}
          </Text>
        );
      })}
    </Box>
  );
};
