// src/nodes/BaseNode.js
import React, { useState, useEffect } from "react";
import { Handle, Position } from "reactflow";
import "./nodeStyles.css";
import { useStore } from "../store";

/* Small icon button used in header */
const IconButton = ({ title, onClick, children }) => (
  <button className="vs-icon-btn" title={title} onClick={onClick}>
    {children}
  </button>
);

export const BaseNode = ({ id, data, config, selected }) => {
  const [fieldValues, setFieldValues] = useState({});
  const deleteNode = useStore((state) => state.deleteNode);

  /* initialize field values */
  useEffect(() => {
    const initialValues = {};
    config.fields?.forEach((field) => {
      initialValues[field.name] =
        (data && data[field.name]) ?? field.defaultValue ?? "";
    });
    setFieldValues(initialValues);
  }, [data, config.fields]);

  /* update local + global state */
  const handleFieldChange = (fieldName, value) => {
    const newValues = { ...fieldValues, [fieldName]: value };
    setFieldValues(newValues);

    if (config.onFieldChange) {
      config.onFieldChange(id, fieldName, value);
    }
    if (data && data.onChange) {
      data.onChange(id, fieldName, value);
    }
  };

  /* ---------- SAFE TOKEN EXTRACTION (NO matchAll) ---------- */
  const renderChipsForField = (name) => {
    const txt = String(fieldValues[name] ?? "");
    const regex = /\{\{\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\}\}/g;

    const matches = [];
    let match;
    while ((match = regex.exec(txt)) !== null) {
      matches.push(match[1]);
    }

    if (!matches.length) return null;

    return (
      <div className="vs-token-row">
        {matches.map((m) => (
          <span key={m} className="vs-token-chip">
            {m}.text <span className="vs-token-x">×</span>
          </span>
        ))}
      </div>
    );
  };

  /* render input controls */
  const renderField = (field) => {
    const value = String(fieldValues[field.name] ?? "");

    switch (field.type) {
      case "text":
        return (
          <input
            className="vs-node-input"
            value={value}
            placeholder={field.placeholder}
            onChange={(e) =>
              handleFieldChange(field.name, e.target.value)
            }
          />
        );

      case "textarea":
        return (
          <textarea
            className="vs-node-textarea"
            rows={field.rows || 3}
            value={value}
            placeholder={field.placeholder}
            onChange={(e) =>
              handleFieldChange(field.name, e.target.value)
            }
          />
        );

      case "select":
        return (
          <div className="vs-select-wrapper">
            <select
              className="vs-node-select"
              value={value}
              onChange={(e) =>
                handleFieldChange(field.name, e.target.value)
              }
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
            onChange={(e) =>
              handleFieldChange(field.name, e.target.value)
            }
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
    <div
      className={`vs-node-card ${selected ? "vs-node-selected" : ""}`}
    >
      {/* INPUT HANDLES */}
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

      {/* HEADER */}
      <div className="vs-node-header">
        <div className="vs-node-header-left">
          <div className="vs-node-icon">{config.icon}</div>
          <div className="vs-node-title">{config.title}</div>
        </div>

        <div className="vs-node-header-right">
          <div className="vs-node-id-pill">{id}</div>
          <div className="vs-header-controls">
            <IconButton title="Minimize">⤢</IconButton>
            <IconButton title="Settings">⚙️</IconButton>
            <IconButton
              title="Delete"
              onClick={() => {
                if (window.confirm("Delete this node?")) {
                  deleteNode(id);
                }
              }}
            >
              ✕
            </IconButton>
          </div>
        </div>
      </div>

      {/* BODY */}
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

      {/* OUTPUT HANDLES */}
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
