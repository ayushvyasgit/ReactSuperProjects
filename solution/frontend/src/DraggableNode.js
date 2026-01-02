// src/DraggableNode.js - Enhanced draggable node component
import React from 'react';

export const DraggableNode = ({ type, label, icon }) => {
  const onDragStart = (event, nodeType) => {
    const appData = { nodeType };
    event.dataTransfer.effectAllowed = 'move';
    event.dataTransfer.setData('application/reactflow', JSON.stringify(appData));
  };

  return (
    <div
      className={`draggable-node`}
      onDragStart={(event) => onDragStart(event, type)}
      draggable
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        padding: '10px 16px',
        background: '#ffffff',
        border: '2px solid #e6e9ef',
        borderRadius: 8,
        cursor: 'grab',
        transition: 'all 0.2s',
        fontSize: 14,
        fontWeight: 500,
        color: '#374151',
        userSelect: 'none',
        boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-2px)';
        e.currentTarget.style.boxShadow = '0 4px 12px rgba(102, 126, 234, 0.15)';
        e.currentTarget.style.borderColor = '#667eea';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.05)';
        e.currentTarget.style.borderColor = '#e6e9ef';
      }}
      onDragEnd={(e) => {
        e.currentTarget.style.cursor = 'grab';
      }}
      onDrag={(e) => {
        e.currentTarget.style.cursor = 'grabbing';
      }}
    >
      <span style={{ fontSize: 18 }}>{icon}</span>
      <span>{label}</span>
    </div>
  );
};

export default DraggableNode;