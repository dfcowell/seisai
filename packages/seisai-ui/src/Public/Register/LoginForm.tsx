import React, { FormEvent } from 'react';
import { Dialog } from 'UI/Containers/Dialog';
import { P } from 'UI/Typography/P';
import { Seisai } from 'UI/Brand/Seisai';
import { TextInput } from 'UI/Forms/TextInput';
import { Primary } from 'UI/Forms/Buttons';
import { FormContainer } from 'UI/Forms/FormContainer';
import { connect } from 'react-redux';
import { logIn, UserCredentials } from 'Store/User/UserActions';
import { ThunkDispatch } from 'redux-thunk';
import { IAppState } from 'Store/IAppState';
import { AnyAction } from 'redux';
import { IUserData } from 'Store/User/IUserData';
import {
  Card,
  Elevation,
  FormGroup,
  InputGroup,
  Button,
  Intent,
} from '@blueprintjs/core';

type LoginFormProps = {
  logIn: (credentials: UserCredentials) => Promise<IUserData>;
};

type LoginFormState = {
  username: string;
  password: string;
};

class LoginForm extends FormContainer<LoginFormProps, LoginFormState> {
  constructor(props: LoginFormProps) {
    super(props);

    this.state = { username: '', password: '' };
  }

  protected async onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    await this.props.logIn(this.state);
  }

  public render() {
    return (
      <Card elevation={Elevation.TWO}>
        <P align="center">
          <Seisai />
        </P>
        <P align="center">Please log in to manage your photos.</P>
        <form onSubmit={this.onSubmit}>
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
              type="password"
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

export const ConnectedLoginForm = connect(
  () => ({}),
  (dispatch: ThunkDispatch<IAppState, null, AnyAction>) => ({
    logIn: (credentials: UserCredentials) => dispatch(logIn(credentials)),
  }),
)(LoginForm);
