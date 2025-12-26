// src/toolbar.js
import React from 'react';
import DraggableNode from '../DraggableNode';

export const PipelineToolbar = () => {
  const nodeTypes = [
    { type: 'customInput', label: 'Input', icon: '📥' },
    { type: 'llm', label: 'OpenAI', icon: '🤖' },
    { type: 'customOutput', label: 'Output', icon: '📤' },
    { type: 'text', label: 'Text', icon: '📝' },
    { type: 'database', label: 'Database', icon: '🗄️' },
    { type: 'api', label: 'API Call', icon: '🌐' },
  ];

  return (
    <div style={{
      padding: 16,
      background: '#ffffff',
      borderBottom: '1px solid #e6e9ef',
      display: 'flex',
      flexDirection: 'column',
      gap: 12
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ margin: 0, fontSize: 18, fontWeight: 700, color: '#111827' }}>New Workflow</h2>
          <div style={{ fontSize: 13, color: '#6b7280' }}>Drag nodes to canvas</div>
        </div>

        <div style={{
          padding: '6px 10px',
          borderRadius: 8,
          background: '#f1f5f9',
          color: '#0f172a',
          fontWeight: 600,
          fontSize: 13
        }}>
          {nodeTypes.length} Node Types
        </div>
      </div>

      <div style={{
        display: 'flex',
        gap: 10,
        flexWrap: 'wrap'
      }}>
        {nodeTypes.map((n) => (
          <DraggableNode key={n.type} type={n.type} label={n.label} icon={n.icon} />
        ))}
      </div>
    </div>
  );
};

export default PipelineToolbar;
