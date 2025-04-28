import React, { useState, useRef } from 'react';
import './Grid.css';
import Note from '../Note/Note';
import NotePalette from '../NotePalette/NotePalette';

const GRID_SIZE = 100;
const CELL_SIZE = 200;
const GRID_PIXELS = GRID_SIZE * CELL_SIZE;

function Grid() {
  const [notes, setNotes] = useState([]);
  const wrapperRef = useRef(null);

  const clamp = (val, min, max) => Math.min(Math.max(val, min), max);

  const handleMouseDown = (e) => {
    // handle pan/movement logic...
  };

  const handleMouseMove = (e) => {
    // handle pan logic...
  };

  const handleMouseUp = () => {
    // handle pan end...
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const noteId = e.dataTransfer.getData('note-id');
    const color = e.dataTransfer.getData('note-color');
    const gridRect = wrapperRef.current.getBoundingClientRect();
    const x = e.clientX - gridRect.left;
    const y = e.clientY - gridRect.top;

    // Snap to the nearest grid cell
    const snappedX = Math.floor(x / CELL_SIZE) * CELL_SIZE;
    const snappedY = Math.floor(y / CELL_SIZE) * CELL_SIZE;

    const newNote = {
      id: noteId,
      color,
      x: snappedX,
      y: snappedY,
      text: '', // Initially empty text
    };

    setNotes((prevNotes) => [...prevNotes, newNote]);
  };

  const handleEditNote = (id, newText) => {
    setNotes((prevNotes) =>
      prevNotes.map((note) =>
        note.id === id ? { ...note, text: newText } : note
      )
    );
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <div
      ref={wrapperRef}
      className="grid-wrapper"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      <div className="grid-container">
        {notes.map((note) => (
          <Note
            key={note.id}
            id={note.id}
            color={note.color}
            x={note.x}
            y={note.y}
            onEditNote={handleEditNote} // Pass the handler to update note text
            onDragStart={() => {}}
          />
        ))}
      </div>
    </div>
  );
}

export default Grid;
