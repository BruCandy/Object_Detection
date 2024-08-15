import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { ChakraProvider } from "@chakra-ui/react";

import theme from "./theme/theme.ts";
import React from "react";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ChakraProvider  theme={theme}>
      <App />
    </ChakraProvider>
  </React.StrictMode>,
);
