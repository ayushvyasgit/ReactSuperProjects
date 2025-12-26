// draggableNode.js - Enhanced with modern styling
import { useState } from 'react';

export const DraggableNode = ({ type, label, icon, color }) => {
  const [isDragging, setIsDragging] = useState(false);

  const onDragStart = (event, nodeType) => {
    const appData = { nodeType };
    event.dataTransfer.setData('application/reactflow', JSON.stringify(appData));
    event.dataTransfer.effectAllowed = 'move';
    setIsDragging(true);
  };

  const onDragEnd = (event) => {
    setIsDragging(false);
  };

  return (
    <div
      className={type}
      onDragStart={(event) => onDragStart(event, type)}
      onDragEnd={onDragEnd}
      style={{ 
        cursor: isDragging ? 'grabbing' : 'grab',
        minWidth: '120px',
        height: '80px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        borderRadius: '12px',
        background: color ? `linear-gradient(135deg, ${color} 0%, ${adjustColor(color, -20)} 100%)` : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        boxShadow: isDragging 
          ? '0 8px 24px rgba(0,0,0,0.2)' 
          : '0 4px 12px rgba(0,0,0,0.1)',
        transition: 'all 0.3s ease',
        transform: isDragging ? 'scale(1.05)' : 'scale(1)',
        border: '2px solid rgba(255,255,255,0.3)',
        gap: '6px',
        userSelect: 'none'
      }} 
      draggable
      onMouseEnter={(e) => {
        if (!isDragging) {
          e.currentTarget.style.transform = 'translateY(-4px) scale(1.02)';
          e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.15)';
        }
      }}
      onMouseLeave={(e) => {
        if (!isDragging) {
          e.currentTarget.style.transform = 'scale(1)';
          e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
        }
      }}
    >
      <span style={{ 
        fontSize: '28px',
        filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))'
      }}>
        {icon || '📦'}
      </span>
      <span style={{ 
        color: '#fff',
        fontWeight: '600',
        fontSize: '13px',
        textShadow: '0 1px 2px rgba(0,0,0,0.2)',
        letterSpacing: '0.3px'
      }}>
        {label}
      </span>
    </div>
  );
};

// Helper function to adjust color brightness
function adjustColor(color, amount) {
  const clamp = (num) => Math.min(Math.max(num, 0), 255);
  
  // Simple color adjustment (works for hex colors)
  if (color.startsWith('#')) {
    const num = parseInt(color.slice(1), 16);
    const r = clamp((num >> 16) + amount);
    const g = clamp(((num >> 8) & 0x00FF) + amount);
    const b = clamp((num & 0x0000FF) + amount);
    return `#${(r << 16 | g << 8 | b).toString(16).padStart(6, '0')}`;
  }
  
  return color;
}

export default DraggableNode;