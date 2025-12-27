export const nodeConfigs = {
  customInput: {
    title: 'Input',
    icon: '📥',
    description: 'Pass data of different types into your workflow',
    suggestion: 'Give the node a distinct ID',
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
      }
    ],
    styles: {
      background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
    }
  },

  llm: {
    title: 'OpenAI',
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
        name: 'system',
        label: 'System (Instructions)',
        type: 'textarea',
        defaultValue: 'Try to give answer in sarcastic manner',
        placeholder: 'Enter system instructions',
        rows: 3
      },
      {
        name: 'prompt',
        label: 'Prompt',
        type: 'textarea',
        defaultValue: '{{Input_1.value}}, take the data and process it to give summary',
        placeholder: 'Enter prompt',
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
    description: 'Text input with variables',
    inputs: [
      { id: 'input', label: 'Input' }  // Single input handle
    ],
    outputs: [
      { id: 'output', label: 'Output' }
    ],
    fields: [
      {
        name: 'text',
        label: 'Text',
        type: 'textarea',
        defaultValue: '{{input}}',
        placeholder: 'Use {{NodeID.field}} for inputs',
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