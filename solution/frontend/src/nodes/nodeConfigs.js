// nodeConfigs.js - Enhanced with ChatGPT, Gemini, Word Generator, and MongoDB

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
        defaultValue: '{{Input_1.value}}',
        placeholder: 'Reference data using {{NodeID.value}}',
        rows: 3
      }
    ],
    styles: {
      background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
    }
  },

  // 🆕 CHATGPT NODE
  chatgpt: {
    title: 'ChatGPT',
    icon: '🤖',
    description: 'OpenAI GPT-4 language model with real API integration',
    suggestion: 'Add your OpenAI API key to enable AI-powered responses',
    inputs: [
      { id: 'system', label: 'System' },
      { id: 'prompt', label: 'Prompt' }
    ],
    outputs: [
      { id: 'value', label: 'Response' }
    ],
    fields: [
      {
        name: 'apiKey',
        label: 'OpenAI API Key',
        type: 'password',
        defaultValue: '',
        placeholder: 'sk-...',
        isPassword: true
      },
      {
        name: 'model',
        label: 'Model',
        type: 'select',
        defaultValue: 'gpt-4',
        options: [
          { value: 'gpt-4', label: 'GPT-4' },
          { value: 'gpt-4-turbo', label: 'GPT-4 Turbo' },
          { value: 'gpt-3.5-turbo', label: 'GPT-3.5 Turbo' }
        ]
      },
      {
        name: 'system',
        label: 'System Instructions',
        type: 'textarea',
        defaultValue: 'You are a helpful assistant.',
        placeholder: 'System instructions...',
        rows: 3
      },
      {
        name: 'prompt',
        label: 'Prompt',
        type: 'textarea',
        defaultValue: '{{Input_1.value}}',
        placeholder: 'Use {{NodeID.value}} to reference data',
        rows: 4
      },
      {
        name: 'temperature',
        label: 'Temperature',
        type: 'number',
        defaultValue: '0.7',
        min: 0,
        max: 2,
        step: 0.1
      },
      {
        name: 'maxTokens',
        label: 'Max Tokens',
        type: 'number',
        defaultValue: '1000',
        min: 1,
        max: 4000
      }
    ],
    styles: {
      background: 'linear-gradient(135deg, #10a37f 0%, #0d8a6b 100%)'
    }
  },

  // 🆕 GEMINI NODE
  gemini: {
    title: 'Gemini',
    icon: '✨',
    description: 'Google Gemini AI model with real API integration',
    suggestion: 'Add your Google AI API key to enable Gemini responses',
    inputs: [
      { id: 'prompt', label: 'Prompt' }
    ],
    outputs: [
      { id: 'value', label: 'Response' }
    ],
    fields: [
      {
        name: 'apiKey',
        label: 'Google AI API Key',
        type: 'password',
        defaultValue: '',
        placeholder: 'AIza...',
        isPassword: true
      },
      {
        name: 'model',
        label: 'Model',
        type: 'select',
        defaultValue: 'gemini-pro',
        options: [
          { value: 'gemini-pro', label: 'Gemini Pro' },
          { value: 'gemini-pro-vision', label: 'Gemini Pro Vision' }
        ]
      },
      {
        name: 'prompt',
        label: 'Prompt',
        type: 'textarea',
        defaultValue: '{{Input_1.value}}',
        placeholder: 'Use {{NodeID.value}} to reference data',
        rows: 4
      },
      {
        name: 'temperature',
        label: 'Temperature',
        type: 'number',
        defaultValue: '0.7',
        min: 0,
        max: 1,
        step: 0.1
      },
      {
        name: 'maxTokens',
        label: 'Max Output Tokens',
        type: 'number',
        defaultValue: '1000',
        min: 1,
        max: 2048
      }
    ],
    styles: {
      background: 'linear-gradient(135deg, #4285f4 0%, #34a853 100%)'
    }
  },

  // 🆕 WORD GENERATOR NODE
  wordGenerator: {
    title: 'Word Generator',
    icon: '📄',
    description: 'Generate Microsoft Word documents from pipeline data',
    suggestion: 'Create DOCX files and download them automatically',
    inputs: [
      { id: 'content', label: 'Content' },
      { id: 'title', label: 'Title' }
    ],
    outputs: [
      { id: 'value', label: 'File Path' },
      { id: 'status', label: 'Status' }
    ],
    fields: [
      {
        name: 'title',
        label: 'Document Title',
        type: 'text',
        defaultValue: 'Generated Document',
        placeholder: 'Document title...'
      },
      {
        name: 'content',
        label: 'Content',
        type: 'textarea',
        defaultValue: '{{ChatGPT_1.value}}',
        placeholder: 'Use {{NodeID.value}} for content',
        rows: 6
      },
      {
        name: 'filename',
        label: 'Filename',
        type: 'text',
        defaultValue: 'output.docx',
        placeholder: 'filename.docx'
      },
      {
        name: 'autoDownload',
        label: 'Auto Download',
        type: 'select',
        defaultValue: 'Yes',
        options: [
          { value: 'Yes', label: 'Yes' },
          { value: 'No', label: 'No' }
        ]
      },
      {
        name: 'fontSize',
        label: 'Font Size',
        type: 'number',
        defaultValue: '12',
        min: 8,
        max: 72
      }
    ],
    styles: {
      background: 'linear-gradient(135deg, #2b5797 0%, #1e3a5f 100%)'
    }
  },

  // 🆕 MONGODB NODE
  mongodb: {
    title: 'MongoDB',
    icon: '🍃',
    description: 'Store and retrieve data from MongoDB',
    suggestion: 'Save pipeline results to MongoDB collections',
    inputs: [
      { id: 'data', label: 'Data' }
    ],
    outputs: [
      { id: 'value', label: 'Document ID' },
      { id: 'status', label: 'Status' }
    ],
    fields: [
      {
        name: 'connectionString',
        label: 'Connection String',
        type: 'password',
        defaultValue: 'mongodb://localhost:27017',
        placeholder: 'mongodb://username:password@host:port',
        isPassword: true
      },
      {
        name: 'database',
        label: 'Database',
        type: 'text',
        defaultValue: 'pipeline_db',
        placeholder: 'Database name'
      },
      {
        name: 'collection',
        label: 'Collection',
        type: 'text',
        defaultValue: 'results',
        placeholder: 'Collection name'
      },
      {
        name: 'data',
        label: 'Data to Store',
        type: 'textarea',
        defaultValue: '{{ChatGPT_1.value}}',
        placeholder: 'Use {{NodeID.value}} to reference data',
        rows: 4
      },
      {
        name: 'operation',
        label: 'Operation',
        type: 'select',
        defaultValue: 'insertOne',
        options: [
          { value: 'insertOne', label: 'Insert One' },
          { value: 'insertMany', label: 'Insert Many' },
          { value: 'updateOne', label: 'Update One' },
          { value: 'find', label: 'Find' }
        ]
      },
      {
        name: 'includeTimestamp',
        label: 'Include Timestamp',
        type: 'select',
        defaultValue: 'Yes',
        options: [
          { value: 'Yes', label: 'Yes' },
          { value: 'No', label: 'No' }
        ]
      }
    ],
    styles: {
      background: 'linear-gradient(135deg, #13aa52 0%, #0e8a3f 100%)'
    }
  },

  // ORIGINAL NODES (kept for compatibility)
  llm: {
    title: 'LLM (Generic)',
    icon: '🤖',
    description: 'Generic Language Model processing',
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