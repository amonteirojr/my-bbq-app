import React from "react";
import { Box, CloseButton, Flex, Icon, useToast } from "@chakra-ui/react";
import {
  FaCheckCircle,
  FaExclamationTriangle,
  FaInfoCircle,
  FaTimesCircle,
} from "react-icons/fa";

export default function useToastMessage() {
  const toast = useToast();

  function showMessage(message, type) {
    const id = Math.floor(Math.random() * 100 + 1);

    let color = "white";
    let background = "blue.800";
    let icon = FaInfoCircle;

    if (type === "success") {
      background = "green.500";
      icon = FaCheckCircle;
    } else if (type === "warning") {
      color = "text";
      background = "brand.500";
      icon = FaExclamationTriangle;
    } else if (type === "error") {
      background = "red.500";
      icon = FaTimesCircle;
    }

    return toast({
      id,
      duration: 6000,
      position: "bottom",
      render: () => (
        <Box
          color={color}
          p={4}
          bg={background}
          minH="3.5rem"
          borderRadius="sm"
        >
          <CloseButton
            float="right"
            onClick={() => {
              toast.close(id);
            }}
            size="sm"
            position="relative"
          />
          <Flex flexDir="row" alignItems="center" gridGap={2}>
            <Icon as={icon} />
            {message}
          </Flex>
        </Box>
      ),
    });
  }

  return showMessage;
}
