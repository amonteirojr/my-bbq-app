import useToastMessage from "./ToastMessageHook";

export default function useHandleErrors() {
  const showMessage = useToastMessage();

  function handleErrorStatus(error, defaultMessage) {
    const statusCode = error && error.response && error.response.status;

    switch (statusCode) {
      case 401:
        showMessage("Acesso negado para o usuário.", "error");
        break;
      case 409:
        showMessage("Dados já existem no banco. Nada foi alterado.", "warning");
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
