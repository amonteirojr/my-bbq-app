import React, { useState } from "react";
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
} from "@chakra-ui/react";

import { useHistory } from "react-router";

import patternImage from "../assets/images/bbq-pattern.svg";
import useHandleErrors from "../hooks/HandleErrorsHook";
import api from "../services/api";
import useToastMessage from "../hooks/ToastMessageHook";

function CreateUser() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const history = useHistory();

  const handleErrorsStatus = useHandleErrors();
  const showMessage = useToastMessage();

  async function handleSubmit(e) {
    try {
      e.preventDefault();

      setLoading(true);

      const response = await api.post("/users", { email, password });

      if (response && response.status === 201) {
        showMessage("Usuário criado com sucesso!", "success");
        history.push("/login");
      }
    } catch (error) {
      handleErrorsStatus(error);
    } finally {
      setLoading(false);
    }
  }

  function handleCancel() {
    history.goBack();
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
        <Text fontSize="lg" textAlign="center" mt={4} fontWeight="medium">
          Digite seus dados abaixo para se cadastrar e utilizar o app
        </Text>
        <form onSubmit={handleSubmit}>
          <VStack spacing={2} mt={8}>
            <FormControl id="login" isRequired>
              <FormLabel mb={1}>E-mail de acesso</FormLabel>
              <Input
                bg="white"
                placeholder="e-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormControl>
            <FormControl id="password" isRequired>
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
            color="white"
            bg="black"
            w="100%"
            mt={4}
            _hover={{ bg: "gray.800" }}
          >
            Cadastrar
          </Button>
        </form>
        <Button
          variant="outline"
          onClick={handleCancel}
          color="black"
          borderColor="black"
          w="100%"
          mt={4}
          _hover={{ bg: "gray.800", color: "white" }}
        >
          Cancelar
        </Button>
      </Box>
    </Flex>
  );
}

export default CreateUser;
