import * as React from "react";
import * as ReactDOM from "react-dom";
import "./style/index.scss";
import { Emphasis, Centered, Button, GrayBox } from "./components";

const app = document.getElementById("app");

const App = () => (
  <Centered>
    <GrayBox>
      <p style={{ width: "600px" }}>
        Hello, <Emphasis>world</Emphasis>
      </p>
      <Button primary onClick={() => alert("Ok!")}>
        OK
      </Button>
    </GrayBox>
  </Centered>
);

ReactDOM.render(<App />, app);
