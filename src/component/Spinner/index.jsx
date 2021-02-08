import React from 'react';
import { Modal, Spinner } from 'react-bootstrap';
import './styles.css';

function CustomSpinner(props) {
  const { show } = props;
  const { onHide } = props;

  return (
        <>
            <Modal
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                show={show}
                onHide={onHide}
                backdrop="static"
                keyboard={false}
                contentClassName="content-modal-spinner"
            >
                <Modal.Body>
                    <Spinner animation="border" variant="primary" className="modal-spinner" />
                </Modal.Body>
            </Modal>
        </>
  );
}

export default CustomSpinner;
