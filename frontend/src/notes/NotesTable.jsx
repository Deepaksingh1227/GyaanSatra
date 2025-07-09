import React from "react";
import { Button, Table } from "react-bootstrap";

function NotesTable({ notes, isPaid, isAdmin, onPreview, onDelete }) {
  return (
    <Table striped bordered hover responsive>
      <thead className="table-dark">
        <tr>
          <th>Title</th>
          <th>Session</th>
          <th>Preview</th>
          <th>Download</th>
          {isAdmin && <th>Actions</th>} {/* Show only if admin */}
        </tr>
      </thead>
      <tbody>
        {notes.map((note) => (
          <tr key={note._id}>
            <td>{note.title}</td>
            <td>{note.session}</td>
            <td>
              <Button variant="info" onClick={() => onPreview(note.fileUrl)}>
                Preview
              </Button>
            </td>
            <td>
              {isPaid || isAdmin ? (
                <a href={note.fileUrl} target="_blank" rel="noreferrer">
                  <Button variant="success">Download</Button>
                </a>
              ) : (
                <Button variant="secondary" disabled>
                  Pay to Unlock
                </Button>
              )}
            </td>
            {isAdmin && (
              <td>
                <Button
                  variant="danger"
                  onClick={() => onDelete(note._id)}
                  size="sm"
                >
                  Delete
                </Button>
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default NotesTable;
