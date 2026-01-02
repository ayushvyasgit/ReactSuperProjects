// src/nodes/BaseNode.js - Enhanced with password field support
import React, { useState, useEffect, useRef } from "react";
import { Handle, Position } from "reactflow";
import "./nodeStyles.css";
import { useStore } from "../store";

const IconButton = ({ title, onClick, children }) => (
  <button className="vs-icon-btn" title={title} onClick={onClick}>
    {children}
  </button>
);

export const BaseNode = ({ id, data, config, selected }) => {
  const [fieldValues, setFieldValues] = useState({});
  const [nodeId, setNodeId] = useState(id);
  const [isEditingId, setIsEditingId] = useState(false);
  const [idError, setIdError] = useState('');
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [showPasswords, setShowPasswords] = useState({});
  
  const prevFieldValuesRef = useRef({});
  
  const deleteNode = useStore((state) => state.deleteNode);
  const updateNodeField = useStore((state) => state.updateNodeField);
  const validateName = useStore((state) => state.validateName);
  const renameNode = useStore((state) => state.renameNode);
  const nodes = useStore((state) => state.nodes);
  const autoConnectFromReferences = useStore((state) => state.autoConnectFromReferences);
  const removeAutoConnections = useStore((state) => state.removeAutoConnections);

  useEffect(() => {
    if (confirmDelete) {
      const timer = setTimeout(() => {
        setConfirmDelete(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [confirmDelete]);

  useEffect(() => {
    setNodeId(id);
  }, [id]);

  useEffect(() => {
    const initialValues = {};
    config.fields?.forEach((field) => {
      initialValues[field.name] =
        (data && data[field.name]) ?? field.defaultValue ?? "";
    });
    
    if (!initialValues.hasOwnProperty('value')) {
      initialValues.value = (data && data.value) ?? "";
    }
    
    setFieldValues(initialValues);
    prevFieldValuesRef.current = initialValues;
  }, [data, config.fields]);

  const handleFieldChange = (fieldName, value) => {
    const oldValue = fieldValues[fieldName] || "";
    const newValues = { ...fieldValues, [fieldName]: value };
    
    setFieldValues(newValues);
    updateNodeField(id, fieldName, value);

    if (value && typeof value === 'string' && value.includes('{{')) {
      if (oldValue && oldValue.includes('{{')) {
        removeAutoConnections(id, fieldName, oldValue, value);
      }
      
      setTimeout(() => {
        autoConnectFromReferences(id, fieldName, value);
      }, 100);
    } else if (oldValue && oldValue.includes('{{')) {
      removeAutoConnections(id, fieldName, oldValue, value);
    }

    prevFieldValuesRef.current = newValues;

    if (config.onFieldChange) {
      config.onFieldChange(id, fieldName, value);
    }
    if (data && data.onChange) {
      data.onChange(id, fieldName, value);
    }
  };

  const togglePasswordVisibility = (fieldName) => {
    setShowPasswords(prev => ({
      ...prev,
      [fieldName]: !prev[fieldName]
    }));
  };

  const handleIdChange = (e) => {
    setNodeId(e.target.value);
    setIdError('');
  };

  const handleIdBlur = () => {
    const trimmedId = nodeId.trim();
    
    if (trimmedId === id) {
      setIsEditingId(false);
      return;
    }

    const validation = validateName(trimmedId, id);
    
    if (!validation.valid) {
      setIdError(validation.error);
      return;
    }

    renameNode(id, trimmedId);
    setIsEditingId(false);
    setIdError('');
  };

  const handleIdKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.target.blur();
    } else if (e.key === 'Escape') {
      setNodeId(id);
      setIdError('');
      setIsEditingId(false);
    }
  };

  const handleDeleteClick = () => {
    if (confirmDelete) {
      deleteNode(id);
    } else {
      setConfirmDelete(true);
    }
  };

  const renderChipsForField = (name) => {
    const txt = String(fieldValues[name] ?? "");
    const regex = /\{\{\s*([a-zA-Z_$][-a-zA-Z0-9_$.]+)\s*\}\}/g;
    const matches = [];
    let m;
    while ((m = regex.exec(txt)) !== null) {
      if (!matches.includes(m[1])) {
        matches.push(m[1]);
      }
    }

    if (!matches.length) return null;

    return (
      <div className="vs-token-row">
        {matches.map((variable) => {
          const parts = variable.split('.');
          if (parts.length !== 2) {
            return (
              <span 
                key={variable} 
                className="vs-token-chip"
                style={{
                  background: '#fee2e2',
                  color: '#dc2626',
                }}
              >
                {variable} <span className="vs-token-x">✗</span>
              </span>
            );
          }

          const sourceNodeId = parts[0];
          const fieldName = parts[1];
          
          const nodeExists = nodes.some(n => n.id === sourceNodeId);
          const isValidFormat = fieldName === 'value';
          const isValid = nodeExists && isValidFormat;
          
          return (
            <span 
              key={variable} 
              className="vs-token-chip"
              style={{
                background: isValid ? '#ede9ff' : '#fee2e2',
                color: isValid ? '#5b46d9' : '#dc2626',
              }}
              title={!nodeExists ? 'Node not found' : !isValidFormat ? 'Must use .value' : 'Valid reference'}
            >
              {variable} <span className="vs-token-x">{isValid ? '✓' : '✗'}</span>
            </span>
          );
        })}
      </div>
    );
  };

  const renderField = (field) => {
    const value = String(fieldValues[field.name] ?? "");

    switch (field.type) {
      case "text":
        return (
          <input
            className="vs-node-input"
            value={value}
            placeholder={field.placeholder}
            onChange={(e) => handleFieldChange(field.name, e.target.value)}
          />
        );

      case "password":
        return (
          <div style={{ position: 'relative' }}>
            <input
              type={showPasswords[field.name] ? "text" : "password"}
              className="vs-node-input"
              value={value}
              placeholder={field.placeholder}
              onChange={(e) => handleFieldChange(field.name, e.target.value)}
              style={{ paddingRight: '40px' }}
            />
            <button
              type="button"
              onClick={() => togglePasswordVisibility(field.name)}
              style={{
                position: 'absolute',
                right: '8px',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                fontSize: '16px',
                padding: '4px',
                color: '#6b7280'
              }}
              title={showPasswords[field.name] ? 'Hide' : 'Show'}
            >
              {showPasswords[field.name] ? '🙈' : '👁️'}
            </button>
          </div>
        );

      case "textarea":
        return (
          <textarea
            className="vs-node-textarea"
            rows={field.rows || 3}
            value={value}
            placeholder={field.placeholder}
            onChange={(e) => handleFieldChange(field.name, e.target.value)}
          />
        );

      case "select":
        return (
          <select
            className="vs-node-select"
            value={value}
            onChange={(e) => handleFieldChange(field.name, e.target.value)}
          >
            {field.options?.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        );

      case "number":
        return (
          <input
            type="number"
            className="vs-node-input"
            value={value}
            min={field.min}
            max={field.max}
            step={field.step}
            onChange={(e) => handleFieldChange(field.name, e.target.value)}
          />
        );

      default:
        return null;
    }
  };

  const getHandleStyle = (index, total) => {
    if (!total || total <= 1) return { top: "50%" };
    return { top: `${((index + 1) * 100) / (total + 1)}%` };
  };

  return (
    <div className={`vs-node-card ${selected ? "vs-node-selected" : ""}`}>
      {config.inputs?.map((input, idx) => (
        <Handle
          key={input.id}
          type="target"
          position={Position.Left}
          id={`${id}-${input.id}`}
          style={{
            ...getHandleStyle(idx, config.inputs.length),
            background: "#fff",
            width: 12,
            height: 12,
            borderRadius: "50%",
            border: "2px solid #6366f1",
          }}
        />
      ))}

      <div className="vs-node-header">
        <div className="vs-node-header-left">
          <div className="vs-node-icon">{config.icon}</div>
          <div className="vs-node-title">{config.title}</div>
        </div>

        <div className="vs-node-header-right">
          <div className="vs-header-controls">
            <IconButton title="Minimize">•</IconButton>
            <IconButton title="Settings">⚙️</IconButton>
            <div style={{ position: 'relative' }}>
              <button
                className="vs-icon-btn"
                onClick={handleDeleteClick}
                style={{
                  background: confirmDelete ? '#ef4444' : 'transparent',
                  color: confirmDelete ? '#fff' : '#475569',
                  transition: 'all 0.2s',
                  position: 'relative',
                }}
                onMouseEnter={(e) => {
                  if (!confirmDelete) {
                    e.currentTarget.style.background = 'rgba(99, 102, 241, 0.08)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!confirmDelete) {
                    e.currentTarget.style.background = 'transparent';
                  }
                }}
              >
                ✕
              </button>
              {confirmDelete && (
                <div
                  style={{
                    position: 'absolute',
                    top: '100%',
                    right: 0,
                    marginTop: 4,
                    background: '#ef4444',
                    color: '#fff',
                    padding: '4px 8px',
                    borderRadius: 4,
                    fontSize: 11,
                    fontWeight: 500,
                    whiteSpace: 'nowrap',
                    boxShadow: '0 2px 8px rgba(239, 68, 68, 0.3)',
                    zIndex: 1000,
                    pointerEvents: 'none',
                  }}
                >
                  Confirm?
                  <div
                    style={{
                      position: 'absolute',
                      top: -3,
                      right: 8,
                      width: 0,
                      height: 0,
                      borderLeft: '4px solid transparent',
                      borderRight: '4px solid transparent',
                      borderBottom: '4px solid #ef4444',
                    }}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div style={{ marginBottom: 12 }}>
        <input
          type="text"
          value={nodeId}
          onChange={handleIdChange}
          onFocus={() => setIsEditingId(true)}
          onBlur={handleIdBlur}
          onKeyDown={handleIdKeyDown}
          style={{
            width: '100%',
            padding: '8px 10px',
            border: idError ? '2px solid #ef4444' : '2px solid #e5e7eb',
            borderRadius: 6,
            fontSize: 13,
            fontWeight: 500,
            color: '#111827',
            outline: 'none',
            transition: 'border-color 0.2s',
            boxSizing: 'border-box',
          }}
          onFocusCapture={(e) => {
            if (!idError) {
              e.target.style.borderColor = '#6366f1';
            }
          }}
          onBlurCapture={(e) => {
            if (!idError) {
              e.target.style.borderColor = '#e5e7eb';
            }
          }}
        />
        {idError && (
          <div style={{ 
            marginTop: 4, 
            fontSize: 11, 
            color: '#ef4444',
            display: 'flex',
            alignItems: 'center',
            gap: 4,
          }}>
            <span>⚠️</span>
            <span>{idError}</span>
          </div>
        )}
      </div>

      {config.description && (
        <div className="vs-node-description">
          {config.description}
        </div>
      )}

      {config.suggestion && (
        <div className="vs-node-suggestion">
          <span className="vs-suggestion-icon">💡</span>
          <div>
            <strong>Suggestion:</strong> {config.suggestion}
          </div>
        </div>
      )}

      <div className="vs-node-body">
        {config.fields?.map((field) => (
          <div key={field.name} className="vs-field-row">
            <div className="vs-field-header">
              <div className="vs-field-label">{field.label}</div>
              <div className="vs-field-meta">
                {field.type === "textarea"
                  ? "Text"
                  : field.type === "select"
                  ? "Dropdown"
                  : field.type === "password"
                  ? "Password"
                  : ""}
              </div>
            </div>

            {renderChipsForField(field.name)}
            {renderField(field)}
          </div>
        ))}
      </div>

      {config.outputs?.map((output, idx) => (
        <Handle
          key={output.id}
          type="source"
          position={Position.Right}
          id={`${id}-${output.id}`}
          style={{
            ...getHandleStyle(idx, config.outputs.length),
            background: "#fff",
            width: 12,
            height: 12,
            borderRadius: "50%",
            border: "2px solid #6366f1",
          }}
        />
      ))}
    </div>
  );
};

export default BaseNode;