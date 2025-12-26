// ui.js - Enhanced Pipeline UI with all node types
import { useState, useRef, useCallback, useEffect } from 'react';
import ReactFlow, { Controls, Background, MiniMap } from 'reactflow';
import { useStore } from './store';
import { shallow } from 'zustand/shallow';
import { generateNodeTypes } from './nodes/nodeFactory';

import 'reactflow/dist/style.css';

const gridSize = 20;
const proOptions = { hideAttribution: true };

// Generate all node types using the factory
const nodeTypes = generateNodeTypes();

const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
  getNodeID: state.getNodeID,
  addNode: state.addNode,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
});

export const PipelineUI = () => {
  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const {
    nodes,
    edges,
    getNodeID,
    addNode,
    onNodesChange,
    onEdgesChange,
    onConnect
  } = useStore(selector, shallow);

  const getInitNodeData = (nodeID, type) => {
    return { id: nodeID, nodeType: `${type}` };
  };
  useEffect(() => {
    if (reactFlowInstance && nodes.length === 0) {
      reactFlowInstance.setViewport(
        { x: 0, y: 0, zoom: 1 },
        { duration: 0 }
      );
    }
  }, [reactFlowInstance, nodes.length]);
  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      if (event?.dataTransfer?.getData('application/reactflow')) {
        const appData = JSON.parse(event.dataTransfer.getData('application/reactflow'));
        const type = appData?.nodeType;
  
        if (typeof type === 'undefined' || !type) {
          return;
        }
  
        const position = reactFlowInstance.project({
          x: event.clientX - reactFlowBounds.left,
          y: event.clientY - reactFlowBounds.top,
        });

        const nodeID = getNodeID(type);
        const newNode = {
          id: nodeID,
          type,
          position,
          data: getInitNodeData(nodeID, type),
        };
  
        addNode(newNode);
      }
    },
    [reactFlowInstance, getNodeID, addNode]
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  return (
    <div style={{ 
      width: '100%', 
      height: 'calc(100vh - 240px)',
      background: 'linear-gradient(to bottom, #f8f9fa, #ffffff)',
      position: 'relative'
    }}>
      <div ref={reactFlowWrapper} style={{ width: '100%', height: '100%' }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onDrop={onDrop}
          onDragOver={onDragOver}
          onInit={setReactFlowInstance}
          nodeTypes={nodeTypes}
          proOptions={proOptions}
          snapGrid={[gridSize, gridSize]}
          connectionLineType='smoothstep'
          defaultEdgeOptions={{
            animated: true,
            style: { stroke: '#667eea', strokeWidth: 2 }
          }}
          attributionPosition="bottom-left"
        >
          <Background 
            color="#cbd5e0" 
            gap={gridSize}
            style={{ background: '#f8f9fa' }}
          />
          <Controls 
            style={{
              button: {
                background: 'white',
                borderColor: '#e2e8f0',
                color: '#4a5568'
              }
            }}
          />
          <MiniMap 
            nodeColor={(node) => {
              // Color nodes in minimap based on type
              const colors = {
                customInput: '#667eea',
                customOutput: '#f093fb',
                llm: '#4facfe',
                text: '#43e97b',
                transform: '#fa709a',
                condition: '#a8edea',
                database: '#ffecd2',
                api: '#ff9a9e',
                aggregator: '#30cfd0'
              };
              return colors[node.type] || '#667eea';
            }}
            maskColor="rgba(0, 0, 0, 0.1)"
            style={{
              background: 'white',
              border: '2px solid #e2e8f0',
              borderRadius: '8px'
            }}
          />
        </ReactFlow>
      </div>
      
      {/* Empty state */}
      {nodes.length === 0 && (
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          textAlign: 'center',
          pointerEvents: 'none',
          color: '#a0aec0'
        }}>
          <div style={{ fontSize: '64px', marginBottom: '16px' }}>🎨</div>
          <h3 style={{ margin: '0 0 8px 0', fontSize: '20px', fontWeight: '600' }}>
            Start Building Your Pipeline
          </h3>
          <p style={{ margin: 0, fontSize: '14px' }}>
            Drag and drop nodes from above to get started
          </p>
        </div>
      )}
    </div>
  );
};

export default PipelineUI;