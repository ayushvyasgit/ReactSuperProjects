// nodes/nodeFactory.js
import BaseNode from './BaseNode';
import TextNode from './TextNode';
import { nodeConfigs } from './nodeConfigs';

export const createNode = (type) => {
  // Special case for TextNode as it has custom logic
  if (type === 'text') {
    return TextNode;
  }

  const config = nodeConfigs[type];
  
  if (!config) {
    console.warn(`Node type "${type}" not found in configurations`);
    return null;
  }

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