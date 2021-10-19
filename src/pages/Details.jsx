import React, { useEffect, useState } from "react";
import PageHeader from "../components/PageHeader";
import {
  Container,
  Flex,
  Text,
  Icon,
  Table,
  Button,
  Tr,
  Tbody,
  Td,
  Divider,
  Badge,
} from "@chakra-ui/react";
import { FaDollarSign, FaUsers } from "react-icons/fa";
import useHandleErrors from "../hooks/HandleErrorsHook";

import api from "../services/api";
import { format } from "date-fns";

import { formatCurrencyBRL } from "../utils/convertion";
import { useParams, useHistory } from "react-router-dom";
import { parseISO } from "date-fns/esm";

import LoadingIndicator from "../components/LoadingIndicator";

function Details() {
  const [barbecue, setBarbecue] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleErrorStatus = useHandleErrors();

  const params = useParams();
  const history = useHistory();

  async function getBarbecueDetails() {
    try {
      setBarbecue(null);
      setLoading(true);

      const { barbecueId } = params;

      const response = await api.get(`/barbecues/${barbecueId}`);

      if (response && response.status === 200) {
        const { data } = response;
        setBarbecue(data);
      }
    } catch (err) {
      handleErrorStatus(err);
    } finally {
      setLoading(false);
    }
  }

  function handleEditBarbecue() {
    history.push({
      pathname: `/barbecues/${barbecue.barbecueUuid}`,
      state: barbecue,
    });
  }

  useEffect(() => {
    getBarbecueDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <PageHeader title="Agenda de churras" />
      <Flex justifyContent="center">
        <Container
          maxW="container.lg"
          minH="100%"
          pos="absolute"
          top="150px"
          bg="white"
          p={8}
          boxShadow="0 0 16px rgba(0, 0, 0, 0.4)"
        >
          {barbecue && !loading ? (
            <>
              <Button bg="brand.500" mb={4} onClick={handleEditBarbecue}>
                Editar
              </Button>
              <Flex justifyContent="space-between">
                <Flex flexDir="column">
                  <Text fontWeight="bold" fontSize="xl">
                    {format(parseISO(barbecue.date), "dd/MM/yyyy")}
                  </Text>
                  <Text fontWeight="bold" fontSize="3xl">
                    {barbecue.description}
                  </Text>
                </Flex>
                <Flex flexDir="column" justifyContent="space-around">
                  <Flex alignItems="center" fontSize="xl" gridGap={2}>
                    <Icon as={FaUsers} />
                    <Text>{barbecue.totalParticipants}</Text>
                  </Flex>

                  <Flex alignItems="center" fontSize="xl" gridGap={2}>
                    <Icon as={FaDollarSign} />
                    <Text>{formatCurrencyBRL(barbecue.totalAmount)}</Text>
                  </Flex>
                </Flex>
              </Flex>

              <Divider borderColor="gray.300" mt={2} />

              <Flex flexDir="column" mt={6} color="gray.500">
                <Text mb={2} fontSize="lg" fontWeight="medium" color="gray.600">
                  Detalhes do churras
                </Text>
                <Text>
                  Valor com bebida:{" "}
                  {formatCurrencyBRL(barbecue.suggestedBeerValue)}
                </Text>
                <Text>
                  Valor sem bebida: {formatCurrencyBRL(barbecue.suggestedValue)}
                </Text>
                {barbecue.notes && (
                  <Text mt={6}>Observações: {barbecue.notes}</Text>
                )}
              </Flex>

              <Divider borderColor="gray.300" mt={2} />

              <Flex flexDir="column" mt={8}>
                <Text fontSize="xl" fontWeight="bold" color="gray.600">
                  Lista de participantes confirmados
                </Text>
                <Table size="md" variant="simple" w="100%">
                  <Tbody>
                    {barbecue.participants &&
                      barbecue.participants.length > 0 &&
                      barbecue.participants.map((participant) => (
                        <Tr key={participant.uuid}>
                          <Td>{participant.name}</Td>
                          <Td>
                            {formatCurrencyBRL(participant.contributionAmount)}
                          </Td>

                          <Td w="10%">
                            <Badge
                              bg={participant.paid ? "green.500" : "red.500"}
                              color="white"
                            >
                              {participant.paid ? "Pago" : "Não pago"}
                            </Badge>
                          </Td>
                        </Tr>
                      ))}
                  </Tbody>
                </Table>
              </Flex>
            </>
          ) : (
            <LoadingIndicator />
          )}
        </Container>
      </Flex>
    </>
  );
}

export default Details;
