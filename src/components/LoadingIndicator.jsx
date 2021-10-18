import React from "react";
import { Flex, Spinner } from "@chakra-ui/react";

function LoadingIndicator() {
  return (
    <Flex w="100%" h="100%" alignItems="center" justifyContent="center">
      <Spinner color="black" size="xl" />
    </Flex>
  );
}

export default LoadingIndicator;
