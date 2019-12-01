import { ComponentType } from "react";

export enum ModalAction {
  Open = "seisai/modal/OPEN",
  Close = "seisai/modal/CLOSE"
}

export const openModal = (Content: ComponentType) => ({
  type: ModalAction.Open,
  Content
});

export const closeModal = () => ({
  type: ModalAction.Close
});
