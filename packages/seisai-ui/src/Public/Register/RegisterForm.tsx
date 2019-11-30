import React, { FormEvent } from "react";
import { Dialog } from "UI/Containers/Dialog";
import { P } from "UI/Typography/P";
import { Seisai } from "UI/Brand/Seisai";
import { TextInput } from "UI/Forms/TextInput";
import { Primary } from "UI/Forms/Buttons";
import { FormContainer } from "UI/Forms/FormContainer";

type RegisterFormProps = {};

type RegisterFormState = {
  email: string;
  username: string;
  password: string;
};

export class RegisterForm extends FormContainer<
  RegisterFormProps,
  RegisterFormState
> {
  constructor(props: RegisterFormProps) {
    super(props);

    this.state = { email: "", username: "", password: "" };
  }

  protected async onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    await fetch("/auth/signup", {
      method: "post",
      body: JSON.stringify(this.state),
      headers: {
        "Content-Type": "application/json"
      }
    });
  }

  public render() {
    return (
      <Dialog width="24em">
        <P align="center">
          <Seisai />
        </P>
        <P>Sign up for a new Seisai account.</P>
        <P>
          Your username will form the url for your profile, so it must be unique
          and must not contain spaces.
        </P>
        <form onSubmit={this.onSubmit}>
          <TextInput
            name="email"
            label="Email"
            value={this.state.email}
            onChange={this.handleInput}
          />
          <TextInput
            name="username"
            label="Username"
            value={this.state.username}
            onChange={this.handleInput}
          />
          <TextInput
            name="password"
            label="Password"
            type="password"
            value={this.state.password}
            onChange={this.handleInput}
          />
          <Primary>Submit</Primary>
        </form>
      </Dialog>
    );
  }
}
