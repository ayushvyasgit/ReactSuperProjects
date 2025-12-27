// src/components/NameInputModal.js
import React, { useState, useEffect, useRef } from 'react';

export const NameInputModal = ({ nodeType, onConfirm, onCancel, existingNames }) => {
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const inputRef = useRef(null);

  // Focus input when modal opens
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  // Get friendly type name
  const getTypeName = (type) => {
    const typeMap = {
      customInput: 'Input',
      customOutput: 'Output',
      llm: 'OpenAI',
      text: 'Text',
      database: 'Database',
      api: 'API'
    };
    return typeMap[type] || type;
  };

  const validateName = (value) => {
    // Empty check
    if (!value || value.trim() === '') {
      return 'Name is required';
    }

    // Must start with letter
    if (!/^[a-zA-Z]/.test(value)) {
      return 'Name must start with a letter';
    }

    // Only letters, numbers, underscore
    if (!/^[a-zA-Z_][a-zA-Z0-9_]*$/.test(value)) {
      return 'Name can only contain letters, numbers, and underscores';
    }

    // Check if already exists (case-insensitive)
    if (existingNames.some(n => n.toLowerCase() === value.toLowerCase())) {
      return 'Name already exists';
    }

    return '';
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setName(value);
    
    // Clear error when user types
    if (error) {
      setError('');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const validationError = validateName(name);
    if (validationError) {
      setError(validationError);
      return;
    }

    onConfirm(name);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      onCancel();
    }
  };

  const typeName = getTypeName(nodeType);

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 10000,
        animation: 'fadeIn 0.2s',
      }}
      onClick={onCancel}
    >
      <div
        style={{
          background: 'white',
          borderRadius: 12,
          padding: 24,
          width: '90%',
          maxWidth: 400,
          boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
          animation: 'slideIn 0.3s',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <h2 style={{
          margin: '0 0 8px 0',
          fontSize: 20,
          fontWeight: 600,
          color: '#111827',
        }}>
          Create {typeName} Node
        </h2>

        <p style={{
          margin: '0 0 20px 0',
          fontSize: 14,
          color: '#6b7280',
        }}>
          Give this node a unique name. This name will be used as its ID.
        </p>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: 20 }}>
            <label style={{
              display: 'block',
              marginBottom: 6,
              fontSize: 14,
              fontWeight: 500,
              color: '#374151',
            }}>
              Node Name
            </label>
            <input
              ref={inputRef}
              type="text"
              value={name}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              placeholder={`e.g., UserInput, ProcessData, ${typeName}1`}
              style={{
                width: '100%',
                padding: '10px 12px',
                border: error ? '2px solid #ef4444' : '2px solid #e5e7eb',
                borderRadius: 8,
                fontSize: 14,
                outline: 'none',
                transition: 'border-color 0.2s',
                boxSizing: 'border-box',
              }}
              onFocus={(e) => {
                if (!error) {
                  e.target.style.borderColor = '#6366f1';
                }
              }}
              onBlur={(e) => {
                if (!error) {
                  e.target.style.borderColor = '#e5e7eb';
                }
              }}
            />
            {error && (
              <div style={{
                marginTop: 6,
                fontSize: 13,
                color: '#ef4444',
                display: 'flex',
                alignItems: 'center',
                gap: 4,
              }}>
                <span>⚠️</span>
                <span>{error}</span>
              </div>
            )}
            {!error && (
              <div style={{
                marginTop: 6,
                fontSize: 12,
                color: '#6b7280',
              }}>
                Must start with a letter, only letters, numbers, and underscores
              </div>
            )}
          </div>

          <div style={{
            display: 'flex',
            gap: 12,
            justifyContent: 'flex-end',
          }}>
            <button
              type="button"
              onClick={onCancel}
              style={{
                padding: '10px 20px',
                background: '#f3f4f6',
                border: 'none',
                borderRadius: 8,
                fontSize: 14,
                fontWeight: 500,
                color: '#374151',
                cursor: 'pointer',
                transition: 'background 0.2s',
              }}
              onMouseEnter={(e) => e.target.style.background = '#e5e7eb'}
              onMouseLeave={(e) => e.target.style.background = '#f3f4f6'}
            >
              Cancel
            </button>
            <button
              type="submit"
              style={{
                padding: '10px 20px',
                background: '#6366f1',
                border: 'none',
                borderRadius: 8,
                fontSize: 14,
                fontWeight: 500,
                color: 'white',
                cursor: 'pointer',
                transition: 'background 0.2s',
              }}
              onMouseEnter={(e) => e.target.style.background = '#4f46e5'}
              onMouseLeave={(e) => e.target.style.background = '#6366f1'}
            >
              Create Node
            </button>
          </div>
        </form>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideIn {
          from { 
            transform: translateY(-20px);
            opacity: 0;
          }
          to { 
            transform: translateY(0);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};

export default NameInputModal;