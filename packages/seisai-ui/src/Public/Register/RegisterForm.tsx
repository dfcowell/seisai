import React, { FormEvent } from 'react';
import {
  Card,
  Elevation,
  FormGroup,
  InputGroup,
  Button,
  Intent,
} from '@blueprintjs/core';

import { P } from 'UI/Typography/P';
import { Seisai } from 'UI/Brand/Seisai';
import { FormContainer } from 'UI/Forms/FormContainer';

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

    this.state = { email: '', username: '', password: '' };
  }

  protected async onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    await fetch('/auth/signup', {
      method: 'post',
      body: JSON.stringify(this.state),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  public render() {
    return (
      <Card elevation={Elevation.TWO}>
        <P align="center">
          <Seisai />
        </P>
        <P>Sign up for a new Seisai account.</P>
        <P>
          Your username will form the url for your profile, so it must be unique
          and must not contain spaces.
        </P>
        <form onSubmit={this.onSubmit}>
          <FormGroup labelFor="email" label="Email">
            <InputGroup
              id="email"
              name="email"
              value={this.state.email}
              onChange={this.handleInput}
            />
          </FormGroup>
          <FormGroup labelFor="username" label="Username">
            <InputGroup
              id="username"
              name="username"
              value={this.state.username}
              onChange={this.handleInput}
            />
          </FormGroup>
          <FormGroup labelFor="password" label="Password">
            <InputGroup
              id="password"
              name="password"
              value={this.state.password}
              onChange={this.handleInput}
            />
          </FormGroup>
          <Button intent={Intent.PRIMARY} type="submit">
            Submit
          </Button>
        </form>
      </Card>
    );
  }
}
