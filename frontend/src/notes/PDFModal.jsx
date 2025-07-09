import React from "react";
import { Modal, Button } from "react-bootstrap";

function PDFModal({ show, handleClose, pdfUrl }) {
  return (
    <Modal show={show} onHide={handleClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>PDF Preview</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <iframe src={pdfUrl} width="100%" height="500px" title="Preview" />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default PDFModal;
