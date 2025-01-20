import { render, Box, Text, Newline } from "ink";
import React from "react";

const Example = () => (
  <>
    <Box borderStyle="round" borderColor="green" width={"50%"} borderDimColor>
      <Text>Green Rounded Box</Text>
    </Box>
  </>
);

render(<Example />);
