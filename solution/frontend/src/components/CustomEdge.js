// src/components/CustomEdge.js
import React from 'react';
import { getSmoothStepPath, EdgeLabelRenderer, BaseEdge } from 'reactflow';
import { useStore } from '../store';

export const CustomEdge = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  markerEnd,
  selected,
}) => {
  const deleteEdge = useStore((state) => state.deleteEdge);

  const [edgePath, labelX, labelY] = getSmoothStepPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  const handleDelete = (event) => {
    event.stopPropagation();
    console.log('Deleting edge:', id);
    deleteEdge(id);
  };

  // Get the edge color from style or use default
  const edgeColor = style.stroke || '#667eea';

  return (
    <>
      {/* Main edge path */}
      <BaseEdge
        id={id}
        path={edgePath}
        markerEnd={markerEnd}
        style={{
          ...style,
          strokeWidth: selected ? 3 : (style.strokeWidth || 2),
        }}
      />

      {/* Fixed delete button - ALWAYS visible */}
      <EdgeLabelRenderer>
        <div
          style={{
            position: 'absolute',
            transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
            pointerEvents: 'all',
          }}
          className="nodrag nopan"
        >
          <button
            onClick={handleDelete}
            style={{
              width: 18,
              height: 18,
              background: '#ffffff',
              border: `2px solid ${edgeColor}`,
              borderRadius: '50%',
              color: edgeColor,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 12,
              fontWeight: 'bold',
              padding: 0,
              lineHeight: '1',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = edgeColor;
              e.currentTarget.style.color = '#ffffff';
              e.currentTarget.style.transform = 'scale(1.2)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#ffffff';
              e.currentTarget.style.color = edgeColor;
              e.currentTarget.style.transform = 'scale(1)';
            }}
            title="Delete connection"
          >
            ×
          </button>
        </div>
      </EdgeLabelRenderer>
    </>
  );
};

export default CustomEdge;