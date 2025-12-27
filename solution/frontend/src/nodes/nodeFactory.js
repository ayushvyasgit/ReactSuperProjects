// nodes/nodeFactory.js
import BaseNode from './BaseNode';
import { nodeConfigs } from './nodeConfigs';

export const createNode = (type) => {
  const config = nodeConfigs[type];
  
  if (!config) {
    console.warn(`Node type "${type}" not found in configurations`);
    return null;
  }

  // All nodes use BaseNode - no special cases!
  return ({ id, data, selected }) => (
    <BaseNode 
      id={id} 
      data={data} 
      config={config}
      selected={selected}
    />
  );
};

export const generateNodeTypes = () => {
  const nodeTypes = {};
  
  Object.keys(nodeConfigs).forEach(type => {
    nodeTypes[type] = createNode(type);
  });

  return nodeTypes;
};

export default { createNode, generateNodeTypes };