import React, { useContext } from "react";
import { Flex, Heading, Button } from "@chakra-ui/react";

import bbqPattern from "../assets/images/bbq-pattern.svg";
import { FaPowerOff } from "react-icons/fa";

import { AuthContext } from "../contexts/AuthContext";

function PageHeader({ title }) {
  const { logout } = useContext(AuthContext);

  function handleLogoutClick() {
    logout();
  }

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
        <Button
          leftIcon={<FaPowerOff />}
          color="white"
          position="absolute"
          right={4}
          top={4}
          bg="black"
          onClick={handleLogoutClick}
        >
          Sair
        </Button>
      </Flex>
    </>
  );
}

export default PageHeader;
