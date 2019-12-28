import React from "react";
import Container from "@material-ui/core/Container";
import AddUser from "./addUser.js";
function App() {
  return (
    <React.Fragment>
      <Container fixed>
        <AddUser />
      </Container>
    </React.Fragment>
  );
}

export default App;
