// src/nodes/BaseNode.js
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
  const deletedEdgesRef = useRef(new Set()); // Track manually deleted edges
  
  const deleteNode = useStore((state) => state.deleteNode);
  const updateNodeField = useStore((state) => state.updateNodeField);
  const addEdgeProgrammatically = useStore((state) => state.addEdgeProgrammatically);
  const deleteEdge = useStore((state) => state.deleteEdge);
  const validateName = useStore((state) => state.validateName);
  const renameNode = useStore((state) => state.renameNode);
  const nodes = useStore((state) => state.nodes);
  const edges = useStore((state) => state.edges);

  // Reset delete confirmation after 3 seconds
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
    setFieldValues(initialValues);
  }, [data, config.fields]);

  // Auto-connect logic - only for new variables
  useEffect(() => {
    const allVariables = new Set();

    config.fields?.forEach((field) => {
      if (field.type === "textarea") {
        const txt = String(fieldValues[field.name] ?? "");
        const regex = /\{\{\s*([a-zA-Z_$][-a-zA-Z0-9_$.]*)\s*\}\}/g;
        let m;
        while ((m = regex.exec(txt)) !== null) {
          allVariables.add(m[1]);
        }
      }
    });

    allVariables.forEach(variable => {
      let sourceNodeId, sourceHandleId;
      
      if (variable.includes('.')) {
        const parts = variable.split('.');
        sourceNodeId = parts[0];
        sourceHandleId = `${sourceNodeId}-${parts[1]}`;
      } else {
        sourceNodeId = variable;
        sourceHandleId = `${sourceNodeId}-value`;
      }
      
      const sourceNode = nodes.find(n => n.id === sourceNodeId);
      
      if (sourceNode) {
        const inputHandles = config.inputs || [];
        let targetHandleId;
        
        if (inputHandles.length === 0) {
          return;
        } else if (inputHandles.length === 1) {
          targetHandleId = `${id}-${inputHandles[0].id}`;
        } else {
          const middleIndex = Math.floor(inputHandles.length / 2);
          targetHandleId = `${id}-${inputHandles[middleIndex].id}`;
        }
        
        // Create unique key for this connection
        const connectionKey = `${sourceNodeId}-${sourceHandleId}-${id}-${targetHandleId}`;
        
        // Skip if this connection was manually deleted
        if (deletedEdgesRef.current.has(connectionKey)) {
          console.log(`[${id}] Skipping auto-connect - edge was manually deleted:`, connectionKey);
          return;
        }
        
        // Check if connection already exists
        const edgeExists = edges.some(
          e => e.source === sourceNodeId && 
               e.target === id && 
               e.sourceHandle === sourceHandleId &&
               e.targetHandle === targetHandleId
        );
        
        if (!edgeExists) {
          console.log(`[${id}] Creating auto-connection: ${sourceNodeId} → ${id}`);
          addEdgeProgrammatically({
            source: sourceNodeId,
            target: id,
            sourceHandle: sourceHandleId,
            targetHandle: targetHandleId,
          });
        }
      }
    });

    // Clean up auto-created edges for removed variables
    const myEdges = edges.filter(e => e.target === id);
    myEdges.forEach(edge => {
      const isAutoEdge = edge.style?.strokeDasharray === '5, 5';
      
      if (isAutoEdge) {
        const sourceVariable = edge.sourceHandle?.replace(`${edge.source}-`, '');
        const fullVariable = sourceVariable ? `${edge.source}.${sourceVariable}` : edge.source;
        
        if (!allVariables.has(fullVariable) && !allVariables.has(edge.source)) {
          console.log(`[${id}] Removing edge for deleted variable`);
          deleteEdge(edge.id);
        }
      }
    });
  }, [fieldValues, nodes, edges, id, config.fields, config.inputs, addEdgeProgrammatically, deleteEdge]);

  // Track when edges are manually deleted
  useEffect(() => {
    // Get current edge connections
    const currentConnections = new Set(
      edges
        .filter(e => e.target === id)
        .map(e => `${e.source}-${e.sourceHandle}-${e.target}-${e.targetHandle}`)
    );

    // Check if any expected connections are missing (were deleted)
    const allVariables = new Set();
    config.fields?.forEach((field) => {
      if (field.type === "textarea") {
        const txt = String(fieldValues[field.name] ?? "");
        const regex = /\{\{\s*([a-zA-Z_$][-a-zA-Z0-9_$.]*)\s*\}\}/g;
        let m;
        while ((m = regex.exec(txt)) !== null) {
          allVariables.add(m[1]);
        }
      }
    });

    allVariables.forEach(variable => {
      let sourceNodeId, sourceHandleId;
      
      if (variable.includes('.')) {
        const parts = variable.split('.');
        sourceNodeId = parts[0];
        sourceHandleId = `${sourceNodeId}-${parts[1]}`;
      } else {
        sourceNodeId = variable;
        sourceHandleId = `${sourceNodeId}-value`;
      }

      const inputHandles = config.inputs || [];
      let targetHandleId;
      
      if (inputHandles.length === 1) {
        targetHandleId = `${id}-${inputHandles[0].id}`;
      } else if (inputHandles.length > 1) {
        const middleIndex = Math.floor(inputHandles.length / 2);
        targetHandleId = `${id}-${inputHandles[middleIndex].id}`;
      }

      if (targetHandleId) {
        const connectionKey = `${sourceNodeId}-${sourceHandleId}-${id}-${targetHandleId}`;
        
        // If variable exists but connection doesn't, mark as manually deleted
        if (!currentConnections.has(connectionKey)) {
          deletedEdgesRef.current.add(connectionKey);
          console.log(`[${id}] Marking connection as manually deleted:`, connectionKey);
        }
      }
    });
  }, [edges, fieldValues, id, config.fields, config.inputs]);

  // Clear deleted edges tracking when variable is removed from text
  useEffect(() => {
    const allVariables = new Set();
    config.fields?.forEach((field) => {
      if (field.type === "textarea") {
        const txt = String(fieldValues[field.name] ?? "");
        const regex = /\{\{\s*([a-zA-Z_$][-a-zA-Z0-9_$.]*)\s*\}\}/g;
        let m;
        while ((m = regex.exec(txt)) !== null) {
          allVariables.add(m[1]);
        }
      }
    });

    // Remove tracking for variables that no longer exist
    const keysToRemove = [];
    deletedEdgesRef.current.forEach(key => {
      const [sourceNodeId] = key.split('-');
      const hasVariable = Array.from(allVariables).some(v => 
        v === sourceNodeId || v.startsWith(sourceNodeId + '.')
      );
      if (!hasVariable) {
        keysToRemove.push(key);
      }
    });

    keysToRemove.forEach(key => {
      deletedEdgesRef.current.delete(key);
      console.log(`[${id}] Cleared manual deletion tracking:`, key);
    });
  }, [fieldValues, id, config.fields]);

  const handleFieldChange = (fieldName, value) => {
    const newValues = { ...fieldValues, [fieldName]: value };
    setFieldValues(newValues);
    updateNodeField(id, fieldName, value);

    if (config.onFieldChange) {
      config.onFieldChange(id, fieldName, value);
    }
    if (data && data.onChange) {
      data.onChange(id, fieldName, value);
    }
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
    const regex = /\{\{\s*([a-zA-Z_$][-a-zA-Z0-9_$.]*)\s*\}\}/g;
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
          const sourceNodeId = variable.includes('.') ? variable.split('.')[0] : variable;
          const isValid = nodes.some(n => n.id === sourceNodeId);
          
          return (
            <span 
              key={variable} 
              className="vs-token-chip"
              style={{
                background: isValid ? '#ede9ff' : '#fee2e2',
                color: isValid ? '#5b46d9' : '#dc2626',
              }}
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
          <div className="vs-select-wrapper">
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
            <span className="vs-select-tag">Dropdown</span>
          </div>
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