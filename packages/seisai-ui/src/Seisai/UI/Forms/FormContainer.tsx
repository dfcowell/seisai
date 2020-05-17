import { Component, ChangeEvent, FormEvent } from "react";

export abstract class FormContainer<P, S> extends Component<P, S> {
  constructor(props: P) {
    super(props);

    this.handleInput = this.handleInput.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  protected abstract onSubmit(event: FormEvent<HTMLFormElement>): Promise<void>;

  protected handleInput(event: ChangeEvent<HTMLInputElement>) {
    const field = event.target.name as keyof S;
    this.setState({
      ...this.state,
      [field]: event.target.value
    });
  }
}
