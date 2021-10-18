import React, { useEffect, useState } from "react";
import {
  Flex,
  Heading,
  Wrap,
  WrapItem,
  FormControl,
  FormLabel,
  Input,
  Button,
  Checkbox,
  IconButton,
} from "@chakra-ui/react";
import { parseCurrency } from "../utils/convertion";
import { FaTrashAlt } from "react-icons/fa";

function AddParticipants({ addParticipants }) {
  const [participants, setParticipants] = useState([]);

  function addNewParticipant() {
    setParticipants([
      ...participants,
      { name: "", contributionAmount: "", paid: false },
    ]);
  }

  function setParticipantValues(position, field, value) {
    const updatedParticipantValues = participants.map((participant, index) => {
      if (index === position) {
        return { ...participant, [field]: value };
      }

      return participant;
    });

    setParticipants(updatedParticipantValues);
  }

  function handleDeleteParticipant(index) {
    const participantsList = [...participants];
    participantsList.splice(index, 1);
    setParticipants(participantsList);
  }

  useEffect(() => {
    if (participants) {
      addParticipants(participants);
    }
  }, [participants]);

  return (
    <Flex mt={6} flexDir="column" w="100%">
      <Heading fontSize="2xl">Participantes</Heading>

      <Button
        bg="none"
        color="blue.500"
        w={["100%", "100%", "20%"]}
        onClick={addNewParticipant}
      >
        + Novo participante
      </Button>

      {participants.map((participant, index) => (
        <Wrap mt={4} align="flex-end" w="100%" key={index}>
          <WrapItem w={["100%", "100%", "40%"]}>
            <FormControl id="name" isRequired>
              <FormLabel mb={1}>Nome do participante</FormLabel>
              <Input
                value={participant.name}
                onChange={(e) =>
                  setParticipantValues(index, "name", e.target.value)
                }
              />
            </FormControl>
          </WrapItem>
          <WrapItem w={["100%", "100%", "20%"]}>
            <FormControl id="suggestedContribution" isRequired>
              <FormLabel mb={1}>Valor de contribuição</FormLabel>
              <Input
                value={participant.contributionAmount}
                onChange={(e) =>
                  setParticipantValues(
                    index,
                    "contributionAmount",
                    parseCurrency(e.target.value)
                  )
                }
              />
            </FormControl>
          </WrapItem>
          <WrapItem w={["100%", "100%", "10%"]}>
            <FormControl id="suggestedContribution" h="40px" display="flex">
              <Checkbox
                onChange={(e) =>
                  setParticipantValues(index, "paid", e.target.checked)
                }
                colorScheme="yellow"
                value={participant.paid}
              >
                Pago?
              </Checkbox>
            </FormControl>
          </WrapItem>
          <WrapItem>
            <IconButton
              color="white"
              icon={<FaTrashAlt />}
              onClick={() => handleDeleteParticipant(index)}
              bg="red.500"
            />
          </WrapItem>
        </Wrap>
      ))}
    </Flex>
  );
}

export default AddParticipants;
