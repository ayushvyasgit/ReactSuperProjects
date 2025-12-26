// src/nodes/TextNode.js
import React, { useState, useEffect, useRef } from "react";
import { Handle, Position } from "reactflow";

/**
 * Improved TextNode
 * - Safe variable extraction (no matchAll crash)
 * - Clamped size to avoid overflow outside the card
 * - Flex layout so textarea fits nicely and scrolls when needed
 * - Calls data.onChange when text updates
 */

export const TextNode = ({ id, data = {}, selected }) => {
  const initial = typeof data.text === "string" ? data.text : "{{input}}";
  const [currText, setCurrText] = useState(String(initial));
  const [variables, setVariables] = useState([]);
  const containerRef = useRef(null);
  const textareaRef = useRef(null);

  // Safe variable extraction (works for non-strings too)
  useEffect(() => {
    const txt = String(currText ?? "");
    const regex = /\{\{\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\}\}/g;
    const found = [];
    let m;
    while ((m = regex.exec(txt)) !== null) {
      found.push(m[1]);
    }
    setVariables([...new Set(found)]);
  }, [currText]);

  // Conservative dynamic sizing: clamp so node never explodes
  useEffect(() => {
    // derive lines & longest line length
    const txt = String(currText ?? "");
    const lines = txt.split("\n").length || 1;
    const longestLine = Math.max(...txt.split("\n").map((l) => l.length), 10);

    // width: proportional to longest line but clamped
    const calcWidth = Math.min(Math.max(220, longestLine * 7 + 40), 360);
    // height: proportional to lines but clamped
    const calcHeight = Math.min(Math.max(110, lines * 20 + 70), 300);

    // apply as inline styles by writing to dataset for CSS-less usage
    if (containerRef.current) {
      containerRef.current.style.width = `${calcWidth}px`;
      containerRef.current.style.minHeight = `${calcHeight}px`;
    }
  }, [currText]);

  const onChange = (e) => {
    const v = e.target.value;
    setCurrText(v);
    if (data && typeof data.onChange === "function") {
      try {
        data.onChange(id, "text", v);
      } catch (err) {
        // don't break UI if consumer callback throws
        // console.warn("data.onChange error", err);
      }
    }
  };

  const getHandleStyle = (index, total) => {
    if (!total || total <= 1) return { top: "50%" };
    // position handles evenly down the left side
    return { top: `${((index + 1) * 100) / (total + 1)}%` };
  };

  return (
    <div
      ref={containerRef}
      style={{
        // width/minHeight are set dynamically by effect above
        minWidth: 220,
        minHeight: 110,
        background: "#ffffff",
        border: selected ? "1px solid #6366f1" : "1px solid #e6e9ef",
        borderRadius: 10,
        padding: 10,
        boxShadow: selected
          ? "0 6px 18px rgba(99,102,241,0.08)"
          : "0 1px 2px rgba(15,23,42,0.04)",
        color: "#0f172a",
        display: "flex",
        flexDirection: "column",
        boxSizing: "border-box",
        overflow: "hidden", // prevents child from escaping
      }}
    >
      {/* variable handles (left) */}
      {variables.map((v, idx) => (
        <Handle
          key={`var-${v}`}
          type="target"
          position={Position.Left}
          id={`${id}-${v}`}
          style={{
            ...getHandleStyle(idx, variables.length),
            background: "#94a3b8",
            width: 10,
            height: 10,
            borderRadius: 4,
            border: "1px solid #fff",
            boxShadow: "none",
          }}
          title={v}
        />
      ))}

      {/* header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 8,
          flexShrink: 0,
        }}
      >
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <span style={{ fontSize: 16 }}>📝</span>
          <strong style={{ fontSize: 13 }}>Text</strong>
        </div>

        <div style={{ fontSize: 12, color: "#6b7280", display: "flex", gap: 8 }}>
          <span style={{ cursor: "pointer" }} title="Settings">
            ⚙️
          </span>
          <span style={{ cursor: "pointer" }} title="Close">
            ✕
          </span>
        </div>
      </div>

      {/* hint */}
      <div style={{ fontSize: 12, color: "#6b7280", marginBottom: 8, flexShrink: 0 }}>
        Use <code style={{ fontSize: 11, color: "#374151" }}>{"{{variable}}"}</code> for dynamic inputs
      </div>

      {/* textarea - flex:1 so it fills remaining space but stays contained */}
      <textarea
        ref={textareaRef}
        value={currText}
        onChange={onChange}
        placeholder="Enter text (use {{variable}} for inputs)"
        style={{
          width: "100%",
          // let textarea take remaining space but with safe min/max
          flex: 1,
          minHeight: 40,
          maxHeight: 220,
          padding: 8,
          borderRadius: 6,
          border: "1px solid #e6e9ef",
          background: "#f8fafc",
          color: "#0f172a",
          fontSize: 13,
          fontFamily:
            'ui-monospace, SFMono-Regular, Menlo, Monaco, "Roboto Mono", "Courier New", monospace',
          resize: "vertical",
          boxSizing: "border-box",
          overflow: "auto",
        }}
      />

      {/* output handle (right) */}
      <Handle
        type="source"
        position={Position.Right}
        id={`${id}-output`}
        style={{
          top: "50%",
          background: "#60a5fa",
          width: 10,
          height: 10,
          borderRadius: 4,
          border: "1px solid #fff",
          boxShadow: "none",
        }}
        title="Output"
      />
    </div>
  );
};

export default TextNode;
