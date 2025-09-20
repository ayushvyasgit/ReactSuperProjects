import React, { useState } from 'react'
import ToolList from './components/ToolList'
import ToolForm from './components/ToolForm'
import './App.css'
function App() {
  const [data,setData] = useState([])

  const addData=(dataObj)=>{
    setData([...data,dataObj] );
  }
  
  const removeFunction =(id)=>{
      setData(data => data.filter(item=>item.id !== id))
  }
  
  return (
    <>
    <style>{`
        @import url('https://fonts.googleapis.com/css2?family=SF+Pro+Display:wght@300;400;500;600;700&display=swap');
        
        @keyframes heroGlow {
            0%, 100% {
                text-shadow: 0 0 20px rgba(255, 255, 255, 0.8), 0 0 40px rgba(0, 122, 255, 0.5);
            }
            50% {
                text-shadow: 0 0 40px rgba(255, 255, 255, 1), 0 0 80px rgba(0, 122, 255, 0.8);
            }
        }
        
        @keyframes counterPulse {
            0%, 100% {
                transform: scale(1);
            }
            50% {
                transform: scale(1.05);
            }
        }
        
        @keyframes emptyState {
            0% {
                opacity: 0.5;
                transform: translateY(10px);
            }
            100% {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        @keyframes fadeInUp {
            0% {
                opacity: 0;
                transform: translateY(30px);
            }
            100% {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .container {
            animation: fadeInUp 1s cubic-bezier(0.16, 1, 0.3, 1);
        }
        
        .hero-title {
            animation: heroGlow 4s ease-in-out infinite;
        }
        
        .counter-badge {
            animation: counterPulse 2s ease-in-out infinite;
        }
        
        .empty-state {
            animation: emptyState 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }
    `}</style>
    
    <div 
        className='container'
        style={{
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
            padding: '40px 20px',
            fontFamily: "'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
        }}
    >
        <div style={{
            maxWidth: '1200px',
            margin: '0 auto'
        }}>
            <h1 
                className='hero-title'
                style={{
                    fontSize: '48px',
                    fontWeight: '700',
                    background: 'linear-gradient(135deg, #ffffff 0%, #007AFF 50%, #5856D6 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    textAlign: 'center',
                    marginBottom: '16px',
                    letterSpacing: '-0.5px'
                }}
            >
                Lending Tracker
            </h1>
            
            <div style={{
                textAlign: 'center',
                marginBottom: '48px'
            }}>
                <span 
                    className='counter-badge'
                    style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px',
                        background: 'linear-gradient(135deg, rgba(0, 122, 255, 0.2) 0%, rgba(88, 86, 214, 0.15) 100%)',
                        backdropFilter: 'blur(20px) saturate(180%)',
                        WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                        padding: '12px 24px',
                        borderRadius: '50px',
                        border: '1px solid rgba(255, 255, 255, 0.18)',
                        color: 'rgba(255, 255, 255, 0.9)',
                        fontSize: '16px',
                        fontWeight: '600',
                        boxShadow: '0 4px 16px rgba(0, 122, 255, 0.3)'
                    }}
                >
                    <div style={{
                        width: '8px',
                        height: '8px',
                        borderRadius: '50%',
                        background: data.length > 0 ? '#34C759' : '#FF453A',
                        boxShadow: data.length > 0 ? '0 0 10px #34C759' : '0 0 10px #FF453A'
                    }}></div>
                    Total Lent: {data.length}
                </span>
            </div>

            <ToolForm addData={addData} />

            {data.length > 0 && (
                <ToolList data={data} removeFunction={removeFunction} />
            )}

            {data.length === 0 && (
                <div 
                    className='empty-state'
                    style={{
                        textAlign: 'center',
                        padding: '60px 40px',
                        background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.02) 100%)',
                        backdropFilter: 'blur(20px) saturate(180%)',
                        WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                        borderRadius: '20px',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                        marginTop: '32px'
                    }}
                >
                    <div style={{
                        fontSize: '64px',
                        marginBottom: '24px',
                        opacity: '0.5'
                    }}>
                        🔧
                    </div>
                    <p style={{
                        fontSize: '24px',
                        fontWeight: '600',
                        color: 'rgba(255, 255, 255, 0.7)',
                        margin: '0',
                        letterSpacing: '0.3px'
                    }}>
                        No tools lent yet
                    </p>
                    <p style={{
                        fontSize: '16px',
                        color: 'rgba(255, 255, 255, 0.5)',
                        margin: '8px 0 0 0'
                    }}>
                        Start tracking your tool lending above
                    </p>
                </div>
            )}
        </div>
    </div>
    </>
  )
}

export default App