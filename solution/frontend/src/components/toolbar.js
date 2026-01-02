// src/components/toolbar.js - Compact 1-line toolbar with section navigation
import React, { useState } from 'react';
import DraggableNode from '../DraggableNode';

export const PipelineToolbar = () => {
  const [activeSection, setActiveSection] = useState('basic');

  const nodeTypes = {
    basic: [
      { type: 'customInput', label: 'Input', icon: '📥' },
      { type: 'customOutput', label: 'Output', icon: '📤' },
      { type: 'text', label: 'Text', icon: '📝' },
    ],
    ai: [
      { type: 'chatgpt', label: 'ChatGPT', icon: '🤖' },
      { type: 'gemini', label: 'Gemini', icon: '✨' },
      { type: 'llm', label: 'LLM', icon: '🤖' },
    ],
    data: [
      { type: 'database', label: 'Database', icon: '🗄️' },
      { type: 'mongodb', label: 'MongoDB', icon: '🍃' },
    ],
    output: [
      { type: 'wordGenerator', label: 'Word Doc', icon: '📄' },
      { type: 'api', label: 'API Call', icon: '🌐' },
    ],
  };

  const sections = [
    { id: 'basic', label: 'Basic', icon: '📦' },
    { id: 'ai', label: 'AI Models', icon: '🤖' },
    { id: 'data', label: 'Data', icon: '🗄️' },
    { id: 'output', label: 'Output', icon: '📤' },
  ];

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      background: '#ffffff',
      borderBottom: '2px solid #e6e9ef',
    }}>
      {/* Single Line Header with Navigation */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '12px 16px',
        gap: 16,
      }}>
        {/* Logo */}
        <div style={{
          fontSize: 16,
          fontWeight: 700,
          color: '#111827',
          whiteSpace: 'nowrap',
        }}>
          VectorShift.ai
        </div>

        {/* Section Navigation Tabs */}
        <div style={{
          display: 'flex',
          gap: 4,
          flex: 1,
          justifyContent: 'center',
        }}>
          {sections.map(section => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              style={{
                padding: '8px 16px',
                background: activeSection === section.id 
                  ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                  : '#f3f4f6',
                color: activeSection === section.id ? '#ffffff' : '#6b7280',
                border: 'none',
                borderRadius: 8,
                fontSize: 13,
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s',
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                whiteSpace: 'nowrap',
              }}
              onMouseEnter={(e) => {
                if (activeSection !== section.id) {
                  e.target.style.background = '#e5e7eb';
                }
              }}
              onMouseLeave={(e) => {
                if (activeSection !== section.id) {
                  e.target.style.background = '#f3f4f6';
                }
              }}
            >
              <span>{section.icon}</span>
              <span>{section.label}</span>
            </button>
          ))}
        </div>

        {/* Stats Badge */}
        <div style={{
          padding: '6px 12px',
          background: '#f3f4f6',
          borderRadius: 8,
          fontSize: 12,
          fontWeight: 600,
          color: '#6b7280',
          whiteSpace: 'nowrap',
        }}>
          {nodeTypes[activeSection].length} Nodes
        </div>
      </div>

      {/* Node Section - Only Active Section */}
      <div style={{
        padding: '12px 16px',
        background: '#f9fafb',
        borderTop: '1px solid #e6e9ef',
      }}>
        <div style={{
          display: 'flex',
          gap: 8,
          flexWrap: 'wrap',
          minHeight: 52,
        }}>
          {nodeTypes[activeSection].map((node) => (
            <DraggableNode 
              key={node.type} 
              type={node.type} 
              label={node.label} 
              icon={node.icon} 
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PipelineToolbar;