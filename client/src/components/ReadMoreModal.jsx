// ReadMoreModal.js
import React from 'react';
import Modal from 'react-bootstrap/Modal';

const ReadMoreModal = ({ title, text, show, handleClose }) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{text}</p>
      </Modal.Body>
      <Modal.Footer>
        <button onClick={handleClose}>Close</button>
      </Modal.Footer>
    </Modal>
  );
};

export default ReadMoreModal;
