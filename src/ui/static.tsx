import React, { useState, useEffect } from "react";
import { render, Static, Box, Text } from "ink";

type test = {
  id: number;
  title: string;
};

const Example = () => {
  const [tests, setTests] = useState<test[]>([]);

  useEffect(() => {
    let completedTests = 0;
    let timer: NodeJS.Timeout;

    const run = () => {
      // Fake 10 completed tests
      if (completedTests++ < 10) {
        setTests((previousTests) => [
          ...previousTests,
          {
            id: previousTests.length,
            title: `Test #${previousTests.length + 1}`,
          },
        ]);

        timer = setTimeout(run, 100);
      }
    };

    run();

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <>
      {/* This part will be rendered once to the terminal */}
      <Static items={tests}>
        {(test) => (
          <Box key={test.id}>
            <Text color="green">✔ {test.title}</Text>
          </Box>
        )}
      </Static>

      {/* This part keeps updating as state changes */}
      <Box marginTop={1}>
        <Text dimColor>Completed tests: {tests.length}</Text>
      </Box>
    </>
  );
};

render(<Example />);
