import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { ApolloProvider } from "@apollo/react-hooks";
import APclient from "./Client";

ReactDOM.render(
  <ApolloProvider client={APclient}>
    <App />
  </ApolloProvider>,
  document.getElementById("root")
);
