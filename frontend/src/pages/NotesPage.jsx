import React, { useEffect, useState } from "react";
import axios from "axios";
import UploadForm from "../notes/UploadForm";
import NotesTable from "../notes/NotesTable";
import PDFModal from "../notes/PDFModal";
import PayButton from "../payment/PayButton";
import { useAuth } from "../context/AuthContext";  // ✅ Use your AuthContext

function NotesPage() {
  const [notes, setNotes] = useState([]);
  const [previewUrl, setPreviewUrl] = useState("");
  const [showModal, setShowModal] = useState(false);

  const { user } = useAuth(); // 👈 Get current user from context
  const isAdmin = user?.role === "admin";
  const isPaid = user?.hasPaid || false;

  const fetchNotes = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/notes/all");
      setNotes(res.data);
    } catch (err) {
      console.error("Error fetching notes:", err);
    }
  };

  // ✅ Delete Note Handler (Admin Only)
  const handleDelete = async (noteId) => {
    try {
      await axios.delete(`http://localhost:5000/api/notes/${noteId}`);
      fetchNotes(); // Refresh the notes list
    } catch (err) {
      console.error("Error deleting note:", err);
      alert("Failed to delete note.");
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <div className="container mt-5 pt-5">
      <h2 className="text-center mb-4 text-primary fw-bold">📘 Study Notes</h2>

      {/* ✅ Show Pay button only if user is not paid and not admin */}
      {!isPaid && !isAdmin && (
        <div className="text-center mb-4">
          <PayButton onSuccess={() => window.location.reload()} />
        </div>
      )}

      {/* ✅ Admin upload form */}
      {isAdmin && <UploadForm onUpload={fetchNotes} />}

      {/* ✅ Notes visible to paid users or admin */}
      {(isPaid || isAdmin) && (
        <NotesTable
          notes={notes}
          isPaid={isPaid}
          isAdmin={isAdmin}            // ✅ Pass this prop
          onDelete={handleDelete}      // ✅ Pass delete function
          onPreview={(url) => {
            setPreviewUrl(url);
            setShowModal(true);
          }}
        />
      )}

      <PDFModal
        show={showModal}
        handleClose={() => setShowModal(false)}
        pdfUrl={previewUrl}
      />
    </div>
  );
}

export default NotesPage;
