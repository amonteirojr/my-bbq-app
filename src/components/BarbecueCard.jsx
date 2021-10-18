import React from "react";
import { Box, Flex, Heading, Text, Icon, WrapItem } from "@chakra-ui/react";
import { FaDollarSign, FaUsers } from "react-icons/fa";

function BarbecueCard({
  date,
  description,
  participants,
  value,

  onClick,
}) {
  return (
    <WrapItem>
      <Box
        bg="white"
        w="250px"
        h="190px"
        p={4}
        borderRadius="md"
        boxShadow="0px 0px 16px rgba(0, 0, 0, 0.4)"
        display="flex"
        flexDir="column"
        justifyContent="space-between"
        cursor="pointer"
        _hover={{ filter: "brightness(0.9)" }}
        onClick={onClick}
      >
        <Flex justifyContent="space-between" w="100%" flexDir="column">
          <Heading fontSize="2xl">{date}</Heading>
          <Text fontSize="xl">{description}</Text>
        </Flex>

        <Flex alignItems="flex-end" justifyContent="space-between" w="100%">
          <Flex
            gridGap={2}
            alignItems="center"
            title="Total de pessoas confirmadas"
          >
            <Icon as={FaUsers} />
            <Text>{participants || 0}</Text>
          </Flex>

          <Flex gridGap={2} alignItems="center" title="Valor total arrecadado">
            <Icon as={FaDollarSign} />
            <Text>{value || 0.0}</Text>
          </Flex>
        </Flex>
      </Box>
    </WrapItem>
  );
}

export default BarbecueCard;
