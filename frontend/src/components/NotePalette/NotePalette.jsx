import React from 'react';
import './NotePalette.css';

const noteTypes = [
  { color: '#ffeb3b', label: '' },
  { color: '#ff5722', label: '' },
  { color: '#4caf50', label: '' },
];

const handleDrop = async (e) => {
  e.preventDefault();
  const color = e.dataTransfer.getData('note-color');
  const gridRect = wrapperRef.current.getBoundingClientRect();
  const x = e.clientX - gridRect.left;
  const y = e.clientY - gridRect.top;
  
  // Snap to the nearest grid cell
  const snappedX = Math.floor(x / CELL_SIZE) * CELL_SIZE;
  const snappedY = Math.floor(y / CELL_SIZE) * CELL_SIZE;

  try {
    const response = await api.post('/api/notes/', { color, x: snappedX, y: snappedY, text: '' });
    setNotes(prevNotes => [...prevNotes, response.data]);
  } catch (error) {
    console.error("Failed to create note:", error);
  }
};

function NotePalette() {
  return (
    <div className="note-palette">
      {noteTypes.map((note, idx) => (
        <div
          key={idx}
          className="note-sample"
          draggable
          onDragStart={(e) => {
            e.dataTransfer.setData('note-color', note.color);
          }}
          style={{ backgroundColor: note.color }}
        >
          {note.label}
        </div>
      ))}
    </div>
  );
}

export default NotePalette;

