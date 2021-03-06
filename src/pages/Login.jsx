import React, { useContext, useState } from "react";
import {
  Flex,
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  VStack,
  Text,
  Divider,
} from "@chakra-ui/react";
import { AuthContext } from "../contexts/AuthContext";
import { useHistory } from "react-router";

import patternImage from "../assets/images/bbq-pattern.svg";
import useHandleErrors from "../hooks/HandleErrorsHook";
import { Link } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { login } = useContext(AuthContext);

  const history = useHistory();

  const handleErrorsStatus = useHandleErrors();

  async function handleLogin(e) {
    try {
      e.preventDefault();

      setLoading(true);

      const logged = await login(email, password);

      if (logged) {
        history.push("/");
      }
    } catch (error) {
      handleErrorsStatus(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Flex alignItems="center" justifyContent="center" h="100vh" w="100vw">
      <Box
        bg="brand.500"
        w={["80%", "60%", "40%"]}
        bgImage={patternImage}
        bgSize="contain"
        borderRadius="md"
        p={8}
      >
        <Heading textAlign="center" fontSize="3xl">
          Agenda de churras
        </Heading>
        <form onSubmit={handleLogin}>
          <VStack spacing={2} mt={8}>
            <FormControl id="login">
              <FormLabel mb={1}>Login</FormLabel>
              <Input
                bg="white"
                placeholder="e-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormControl>
            <FormControl id="password">
              <FormLabel mb={1}>Senha</FormLabel>
              <Input
                type="password"
                bg="white"
                value={password}
                placeholder="senha"
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormControl>
          </VStack>
          <Button
            type="submit"
            isLoading={loading}
            isDisabled={!login || !password}
            color="white"
            bg="black"
            w="100%"
            mt={4}
            _hover={{ bg: "gray.700" }}
          >
            Entrar
          </Button>
        </form>
        <Flex flexDir="column" mt={8} alignItems="center" gridGap={6}>
          <Divider borderColor="black" />
          <Link to="/users/new">
            <Text fontWeight="bold">Cadastre-se</Text>
          </Link>
        </Flex>
      </Box>
    </Flex>
  );
}

export default Login;
