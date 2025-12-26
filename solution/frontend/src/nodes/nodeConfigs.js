export const nodeConfigs = {
  customInput: {
    title: 'Input',
    icon: '📥',
    description: 'Define input parameters',
    inputs: [],
    outputs: [
      { id: 'value', label: 'Output' }
    ],
    fields: [
      {
        name: 'inputName',
        label: 'Name',
        type: 'text',
        defaultValue: 'input_',
        placeholder: 'Enter input name'
      },
      {
        name: 'inputType',
        label: 'Type',
        type: 'select',
        defaultValue: 'Text',
        options: [
          { value: 'Text', label: 'Text' },
          { value: 'File', label: 'File' }
        ]
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
        name: 'outputName',
        label: 'Name',
        type: 'text',
        defaultValue: 'output_',
        placeholder: 'Enter output name'
      },
      {
        name: 'outputType',
        label: 'Type',
        type: 'select',
        defaultValue: 'Text',
        options: [
          { value: 'Text', label: 'Text' },
          { value: 'Image', label: 'Image' }
        ]
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
      { id: 'response', label: 'Response' }
    ],
    fields: [
      {
        name: 'model',
        label: 'Model',
        type: 'select',
        defaultValue: 'gpt-4',
        options: [
          { value: 'gpt-4', label: 'GPT-4' },
          { value: 'gpt-3.5-turbo', label: 'GPT-3.5 Turbo' },
          { value: 'claude-3', label: 'Claude 3' }
        ]
      },
      {
        name: 'temperature',
        label: 'Temperature',
        type: 'number',
        defaultValue: 0.7,
        min: 0,
        max: 2,
        step: 0.1
      }
    ],
    styles: {
      background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
    }
  },

  text: {
    title: 'Text',
    icon: '📝',
    description: 'Text input with variables',
    inputs: [],
    outputs: [
      { id: 'output', label: 'Output' }
    ],
    fields: [
      {
        name: 'text',
        label: 'Text',
        type: 'textarea',
        defaultValue: '{{input}}',
        placeholder: 'Enter text (use {{variable}} for inputs)',
        rows: 4
      }
    ],
    styles: {
      background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
      minHeight: 120
    }
  },

  // New Node 3: Database
  database: {
    title: 'Database',
    icon: '🗄️',
    description: 'Query database operations',
    inputs: [
      { id: 'query', label: 'Query' },
      { id: 'params', label: 'Parameters' }
    ],
    outputs: [
      { id: 'result', label: 'Result' },
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
      }
    ],
    styles: {
      background: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
      minHeight: 140
    }
  },

  // New Node 4: API Call
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
      { id: 'response', label: 'Response' },
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
        placeholder: 'https://api.example.com'
      }
    ],
    styles: {
      background: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
      minHeight: 140
    }
  },

  
};

export default nodeConfigs;