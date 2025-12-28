// nodeConfigs.js - Updated with .value fields for all nodes
export const nodeConfigs = {
  customInput: {
    title: 'Input',
    icon: '📥',
    description: 'Pass data of different types into your workflow',
    suggestion: 'Enter your input data and reference it as {{NodeID.value}}',
    inputs: [],
    outputs: [
      { id: 'value', label: 'Output' }
    ],
    fields: [
      {
        name: 'inputType',
        label: 'Type',
        type: 'select',
        defaultValue: 'Text',
        options: [
          { value: 'Text', label: 'Text' },
          { value: 'File', label: 'File' },
          { value: 'Number', label: 'Number' }
        ]
      },
      {
        name: 'value',
        label: 'Input Value',
        type: 'textarea',
        defaultValue: '',
        placeholder: 'Enter your input data here...',
        rows: 4
      }
    ],
    styles: {
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    }
  },

  customOutput: {
    title: 'Output',
    icon: '📤',
    description: 'Define output destination',
    inputs: [
      { id: 'value', label: 'Input' }
    ],
    outputs: [],
    fields: [
      {
        name: 'outputType',
        label: 'Type',
        type: 'select',
        defaultValue: 'Text',
        options: [
          { value: 'Text', label: 'Text' },
          { value: 'Image', label: 'Image' }
        ]
      },
      {
        name: 'value',
        label: 'Output Value',
        type: 'textarea',
        defaultValue: '{{input.value}}',
        placeholder: 'Reference data using {{NodeID.value}}',
        rows: 3
      }
    ],
    styles: {
      background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
    }
  },

  llm: {
    title: 'LLM',
    icon: '🤖',
    description: 'Language Model processing',
    inputs: [
      { id: 'system', label: 'System' },
      { id: 'prompt', label: 'Prompt' }
    ],
    outputs: [
      { id: 'value', label: 'Response' }
    ],
    fields: [
      {
        name: 'system',
        label: 'System (Instructions)',
        type: 'textarea',
        defaultValue: 'You are a helpful assistant.',
        placeholder: 'Enter system instructions',
        rows: 3
      },
      {
        name: 'prompt',
        label: 'Prompt',
        type: 'textarea',
        defaultValue: '{{Input_1.value}}',
        placeholder: 'Use {{NodeID.value}} to reference other nodes',
        rows: 3
      },
      {
        name: 'model',
        label: 'Model',
        type: 'select',
        defaultValue: 'gpt-3.5-turbo',
        options: [
          { value: 'gpt-3.5-turbo', label: 'GPT-3.5 Turbo' },
          { value: 'gpt-4', label: 'GPT-4' },
          { value: 'gpt-4-turbo', label: 'GPT-4 Turbo' }
        ]
      },
      {
        name: 'usePersonalKey',
        label: 'Use Personal API Key',
        type: 'select',
        defaultValue: 'No',
        options: [
          { value: 'No', label: 'No' },
          { value: 'Yes', label: 'Yes' }
        ]
      }
    ],
    styles: {
      background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
    }
  },

  text: {
    title: 'Text',
    icon: '📝',
    description: 'Text processing and transformation',
    inputs: [
      { id: 'input', label: 'Input' }
    ],
    outputs: [
      { id: 'value', label: 'Output' }
    ],
    fields: [
      {
        name: 'value',
        label: 'Text Content',
        type: 'textarea',
        defaultValue: '{{Input_1.value}}',
        placeholder: 'Use {{NodeID.value}} for references',
        rows: 4
      }
    ],
    styles: {
      background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
      minHeight: 120
    }
  },

  database: {
    title: 'Database',
    icon: '🗄️',
    description: 'Query database operations',
    inputs: [
      { id: 'query', label: 'Query' },
      { id: 'params', label: 'Parameters' }
    ],
    outputs: [
      { id: 'value', label: 'Result' },
      { id: 'error', label: 'Error' }
    ],
    fields: [
      {
        name: 'dbType',
        label: 'Database',
        type: 'select',
        defaultValue: 'postgresql',
        options: [
          { value: 'postgresql', label: 'PostgreSQL' },
          { value: 'mysql', label: 'MySQL' },
          { value: 'mongodb', label: 'MongoDB' }
        ]
      },
      {
        name: 'connection',
        label: 'Connection',
        type: 'text',
        placeholder: 'Connection string'
      },
      {
        name: 'query',
        label: 'Query',
        type: 'textarea',
        defaultValue: '',
        placeholder: 'SELECT * FROM table WHERE id = {{Input_1.value}}',
        rows: 3
      }
    ],
    styles: {
      background: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
      minHeight: 140
    }
  },

  api: {
    title: 'API Call',
    icon: '🌐',
    description: 'Make HTTP requests',
    inputs: [
      { id: 'url', label: 'URL' },
      { id: 'body', label: 'Body' },
      { id: 'headers', label: 'Headers' }
    ],
    outputs: [
      { id: 'value', label: 'Response' },
      { id: 'status', label: 'Status' }
    ],
    fields: [
      {
        name: 'method',
        label: 'Method',
        type: 'select',
        defaultValue: 'GET',
        options: [
          { value: 'GET', label: 'GET' },
          { value: 'POST', label: 'POST' },
          { value: 'PUT', label: 'PUT' },
          { value: 'DELETE', label: 'DELETE' }
        ]
      },
      {
        name: 'endpoint',
        label: 'Endpoint',
        type: 'text',
        placeholder: 'https://api.example.com/data'
      },
      {
        name: 'body',
        label: 'Request Body',
        type: 'textarea',
        defaultValue: '',
        placeholder: '{"data": "{{Input_1.value}}"}',
        rows: 3
      }
    ],
    styles: {
      background: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
      minHeight: 140
    }
  },
};

export default nodeConfigs;