import { useContext } from "react";
import { useHistory } from "react-router-dom";
import useToastMessage from "./ToastMessageHook";

import { AuthContext } from "../contexts/AuthContext";

export default function useHandleErrors() {
  const showMessage = useToastMessage();

  const history = useHistory();
  const { logout } = useContext(AuthContext);

  function handleErrorStatus(error) {
    const statusCode = error && error.response && error.response.status;

    switch (statusCode) {
      case 401:
        showMessage("Acesso negado para o usuário.", "error");
        // history.push("/login");
        // logout();
        break;
      case 409:
        showMessage("Dados já existem no banco!", "warning");
        break;
      default:
        showMessage(
          "Um erro inesperado aconteceu. Por favor, tente novamente!",
          "error"
        );
        break;
    }
  }

  return handleErrorStatus;
}
