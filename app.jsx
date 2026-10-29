import React, { useState, useEffect, useContext } from "react";
import { ThemeContext } from "./Theme_context";

export default function App() {
  const { dark, toggleTheme } = useContext(ThemeContext);
  const [note, setNote] = useState("");

  const [notes, setNotes] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("notes")) || [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
    document.title = `Notes (${notes.length})`;
  }, [notes]);

  const addNote = () => {
    if (!note.trim()) return;

    setNotes((prev) => [
      ...prev,
      { id: Date.now(), text: note.trim() }
    ]);

    setNote("");
  };

  const deleteNote = (id) => {
    setNotes((prev) => prev.filter((item) => item.id !== id));
  };

  const styles = {
    backgroundColor: dark ? "#1e1e1e" : "#f5f5f5",
    color: dark ? "#ffffff" : "#222222",
    minHeight: "100vh",
    padding: "30px",
    boxSizing: "border-box",
    fontFamily: "Arial, sans-serif",
  };

  return (
    <div style={styles}>
      <h1>My Notes ({notes.length})</h1>

      <button onClick={toggleTheme}>
        {dark ? "Light Mode" : "Dark Mode"}
      </button>

      <div style={{ marginTop: "20px" }}>
        <input
          type="text"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addNote()}
          placeholder="Enter your note"
          style={{ padding: "10px", width: "230px" }}
        />

        <button
          onClick={addNote}
          style={{ padding: "10px", marginLeft: "8px" }}
        >
          Add Note
        </button>
      </div>

      {notes.length === 0 ? (
        <p>No notes yet.</p>
      ) : (
        <ul>
          {notes.map((item) => (
            <li key={item.id} style={{ marginTop: "12px" }}>
              {item.text}{" "}
              <button onClick={() => deleteNote(item.id)}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}