// App.js - Main application component
import { PipelineToolbar } from './components/toolbar';
import { PipelineUI } from './ui';
import { SubmitButton } from './submit';

function App() {
  return (
    <div style={{
      width: '100vw',
      height: '100vh',
      overflow: 'hidden',
      background: '#ffffff',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
    }}>
      {/* Header/Toolbar */}
      <PipelineToolbar />
      
      {/* Main Canvas */}
      <PipelineUI />
      
      {/* Submit Button */}
      <SubmitButton />
    </div>
  );
}

export default App;