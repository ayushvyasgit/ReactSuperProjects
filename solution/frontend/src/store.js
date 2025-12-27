// store.js
import { create } from "zustand";
import {
    addEdge,
    applyNodeChanges,
    applyEdgeChanges,
    MarkerType,
  } from 'reactflow';

export const useStore = create((set, get) => ({
    nodes: [],
    edges: [],
    nodeIDs: {},
    
    // Generate unique default name based on type
    getNodeID: (type) => {
        const newIDs = {...get().nodeIDs};
        if (newIDs[type] === undefined) {
            newIDs[type] = 0;
        }
        newIDs[type] += 1;
        set({nodeIDs: newIDs});
        
        // Generate name like: Input_1, Text_2, OpenAI_3
        const typeNames = {
          customInput: 'Input',
          customOutput: 'Output',
          llm: 'OpenAI',
          text: 'Text',
          database: 'Database',
          api: 'API'
        };
        
        const baseName = typeNames[type] || type;
        return `${baseName}_${newIDs[type]}`;
    },
    
    // Check if name already exists (excluding current node)
    checkNameExists: (name, excludeNodeId) => {
      return get().nodes.some(n => 
        n.id !== excludeNodeId && 
        n.id.toLowerCase() === name.toLowerCase()
      );
    },
    
    // Validate node name
    validateName: (name, currentNodeId) => {
      // Must not be empty
      if (!name || name.trim() === '') {
        return { valid: false, error: 'Name is required' };
      }
      
      // Must start with letter
      if (!/^[a-zA-Z]/.test(name)) {
        return { valid: false, error: 'Must start with a letter' };
      }
      
      // Only letters, numbers, underscore
      if (!/^[a-zA-Z_][a-zA-Z0-9_]*$/.test(name)) {
        return { valid: false, error: 'Only letters, numbers, underscore' };
      }
      
      // Check if already exists (excluding current node)
      if (get().checkNameExists(name, currentNodeId)) {
        return { valid: false, error: 'Name already exists' };
      }
      
      return { valid: true };
    },
    
    // Rename node - updates ID and all references
    renameNode: (oldId, newId) => {
      console.log(`Renaming node: ${oldId} → ${newId}`);
      
      // Update node ID
      set({
        nodes: get().nodes.map((node) => {
          if (node.id === oldId) {
            return { ...node, id: newId, data: { ...node.data, id: newId } };
          }
          return node;
        }),
        // Update all edges that reference this node
        edges: get().edges.map((edge) => {
          const newEdge = { ...edge };
          
          if (edge.source === oldId) {
            newEdge.source = newId;
            // Update source handle
            if (edge.sourceHandle?.startsWith(oldId)) {
              newEdge.sourceHandle = edge.sourceHandle.replace(oldId, newId);
            }
          }
          
          if (edge.target === oldId) {
            newEdge.target = newId;
            // Update target handle
            if (edge.targetHandle?.startsWith(oldId)) {
              newEdge.targetHandle = edge.targetHandle.replace(oldId, newId);
            }
          }
          
          return newEdge;
        }),
      });
    },
    
    addNode: (node) => {
        set({
            nodes: [...get().nodes, node]
        });
    },
    
    onNodesChange: (changes) => {
      set({
        nodes: applyNodeChanges(changes, get().nodes),
      });
    },
    
    onEdgesChange: (changes) => {
      set({
        edges: applyEdgeChanges(changes, get().edges),
      });
    },
    
    onConnect: (connection) => {
      set({
        edges: addEdge({
          ...connection, 
          type: 'custom',
          animated: true, 
          markerEnd: {
            type: MarkerType.Arrow, 
            height: '20px', 
            width: '20px'
          }
        }, get().edges),
      });
    },
    
    deleteNode: (nodeId) => {
      console.log('Deleting node:', nodeId);
      set({
        nodes: get().nodes.filter((n) => n.id !== nodeId),
        edges: get().edges.filter(
          (e) => e.source !== nodeId && e.target !== nodeId
        ),
      });
    },
    
    deleteEdge: (edgeId) => {
      console.log('Store: Deleting edge:', edgeId);
      const newEdges = get().edges.filter((e) => e.id !== edgeId);
      set({ edges: newEdges });
    },
    
    addEdgeProgrammatically: (edgeConfig) => {
      const { source, target, sourceHandle, targetHandle } = edgeConfig;
      
      const exists = get().edges.some(
        e => e.source === source && 
            e.target === target && 
            e.sourceHandle === sourceHandle && 
            e.targetHandle === targetHandle
      );
      
      if (!exists) {
        const newEdge = {
          id: `edge-${source}-${sourceHandle || 'default'}-${target}-${targetHandle || 'default'}-${Date.now()}`,
          source,
          target,
          sourceHandle,
          targetHandle,
          type: 'custom',
          animated: true,
          style: { 
            stroke: '#8B5CF6', 
            strokeWidth: 2,
            strokeDasharray: '5, 5'
          },
          markerEnd: {
            type: MarkerType.Arrow,
            height: '20px',
            width: '20px',
            color: '#8B5CF6'
          }
        };
        
        console.log('Creating auto-edge:', newEdge);
        set({ edges: [...get().edges, newEdge] });
      }
    },
    
    updateNodeField: (nodeId, fieldName, fieldValue) => {
      set({
        nodes: get().nodes.map((node) => {
          if (node.id === nodeId) {
            node.data = { ...node.data, [fieldName]: fieldValue };
          }
          return node;
        }),
      });
    },
}));