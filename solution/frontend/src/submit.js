// submit.js - Fixed button layout with proper spacing
import { useStore } from './store';
import { useState } from 'react';

export const SubmitButton = () => {
  const nodes = useStore((state) => state.nodes);
  const edges = useStore((state) => state.edges);
  const [isExecuting, setIsExecuting] = useState(false);

  const handleSubmit = async () => {
    try {
      const pipelineData = {
        nodes: nodes.map(node => ({
          id: node.id,
          type: node.type,
          position: node.position,
          data: node.data
        })),
        edges: edges.map(edge => ({
          id: edge.id,
          source: edge.source,
          target: edge.target,
          sourceHandle: edge.sourceHandle,
          targetHandle: edge.targetHandle
        }))
      };

      const response = await fetch('http://localhost:8000/pipelines/parse', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(pipelineData)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      showAnalysisModal(result, pipelineData);

    } catch (error) {
      console.error('Error submitting pipeline:', error);
      alert(`❌ Error: Failed to submit pipeline.\n\n${error.message}\n\nMake sure the backend server is running on http://localhost:8000`);
    }
  };

  const handleExecute = async () => {
    if (isExecuting) return;

    setIsExecuting(true);
    
    try {
      const pipelineData = {
        pipeline: {
          nodes: nodes.map(node => ({
            id: node.id,
            type: node.type,
            position: node.position,
            data: node.data
          })),
          edges: edges.map(edge => ({
            id: edge.id,
            source: edge.source,
            target: edge.target,
            sourceHandle: edge.sourceHandle,
            targetHandle: edge.targetHandle
          }))
        }
      };

      const response = await fetch('http://localhost:8000/pipelines/execute', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(pipelineData)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      showExecutionModal(result);

    } catch (error) {
      console.error('Error executing pipeline:', error);
      alert(`❌ Error: Failed to execute pipeline.\n\n${error.message}\n\nMake sure:\n1. Backend server is running\n2. API keys are correct\n3. MongoDB is running (if using MongoDB node)`);
    } finally {
      setIsExecuting(false);
    }
  };

  const showAnalysisModal = (result, pipelineData) => {
    const overlay = document.createElement('div');
    overlay.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.7);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 10000;
      animation: fadeIn 0.2s;
    `;

    const modal = document.createElement('div');
    modal.style.cssText = `
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      padding: 30px;
      border-radius: 16px;
      color: white;
      max-width: 500px;
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
      animation: slideIn 0.3s;
    `;

    modal.innerHTML = `
      <h2 style="margin: 0 0 20px 0; font-size: 24px; display: flex; align-items: center; gap: 10px;">
        <span style="font-size: 32px;">✅</span>
        Pipeline Analysis
      </h2>
      <div style="background: rgba(255,255,255,0.15); padding: 20px; border-radius: 12px; margin-bottom: 20px;">
        <div style="display: flex; justify-content: space-between; margin-bottom: 12px;">
          <span style="opacity: 0.9;">📊 Nodes:</span>
          <strong style="font-size: 20px;">${result.num_nodes}</strong>
        </div>
        <div style="display: flex; justify-content: space-between; margin-bottom: 12px;">
          <span style="opacity: 0.9;">🔗 Edges:</span>
          <strong style="font-size: 20px;">${result.num_edges}</strong>
        </div>
        <div style="display: flex; justify-content: space-between;">
          <span style="opacity: 0.9;">Valid DAG:</span>
          <strong style="font-size: 20px;">${result.is_dag ? '✓ Yes' : '✗ No'}</strong>
        </div>
      </div>
      <p style="margin: 0 0 20px 0; opacity: 0.9; font-size: 14px;">
        ${result.is_dag 
          ? '🎉 Your pipeline is valid and ready to execute!' 
          : '⚠️ Warning: Your pipeline contains cycles and cannot be executed.'
        }
      </p>
      <div style="display: flex; gap: 10px;">
        ${result.is_dag ? `
          <button id="executeBtn" style="
            flex: 1;
            padding: 12px;
            background: rgba(16, 163, 127, 0.9);
            border: 2px solid rgba(255,255,255,0.5);
            border-radius: 8px;
            color: white;
            font-weight: 600;
            cursor: pointer;
            font-size: 14px;
            transition: all 0.2s;
          ">
            ▶️ Execute Pipeline
          </button>
        ` : ''}
        <button id="closeModal" style="
          flex: 1;
          padding: 12px;
          background: rgba(255,255,255,0.25);
          border: 2px solid rgba(255,255,255,0.5);
          border-radius: 8px;
          color: white;
          font-weight: 600;
          cursor: pointer;
          font-size: 14px;
          transition: all 0.2s;
        ">
          Close
        </button>
      </div>
    `;

    overlay.appendChild(modal);
    document.body.appendChild(overlay);

    const style = document.createElement('style');
    style.textContent = `
      @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }
      @keyframes slideIn {
        from { transform: translateY(-20px); opacity: 0; }
        to { transform: translateY(0); opacity: 1; }
      }
      #closeModal:hover, #executeBtn:hover {
        background: rgba(255,255,255,0.35) !important;
        transform: translateY(-2px);
      }
    `;
    document.head.appendChild(style);

    const closeModal = () => {
      document.body.removeChild(overlay);
      document.head.removeChild(style);
    };

    document.getElementById('closeModal').onclick = closeModal;
    if (result.is_dag) {
      document.getElementById('executeBtn').onclick = () => {
        closeModal();
        handleExecute();
      };
    }
    overlay.onclick = (e) => {
      if (e.target === overlay) closeModal();
    };
  };

  const showExecutionModal = (result) => {
    const overlay = document.createElement('div');
    overlay.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.7);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 10000;
      animation: fadeIn 0.2s;
      overflow-y: auto;
    `;

    const isSuccess = result.status === 'success';
    const hasErrors = result.execution_log?.some(log => log.status === 'error');

    const modal = document.createElement('div');
    modal.style.cssText = `
      background: ${isSuccess && !hasErrors 
        ? 'linear-gradient(135deg, #10a37f 0%, #0d8a6b 100%)' 
        : 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)'};
      padding: 30px;
      border-radius: 16px;
      color: white;
      max-width: 700px;
      max-height: 90vh;
      overflow-y: auto;
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
      animation: slideIn 0.3s;
      margin: 20px;
    `;

    let resultsHTML = '';
    if (result.results) {
      resultsHTML = Object.entries(result.results).map(([nodeId, nodeResult]) => {
        const hasError = nodeResult.error;
        return `
          <div style="
            background: rgba(255,255,255,0.15);
            padding: 15px;
            border-radius: 8px;
            margin-bottom: 10px;
          ">
            <div style="font-weight: 600; margin-bottom: 8px; display: flex; align-items: center; gap: 8px;">
              ${hasError ? '❌' : '✅'} ${nodeId}
            </div>
            ${hasError ? `
              <div style="color: #ffcccc; font-size: 13px; margin-top: 8px;">
                Error: ${nodeResult.error}
              </div>
            ` : `
              <div style="
                background: rgba(0,0,0,0.2);
                padding: 10px;
                border-radius: 6px;
                font-size: 13px;
                font-family: monospace;
                max-height: 150px;
                overflow-y: auto;
              ">
                ${JSON.stringify(nodeResult, null, 2).substring(0, 500)}${JSON.stringify(nodeResult).length > 500 ? '...' : ''}
              </div>
            `}
          </div>
        `;
      }).join('');
    }

    modal.innerHTML = `
      <h2 style="margin: 0 0 20px 0; font-size: 24px; display: flex; align-items: center; gap: 10px;">
        <span style="font-size: 32px;">${isSuccess && !hasErrors ? '✅' : '❌'}</span>
        Pipeline Execution ${isSuccess && !hasErrors ? 'Complete' : 'Failed'}
      </h2>
      
      <div style="background: rgba(255,255,255,0.15); padding: 20px; border-radius: 12px; margin-bottom: 20px;">
        <div style="font-size: 14px; opacity: 0.9; margin-bottom: 10px;">
          Status: <strong>${result.status}</strong>
        </div>
        ${result.execution_order ? `
          <div style="font-size: 14px; opacity: 0.9;">
            Executed ${result.execution_order.length} nodes in order
          </div>
        ` : ''}
      </div>

      ${resultsHTML ? `
        <div style="margin-bottom: 20px;">
          <h3 style="font-size: 16px; margin: 0 0 12px 0;">Node Results:</h3>
          <div style="max-height: 400px; overflow-y: auto;">
            ${resultsHTML}
          </div>
        </div>
      ` : ''}

      ${result.error ? `
        <div style="
          background: rgba(255,255,255,0.15);
          padding: 15px;
          border-radius: 8px;
          margin-bottom: 20px;
        ">
          <div style="font-weight: 600; margin-bottom: 8px;">Error Details:</div>
          <div style="font-size: 13px; opacity: 0.9;">${result.error}</div>
        </div>
      ` : ''}

      <button id="closeExecutionModal" style="
        width: 100%;
        padding: 12px;
        background: rgba(255,255,255,0.25);
        border: 2px solid rgba(255,255,255,0.5);
        border-radius: 8px;
        color: white;
        font-weight: 600;
        cursor: pointer;
        font-size: 14px;
        transition: all 0.2s;
      ">
        Close
      </button>
    `;

    overlay.appendChild(modal);
    document.body.appendChild(overlay);

    const style = document.createElement('style');
    style.textContent = `
      @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }
      @keyframes slideIn {
        from { transform: translateY(-20px); opacity: 0; }
        to { transform: translateY(0); opacity: 1; }
      }
      #closeExecutionModal:hover {
        background: rgba(255,255,255,0.35) !important;
        transform: translateY(-2px);
      }
    `;
    document.head.appendChild(style);

    const closeModal = () => {
      document.body.removeChild(overlay);
      document.head.removeChild(style);
    };

    document.getElementById('closeExecutionModal').onclick = closeModal;
    overlay.onclick = (e) => {
      if (e.target === overlay) closeModal();
    };
  };

  return (
    <div style={{
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      gap: 12,
      padding: '16px 20px',
      background: 'linear-gradient(to right, rgba(255,255,255,0.95), rgba(255,255,255,0.98))',
      borderTop: '2px solid #e6e9ef',
      boxShadow: '0 -4px 12px rgba(0,0,0,0.05)',
      zIndex: 100
    }}>
      <button 
        onClick={handleSubmit}
        style={{
          padding: '10px 24px',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          border: 'none',
          borderRadius: '8px',
          color: 'white',
          fontSize: '14px',
          fontWeight: '600',
          cursor: 'pointer',
          boxShadow: '0 4px 12px rgba(102, 126, 234, 0.4)',
          transition: 'all 0.3s ease',
          outline: 'none',
          whiteSpace: 'nowrap'
        }}
        onMouseOver={(e) => {
          e.target.style.transform = 'translateY(-2px)';
          e.target.style.boxShadow = '0 6px 16px rgba(102, 126, 234, 0.6)';
        }}
        onMouseOut={(e) => {
          e.target.style.transform = 'translateY(0)';
          e.target.style.boxShadow = '0 4px 12px rgba(102, 126, 234, 0.4)';
        }}
      >
        📊 Analyze Pipeline
      </button>

      <button 
        onClick={handleExecute}
        disabled={isExecuting}
        style={{
          padding: '10px 24px',
          background: isExecuting 
            ? 'linear-gradient(135deg, #9ca3af 0%, #6b7280 100%)'
            : 'linear-gradient(135deg, #10a37f 0%, #0d8a6b 100%)',
          border: 'none',
          borderRadius: '8px',
          color: 'white',
          fontSize: '14px',
          fontWeight: '600',
          cursor: isExecuting ? 'not-allowed' : 'pointer',
          boxShadow: '0 4px 12px rgba(16, 163, 127, 0.4)',
          transition: 'all 0.3s ease',
          outline: 'none',
          opacity: isExecuting ? 0.7 : 1,
          whiteSpace: 'nowrap'
        }}
        onMouseOver={(e) => {
          if (!isExecuting) {
            e.target.style.transform = 'translateY(-2px)';
            e.target.style.boxShadow = '0 6px 16px rgba(16, 163, 127, 0.6)';
          }
        }}
        onMouseOut={(e) => {
          if (!isExecuting) {
            e.target.style.transform = 'translateY(0)';
            e.target.style.boxShadow = '0 4px 12px rgba(16, 163, 127, 0.4)';
          }
        }}
      >
        {isExecuting ? '⏳ Executing...' : '▶️ Execute Pipeline'}
      </button>
    </div>
  );
};

export default SubmitButton;