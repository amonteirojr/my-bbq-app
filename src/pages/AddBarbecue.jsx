import React, { useEffect, useState } from "react";
import {
  Flex,
  Container,
  Heading,
  VStack,
  FormControl,
  FormLabel,
  Input,
  Button,
  Textarea,
  Image,
} from "@chakra-ui/react";
import PageHeader from "../components/PageHeader";
import { formatCurrency, parseCurrency } from "../utils/convertion";
import useHandleErrors from "../hooks/HandleErrorsHook";
import api from "../services/api";
import useToastMessage from "../hooks/ToastMessageHook";
import { useHistory, useLocation } from "react-router-dom";
import AddParticipants from "./AddParticipants";
import LoadingIndicator from "../components/LoadingIndicator";

import backIcon from "../assets/images/back-arrow.svg";

function AddBarbecue(props) {
  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [notes, setNotes] = useState("");
  const [suggestedValue, setSuggestedValue] = useState("");
  const [suggestedBeerValue, setSuggestedBeerValue] = useState("");
  const [addedParticipants, setAddedParticipants] = useState([]);
  const [barbecueUuid, setBarbecueUuid] = useState("");

  const handleErrorStatus = useHandleErrors();
  const showMessage = useToastMessage();
  const history = useHistory();
  const location = useLocation();

  async function handleSaveClick(e) {
    try {
      setLoading(true);
      e.preventDefault();

      const participants = addedParticipants.map((participant) => {
        return {
          ...participant,
          contributionAmount: formatCurrency(participant.contributionAmount),
        };
      });

      const payload = {
        date,
        description,
        notes: notes || null,
        suggestedValue: (suggestedValue && formatCurrency(suggestedValue)) || 0,
        suggestedBeerValue:
          (suggestedBeerValue && formatCurrency(suggestedBeerValue)) || 0,
        participants,
      };

      let response = null;

      if (barbecueUuid) {
        response = await api.put(`/barbecues/${barbecueUuid}`, payload);
      } else {
        response = await api.post("/barbecues", payload);
      }
      if (response && (response.status === 201 || response.status === 204)) {
        showMessage("Churras salvo com sucesso!", "success");
        history.push("/barbecues");
      }
    } catch (err) {
      handleErrorStatus(err);
    } finally {
      setLoading(false);
    }
  }

  function handleAddParticipants(participants) {
    setAddedParticipants(participants);
  }

  function loadEditingStates(barbecue) {
    setDate(barbecue.date);
    setDescription(barbecue.description);
    setNotes(barbecue.notes || "");
    setSuggestedValue(barbecue.suggestedValue);
    setSuggestedBeerValue(barbecue.suggestedBeerValue);
    setAddedParticipants([...barbecue.participants]);
    setBarbecueUuid(barbecue.barbecueUuid);
  }

  function handleBackClick() {
    history.goBack();
  }

  useEffect(() => {
    if (location && location.state) {
      loadEditingStates(location.state);
    }
  }, [location]);

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
          {loading ? (
            <LoadingIndicator />
          ) : (
            <>
              <Image
                src={backIcon}
                cursor="pointer"
                onClick={handleBackClick}
              />
              <Flex w="100%" flexDir="column" mt={8}>
                <Heading fontSize="2xl">Insira os dados do churras</Heading>
                <form onSubmit={handleSaveClick}>
                  <VStack spacing={2} mt={8}>
                    <FormControl id="date" isRequired>
                      <FormLabel mb={1}>Data do churras</FormLabel>
                      <Input
                        type="date"
                        bg="white"
                        onChange={(e) => setDate(e.target.value)}
                        value={date}
                        w={["100%", "40%", "40%", "20%"]}
                        max={50}
                      />
                    </FormControl>
                    <FormControl id="description" isRequired>
                      <FormLabel mb={1}>Descrição do churras</FormLabel>
                      <Input
                        onChange={(e) => setDescription(e.target.value)}
                        value={description}
                        placeholder="Ex: Churras do niver do Gui"
                        isRequired
                      />
                    </FormControl>
                    <FormControl id="notes">
                      <FormLabel mb={1}>Observações adicionais</FormLabel>
                      <Textarea
                        placeholder="Ex: levar roupa de banho"
                        onChange={(e) => setNotes(e.target.value)}
                        value={notes}
                      />
                    </FormControl>
                    <FormControl id="suggestedValue">
                      <FormLabel mb={1}>Valor sugerido (sem cerveja)</FormLabel>
                      <Input
                        onChange={(e) => {
                          setSuggestedValue(parseCurrency(e.target.value));
                        }}
                        value={suggestedValue}
                        w={["100%", "40%", "40%", "20%"]}
                      />
                    </FormControl>
                    <FormControl id="suggestedBeerValue">
                      <FormLabel mb={1}>Valor sugerido com cerveja</FormLabel>
                      <Input
                        w={["100%", "40%", "40%", "20%"]}
                        onChange={(e) =>
                          setSuggestedBeerValue(parseCurrency(e.target.value))
                        }
                        value={suggestedBeerValue}
                      />
                    </FormControl>
                  </VStack>

                  <AddParticipants
                    suggestedBeerValue={suggestedBeerValue}
                    suggestedValue={suggestedValue}
                    addParticipants={handleAddParticipants}
                    addedParticipants={addedParticipants}
                  />

                  <Button
                    mt={8}
                    type="submit"
                    w="100%"
                    bg="black"
                    color="white"
                  >
                    Salvar
                  </Button>
                </form>
              </Flex>
            </>
          )}
        </Container>
      </Flex>
    </>
  );
}

export default AddBarbecue;
