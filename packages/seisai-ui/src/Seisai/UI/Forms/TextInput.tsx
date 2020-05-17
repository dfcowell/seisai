import React, { FC, ChangeEvent } from "react";
import styled from "styled-components";

type TextInputProps = {
  label?: string;
  placeholder?: string;
  type?: "text" | "password";
  name: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

const Container = styled.div`
  margin-bottom: 0.8em;

  &:last-child {
    margin-bottom: 0;
  }
`;

const StyledTextInput = styled.input`
  background: #2a2a2a;
  border: none;
  border-bottom: ${props => props.theme.forms.border.normal};
  box-sizing: border-box;
  color: ${props => props.theme.colors.text};
  display: block;
  outline: none;
  padding: 0.4em;
  width: 100%;

  &:focus {
    border-bottom: ${props => props.theme.forms.border.focused};
  }
`;

const StyledLabel = styled.label`
  display: block;
  font-size: 0.8em;
  margin-bottom: 0.3em;
`;

export const TextInput: FC<TextInputProps> = ({
  label,
  name,
  placeholder,
  type,
  onChange
}) => (
  <Container>
    {label && <StyledLabel>{label}</StyledLabel>}
    <StyledTextInput
      name={name}
      type={type || "text"}
      placeholder={placeholder || ""}
      onChange={onChange}
    />
  </Container>
);
