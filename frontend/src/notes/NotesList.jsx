// src/notes/NotesList.jsx
import React, { useEffect, useState } from "react";
import axios from "../api/axios"; // ✅ custom axios instance
import { useParams } from "react-router-dom";
import PayButton from "../payment/PayButton";

const NotesList = () => {
  const { session } = useParams();
  const [notes, setNotes] = useState([]);
  const [allowed, setAllowed] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAccess = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("You must be logged in.");
          return;
        }

        // Debug
        console.log("Fetching access for:", session);

        const accessRes = await axios.get(`/api/payment/has-access/${session}`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        setAllowed(accessRes.data.allowed);

        if (accessRes.data.allowed) {
          const notesRes = await axios.get(`/api/notes/${session}`, {
            headers: { Authorization: `Bearer ${token}` }
          });
          setNotes(notesRes.data);
        }
      } catch (err) {
        console.error("Error fetching notes:", err);
        setError("Something went wrong. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchAccess();
  }, [session]);

  if (loading) return <div className="container mt-5 text-center">Loading...</div>;

  return (
    <div className="container mt-4">
      <h3 className="mb-3 text-capitalize">Notes for {session}</h3>

      {error && <div className="alert alert-danger">{error}</div>}

      {!allowed && !error && (
        <div className="text-center">
          <p>You don’t have access to these notes.</p>
          <PayButton category={session} />
        </div>
      )}

      {allowed && notes.length === 0 && <p>No notes available for this session.</p>}

      {allowed && notes.length > 0 && (
        <div className="row">
          {notes.map((note, i) => (
            <div className="col-md-6 mb-3" key={i}>
              <div className="card p-3 shadow">
                <h5>{note.title}</h5>
                <a
                  href={note.url}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-sm btn-primary mt-2"
                >
                  Download
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NotesList;
