import styled from "styled-components";
import { connect } from "react-redux";
import { closeModal } from "Store/Modal/ModalActions";

const BackdropDiv = styled.div`
  cursor: pointer;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1000;
`;

export const Backdrop = connect(
  () => ({}),
  dispatch => ({
    onClick: () => dispatch(closeModal())
  })
)(BackdropDiv);
