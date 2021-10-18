import React from "react";
import { Box, Image, WrapItem, Text } from "@chakra-ui/react";

import iconBbq from "../images/icon-bbq.svg";

function AddBarbecueButton({ onClick }) {
  return (
    <WrapItem>
      <Box
        bg="gray.200"
        w="250px"
        h="190px"
        p={4}
        borderRadius="md"
        boxShadow="0px 0px 16px rgba(0, 0, 0, 0.4)"
        display="flex"
        flexDir="column"
        justifyContent="space-between"
        alignItems="center"
        cursor="pointer"
        _hover={{ filter: "brightness(0.9)" }}
        onClick={onClick}
      >
        <Box
          bg="brand.500"
          borderRadius="100%"
          w="120px"
          h="120px"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Image src={iconBbq} w="50%" />
        </Box>
        <Text fontSize="lg" fontWeight="bold">
          Adicionar churras
        </Text>
      </Box>
    </WrapItem>
  );
}

export default AddBarbecueButton;
