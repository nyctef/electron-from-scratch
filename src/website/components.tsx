import * as React from 'react';

const Emphasis: React.FunctionComponent = props => <em>{props.children}</em>;

const Button: React.FunctionComponent<{
  onClick: () => void;
  primary?: boolean;
  disabled?: boolean;
}> = props => (
  <a
    className={
      `button ` +
      `${props.primary && 'button--primary'} ` +
      `${props.disabled && 'button--disabled'}`
    }
    href="#"
    onClick={() => !props.disabled && props.onClick()}
  >
    {props.children}
  </a>
);

const GrayBox: React.FunctionComponent<{ width: number }> = props => (
  <div
    className="background-color--grey--1 spaced--tight padded--tight"
    style={{ width: `${props.width}px` }}
  >
    {props.children}
  </div>
);

const Centered: React.FunctionComponent = props => (
  <div
    style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
  >
    <div>{props.children}</div>
  </div>
);

const FormField: React.FunctionComponent = props => (
  <div className="form__field-container">{props.children}</div>
);

const TextInput: React.FunctionComponent<{
  label: string;
  value: string;
  helpText?: string;
  placeholder?: string;
  onValueChange: (newValue: string) => void;
  disabled?: boolean;
}> = props => (
  <>
    <label htmlFor="text-input">{props.label}</label>
    {props.helpText && <p className="form__help-text">{props.helpText}</p>}
    <input
      type="text"
      name="text-input"
      id="text-input"
      disabled={props.disabled}
      placeholder={props.placeholder}
      value={props.value}
      onChange={e => props.onValueChange(e.target.value)}
    />
  </>
);

export { Emphasis, Button, GrayBox, Centered, FormField, TextInput };
