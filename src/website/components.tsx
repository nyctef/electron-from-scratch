import * as React from "react";

const Emphasis: React.FunctionComponent = props => <em>{props.children}</em>;

const Button: React.FunctionComponent<{
  onClick: () => void;
  primary?: boolean;
}> = props => (
  <a
    className={`button ${props.primary && "button--primary"}`}
    href="#"
    onClick={props.onClick}
  >
    {props.children}
  </a>
);

const GrayBox: React.FunctionComponent = props => (
  <div className="background-color--grey--1 spaced--tight padded--tight">
    {props.children}
  </div>
);

const Centered: React.FunctionComponent = props => (
  <div
    style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
  >
    <div>{props.children}</div>
  </div>
);

export { Emphasis, Button, GrayBox, Centered };
