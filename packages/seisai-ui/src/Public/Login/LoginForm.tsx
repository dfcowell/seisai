import React, { FormEvent } from "react";
import { Dialog } from "UI/Containers/Dialog";
import { P } from "UI/Typography/P";
import { Seisai } from "UI/Brand/Seisai";
import { TextInput } from "UI/Forms/TextInput";
import { Primary } from "UI/Forms/Buttons";
import { FormContainer } from "UI/Forms/FormContainer";
import { connect } from "react-redux";
import { logIn, UserCredentials } from "Store/User/UserActions";
import { ThunkDispatch } from "redux-thunk";
import { IAppState } from "Store/IAppState";
import { AnyAction } from "redux";
import { IUserData } from "Store/User/IUserData";

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

    this.state = { username: "", password: "" };
  }

  protected async onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    await this.props.logIn(this.state);
  }

  public render() {
    return (
      <Dialog width="24em">
        <P align="center">
          <Seisai />
        </P>
        <P align="center">Please log in to manage your photos.</P>
        <form onSubmit={this.onSubmit}>
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

export const ConnectedLoginForm = connect(
  () => ({}),
  (dispatch: ThunkDispatch<IAppState, null, AnyAction>) => ({
    logIn: (credentials: UserCredentials) => dispatch(logIn(credentials))
  })
)(LoginForm);
