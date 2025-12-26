// submit.js - Enhanced with backend integration
import { useStore } from './store';

export const SubmitButton = () => {
  const nodes = useStore((state) => state.nodes);
  const edges = useStore((state) => state.edges);

  const handleSubmit = async () => {
    try {
      // Prepare pipeline data
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

      // Send to backend
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

      // Display result in a styled alert
      const alertMessage = `
Pipeline Analysis Complete! ✅

📊 Number of Nodes: ${result.num_nodes}
🔗 Number of Edges: ${result.num_edges}
${result.is_dag ? '✓' : '✗'} Is Valid DAG: ${result.is_dag ? 'Yes' : 'No'}

${result.is_dag 
  ? 'Your pipeline is valid and can be executed!' 
  : 'Warning: Your pipeline contains cycles and cannot be executed as a DAG.'
}
      `.trim();

      alert(alertMessage);

      // Optional: Show a more styled modal instead of alert
      showCustomModal(result);

    } catch (error) {
      console.error('Error submitting pipeline:', error);
      alert(`❌ Error: Failed to submit pipeline.\n\n${error.message}\n\nMake sure the backend server is running on http://localhost:8000`);
    }
  };

  const showCustomModal = (result) => {
    // Create a custom modal overlay
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
        Pipeline Analysis Complete
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
          ? '🎉 Your pipeline is valid and can be executed!' 
          : '⚠️ Warning: Your pipeline contains cycles and cannot be executed as a DAG.'
        }
      </p>
      <button id="closeModal" style="
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

    // Add animations
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
      #closeModal:hover {
        background: rgba(255,255,255,0.35) !important;
        transform: translateY(-2px);
      }
    `;
    document.head.appendChild(style);

    // Close modal handlers
    const closeModal = () => {
      document.body.removeChild(overlay);
      document.head.removeChild(style);
    };

    document.getElementById('closeModal').onclick = closeModal;
    overlay.onclick = (e) => {
      if (e.target === overlay) closeModal();
    };
  };

  return (
    <div style={{
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      padding: '20px',
      background: 'linear-gradient(to right, #f8f9fa, #e9ecef)'
    }}>
      <button 
        onClick={handleSubmit}
        style={{
          padding: '12px 32px',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          border: 'none',
          borderRadius: '8px',
          color: 'white',
          fontSize: '16px',
          fontWeight: '600',
          cursor: 'pointer',
          boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)',
          transition: 'all 0.3s ease',
          outline: 'none'
        }}
        onMouseOver={(e) => {
          e.target.style.transform = 'translateY(-2px)';
          e.target.style.boxShadow = '0 6px 20px rgba(102, 126, 234, 0.6)';
        }}
        onMouseOut={(e) => {
          e.target.style.transform = 'translateY(0)';
          e.target.style.boxShadow = '0 4px 15px rgba(102, 126, 234, 0.4)';
        }}
      >
        🚀 Submit Pipeline
      </button>
    </div>
  );
};

export default SubmitButton;