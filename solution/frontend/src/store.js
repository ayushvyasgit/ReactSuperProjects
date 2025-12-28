// store.js - Enhanced with auto-connection functionality
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
    
    checkNameExists: (name, excludeNodeId) => {
      return get().nodes.some(n => 
        n.id !== excludeNodeId && 
        n.id.toLowerCase() === name.toLowerCase()
      );
    },
    
    validateName: (name, currentNodeId) => {
      if (!name || name.trim() === '') {
        return { valid: false, error: 'Name is required' };
      }
      
      if (!/^[a-zA-Z]/.test(name)) {
        return { valid: false, error: 'Must start with a letter' };
      }
      
      if (!/^[a-zA-Z_][a-zA-Z0-9_]*$/.test(name)) {
        return { valid: false, error: 'Only letters, numbers, underscore' };
      }
      
      if (get().checkNameExists(name, currentNodeId)) {
        return { valid: false, error: 'Name already exists' };
      }
      
      return { valid: true };
    },
    
    renameNode: (oldId, newId) => {
      console.log(`Renaming node: ${oldId} → ${newId}`);
      
      set({
        nodes: get().nodes.map((node) => {
          if (node.id === oldId) {
            return { ...node, id: newId, data: { ...node.data, id: newId } };
          }
          return node;
        }),
        edges: get().edges.map((edge) => {
          const newEdge = { ...edge };
          
          if (edge.source === oldId) {
            newEdge.source = newId;
            if (edge.sourceHandle?.startsWith(oldId)) {
              newEdge.sourceHandle = edge.sourceHandle.replace(oldId, newId);
            }
          }
          
          if (edge.target === oldId) {
            newEdge.target = newId;
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

    // 🆕 NEW: Auto-create connections based on variable references
    autoConnectFromReferences: (targetNodeId, fieldName, fieldValue) => {
      console.log(`🔗 Auto-connect check for ${targetNodeId}.${fieldName}`);
      
      // Extract all {{NodeID.value}} references from the field value
      const regex = /\{\{\s*([a-zA-Z_$][-a-zA-Z0-9_$.]+)\s*\}\}/g;
      const matches = [];
      let m;
      while ((m = regex.exec(fieldValue)) !== null) {
        matches.push(m[1]);
      }

      if (matches.length === 0) {
        console.log('No variable references found');
        return;
      }

      console.log('Found references:', matches);

      const nodes = get().nodes;
      const edges = get().edges;
      const targetNode = nodes.find(n => n.id === targetNodeId);
      
      if (!targetNode) {
        console.log('Target node not found:', targetNodeId);
        return;
      }

      matches.forEach(variable => {
        // Parse variable: Must be "NodeID.value" format
        const parts = variable.split('.');
        
        if (parts.length !== 2) {
          console.log(`❌ Invalid format: ${variable} - must be NodeID.value`);
          return;
        }

        const sourceNodeId = parts[0];
        const sourceField = parts[1];

        // Must be .value field
        if (sourceField !== 'value') {
          console.log(`❌ Invalid field: ${variable} - must use .value (not .${sourceField})`);
          return;
        }

        console.log(`Attempting to connect: ${sourceNodeId}.value → ${targetNodeId}.${fieldName}`);

        // Check if source node exists
        const sourceNode = nodes.find(n => n.id === sourceNodeId);
        if (!sourceNode) {
          console.log(`❌ Source node not found: ${sourceNodeId}`);
          return;
        }

        // Determine handles
        const sourceHandle = `${sourceNodeId}-value`;
        const targetHandle = `${targetNodeId}-${fieldName}`;

        // Check if edge already exists
        const edgeExists = edges.some(e => 
          e.source === sourceNodeId && 
          e.target === targetNodeId && 
          e.sourceHandle === sourceHandle && 
          e.targetHandle === targetHandle
        );

        if (edgeExists) {
          console.log(`⚠️ Edge already exists: ${sourceHandle} → ${targetHandle}`);
          return;
        }

        // Create the connection
        console.log(`✅ Creating edge: ${sourceHandle} → ${targetHandle}`);
        
        const newConnection = {
          source: sourceNodeId,
          target: targetNodeId,
          sourceHandle: sourceHandle,
          targetHandle: targetHandle,
        };

        // Use the existing onConnect logic
        get().onConnect(newConnection);
      });
    },

    // 🆕 NEW: Remove auto-created edges when variables are deleted
    removeAutoConnections: (targetNodeId, fieldName, oldValue, newValue) => {
      console.log(`🔍 Checking for connections to remove from ${targetNodeId}.${fieldName}`);
      
      // Extract variables from old and new values
      const regex = /\{\{\s*([a-zA-Z_$][-a-zA-Z0-9_$.]+)\s*\}\}/g;
      
      const oldMatches = [];
      let m;
      while ((m = regex.exec(oldValue)) !== null) {
        oldMatches.push(m[1]);
      }
      
      const newMatches = [];
      while ((m = regex.exec(newValue)) !== null) {
        newMatches.push(m[1]);
      }

      // Find variables that were removed
      const removedVars = oldMatches.filter(v => !newMatches.includes(v));
      
      if (removedVars.length === 0) {
        return;
      }

      console.log('Variables removed:', removedVars);

      const edges = get().edges;
      const edgesToRemove = [];

      removedVars.forEach(variable => {
        const parts = variable.split('.');
        if (parts.length !== 2) return;
        
        const sourceNodeId = parts[0];
        const sourceField = parts[1];

        if (sourceField !== 'value') return;

        const sourceHandle = `${sourceNodeId}-value`;
        const targetHandle = `${targetNodeId}-${fieldName}`;

        // Find matching edges
        const matchingEdges = edges.filter(e => 
          e.source === sourceNodeId && 
          e.target === targetNodeId && 
          e.sourceHandle === sourceHandle && 
          e.targetHandle === targetHandle
        );

        edgesToRemove.push(...matchingEdges);
      });

      // Remove the edges
      if (edgesToRemove.length > 0) {
        console.log(`🗑️ Removing ${edgesToRemove.length} auto-created edges`);
        set({
          edges: edges.filter(e => !edgesToRemove.some(re => re.id === e.id))
        });
      }
    },
}));