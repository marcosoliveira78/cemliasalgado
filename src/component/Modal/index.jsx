import { Button } from 'bootstrap';
import React, { useState } from 'react';
import { Buttons } from '../../pages/styles';
import

const Modal = ({ children }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
      <>
      <Button variant="primary" onClick={handleShow}>
        Launch demo modal
      </Button>
  <Modal
    show={show}
    onHide={handleClose}
    backdrop="static"
    keyboard={false}
  >
    <Modal.Header closeButton>
      <Modal.Title>Modal title</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      { children }
    </Modal.Body>
    <Modal.Footer>
      <Buttons variant="danger" onClick={handleClose}>
        Fechar
      </Buttons>
      <Buttons variant="sucess">Confirmar</Buttons>
    </Modal.Footer>
  </Modal>
      </>
  );
};

export default Modal;
