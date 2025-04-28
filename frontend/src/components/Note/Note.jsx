import React, { useState } from 'react';
import './Note.css';

function Note({ id, color, x, y, onDragStart, onEditNote }) {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(''); // Store note's text

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const handleBlur = () => {
    setIsEditing(false);
    onEditNote(id, text); // Update note's text in the parent component
  };

  return (
    <div
      className="note"
      style={{ backgroundColor: color, left: `${x}px`, top: `${y}px` }}
      draggable
      onDragStart={(e) => {
        e.dataTransfer.setData('note-id', id);
        e.dataTransfer.setData('note-color', color);
        onDragStart(id);
      }}
    >
      {isEditing ? (
        <input
          type="text"
          value={text}
          onChange={handleTextChange}
          onBlur={handleBlur}
          autoFocus
        />
      ) : (
        <div onClick={handleEditClick}>
          {text || 'Click to edit'}
        </div>
      )}
    </div>
  );
}

export default Note;
