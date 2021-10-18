import React from "react";
import { Flex, Heading } from "@chakra-ui/react";

import bbqPattern from "../images/bbq-pattern.svg";

function PageHeader({ title }) {
  return (
    <>
      <Flex
        bg="brand.500"
        w="100%"
        h="200px"
        bgImage={bbqPattern}
        alignItems="center"
        justifyContent="center"
      >
        <Heading textAlign="center" fontWeight="bold" fontSize="4xl">
          {title}
        </Heading>
      </Flex>
    </>
  );
}

export default PageHeader;
