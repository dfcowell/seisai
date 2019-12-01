import React, { FC, FormEvent } from "react";
import { P } from "UI/Typography/P";
import { TextInput } from "UI/Forms/TextInput";
import { FormContainer } from "UI/Forms/FormContainer";
import { Primary } from "UI/Forms/Buttons";
import { connect } from "react-redux";
import { ICollection } from "Store/Collections/ICollection";
import { createCollection } from "Store/Collections/CollectionActions";
import { ThunkDispatch } from "redux-thunk";
import { IAppState } from "Store/IAppState";
import { AnyAction } from "redux";
import { closeModal } from "Store/Modal/ModalActions";

type CreateCollectionProps = {
  createCollection: (data: Partial<ICollection>) => Promise<ICollection>;
  closeModal: () => void;
};

type CreateCollectionState = {
  name: string;
  description: string;
  slug: string;
  privacy: "private" | "public" | "unlisted";
};

class CreateCollectionComponent extends FormContainer<
  CreateCollectionProps,
  CreateCollectionState
> {
  constructor(props: CreateCollectionProps) {
    super(props);

    this.state = {
      name: "",
      description: "",
      slug: "",
      privacy: "private"
    };
  }

  protected async onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    await this.props.createCollection(this.state);

    this.props.closeModal();
  }

  render() {
    return (
      <>
        <h1>New Collection</h1>
        <P>
          Collections are used to organize your photos in Seisai. Photos can
          belong to any number of collections.
        </P>
        <form onSubmit={this.onSubmit}>
          <TextInput
            name="name"
            label="Name"
            placeholder="My awesome collection"
            value={this.state.name}
            onChange={this.handleInput}
          />
          <TextInput
            name="slug"
            label="Slug"
            placeholder="my-awesome-collection"
            value={this.state.slug}
            onChange={this.handleInput}
          />
          <TextInput
            name="description"
            label="Description"
            value={this.state.description}
            onChange={this.handleInput}
          />
          <Primary type="submit">Create Collection</Primary>
        </form>
      </>
    );
  }
}

export const CreateCollection = connect(
  state => ({}),
  (dispatch: ThunkDispatch<IAppState, null, AnyAction>) => ({
    createCollection: (collection: Partial<ICollection>) =>
      dispatch(createCollection(collection)),
    closeModal: () => dispatch(closeModal())
  })
)(CreateCollectionComponent);
