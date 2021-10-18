import React, { useContext } from "react";
import {
  Flex,
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  VStack,
} from "@chakra-ui/react";
import { AuthContext } from "../contexts/AuthContext";
import { useHistory } from "react-router";

import patternImage from "../images/bbq-pattern.svg";

function Login() {
  const { login } = useContext(AuthContext);

  const history = useHistory();

  function handleLogin() {
    login("João");
    history.push("/");
  }

  return (
    <Flex alignItems="center" justifyContent="center" h="100vh" w="100vw">
      <Box
        bg="brand.500"
        w="30%"
        bgImage={patternImage}
        bgSize="contain"
        borderRadius="md"
        p={8}
      >
        <Heading textAlign="center" fontSize="3xl">
          Agenda de churras
        </Heading>
        <VStack spacing={2} mt={8}>
          <FormControl id="login">
            <FormLabel mb={1}>Login</FormLabel>
            <Input bg="white" placeholder="e-mail" />
          </FormControl>
          <FormControl id="password">
            <FormLabel mb={1}>Senha</FormLabel>
            <Input type="password" bg="white" placeholder="senha" />
          </FormControl>
        </VStack>
        <Button
          onClick={handleLogin}
          color="white"
          bg="black"
          w="100%"
          mt={4}
          _hover={{ bg: "gray.700" }}
        >
          Entrar
        </Button>
      </Box>
    </Flex>
  );
}

export default Login;
