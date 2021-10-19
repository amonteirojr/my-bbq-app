import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Container, Flex, Wrap } from "@chakra-ui/react";

import PageHeader from "../components/PageHeader";
import BarbecueCard from "../components/BarbecueCard";
import AddBarbecueButton from "../components/AddBarbecueButton";
import useHandleErrors from "../hooks/HandleErrorsHook";
import api from "../services/api";
import { format, parseISO } from "date-fns";
import LoadingIndicator from "../components/LoadingIndicator";
import { formatCurrencyBRL } from "../utils/convertion";

function Schedule() {
  const [barbecues, setBarbecues] = useState(null);
  const [loading, setLoading] = useState(false);

  const history = useHistory();

  const handleErrorStatus = useHandleErrors();

  async function getAllBarbecues() {
    try {
      setLoading(true);
      setBarbecues(null);
      const response = await api.get("/barbecues");

      if (response.status === 200) {
        const { data } = response;
        setBarbecues(data);
      }
    } catch (err) {
      console.log(err);
      handleErrorStatus(err);
    } finally {
      setLoading(false);
    }
  }

  function handleClick(uuid) {
    history.push(`/barbecues/details/${uuid}`);
  }

  function handleAddBarbecueClick() {
    history.push(`/barbecues/add`);
  }

  useEffect(() => {
    getAllBarbecues();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <PageHeader title="Agenda de churras" />
      <Flex justifyContent="center">
        {loading ? (
          <LoadingIndicator />
        ) : (
          <Container
            maxW="container.lg"
            minH="100%"
            pos="absolute"
            top="130px"
            p={8}
          >
            <Wrap justify="center" spacing={4}>
              {barbecues &&
                barbecues.length > 0 &&
                barbecues.map((barbecue) => (
                  <BarbecueCard
                    key={barbecue.barbecueUuid}
                    date={format(parseISO(barbecue.date), "dd/MM/yyyy")}
                    description={barbecue.description}
                    participants={barbecue.totalParticipants}
                    value={formatCurrencyBRL(barbecue.totalAmount)}
                    onClick={() => handleClick(barbecue.barbecueUuid)}
                  />
                ))}

              <AddBarbecueButton onClick={handleAddBarbecueClick} />
            </Wrap>
          </Container>
        )}
      </Flex>
    </>
  );
}

export default Schedule;
