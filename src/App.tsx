import { Box, Code, Container, Group, Text } from "@mantine/core";

import HookForm from "./components/forms/HookForm";
import React from "react";

function App() {
  const [data, setData] = React.useState({});
  return (
    <Container>
      <Group spacing="xl">
        <Box>
          <HookForm submitHandler={setData} />
        </Box>
        <Box>
          <Text>Form values:</Text>
          <Code block>{JSON.stringify(data, null, 2)}</Code>
        </Box>
      </Group>
    </Container>
  );
}

export default App;
