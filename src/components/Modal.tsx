import { Modal as MaterialModal } from "@material-ui/core";
import React from "react";

interface ModalProps {
  isOpen: boolean;
  handleClose: () => void;
  childern: React.ReactElement;
}

export default function Modal(props: ModalProps) {
  return (
    <MaterialModal
      open={props.isOpen}
      onClose={props.handleClose}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      {props.childern}
    </MaterialModal>
  );
}
