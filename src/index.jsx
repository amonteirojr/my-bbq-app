import React from "react";
import ReactDOM from "react-dom";

import "@fontsource/raleway/400.css";
import "@fontsource/open-sans/400.css";

import { ChakraProvider } from "@chakra-ui/react";

import App from "./App";

import theme from "./theme/customTheme";

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
