import React from 'react'

const ToolList=({data,removeFunction})=>{
    return(
        <>
        <style>{`
            @import url('https://fonts.googleapis.com/css2?family=SF+Pro+Display:wght@300;400;500;600;700&display=swap');
            
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
            
            @keyframes tableSlide {
                0% {
                    opacity: 0;
                    transform: scale(0.95) rotateX(-5deg);
                }
                100% {
                    opacity: 1;
                    transform: scale(1) rotateX(0deg);
                }
            }
            
            @keyframes shimmer {
                0% {
                    background-position: -1000px 0;
                }
                100% {
                    background-position: 1000px 0;
                }
            }
            
            @keyframes pulse {
                0%, 100% {
                    transform: scale(1);
                    box-shadow: 0 0 20px rgba(0, 122, 255, 0.3);
                }
                50% {
                    transform: scale(1.02);
                    box-shadow: 0 0 40px rgba(0, 122, 255, 0.5);
                }
            }
            
            @keyframes glow {
                0%, 100% {
                    text-shadow: 0 0 5px rgba(255, 255, 255, 0.8);
                }
                50% {
                    text-shadow: 0 0 20px rgba(255, 255, 255, 1), 0 0 30px rgba(0, 122, 255, 0.8);
                }
            }
            
            @keyframes buttonHover {
                0% {
                    transform: translateY(0) scale(1);
                    box-shadow: 0 4px 20px rgba(255, 69, 58, 0.3);
                }
                100% {
                    transform: translateY(-2px) scale(1.05);
                    box-shadow: 0 8px 30px rgba(255, 69, 58, 0.6);
                }
            }
            
            @keyframes rowHover {
                0% {
                    background: linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.02) 100%);
                    transform: translateX(0);
                }
                100% {
                    background: linear-gradient(135deg, rgba(0, 122, 255, 0.1) 0%, rgba(88, 86, 214, 0.05) 100%);
                    transform: translateX(5px);
                }
            }
            
            .tool-table {
                animation: tableSlide 0.8s cubic-bezier(0.16, 1, 0.3, 1);
                perspective: 1000px;
            }
            
            .tool-table tr {
                animation: fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
                animation-delay: calc(var(--row-index) * 0.1s);
                opacity: 0;
            }
            
            .tool-table tr:hover {
                animation: rowHover 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
            }
        `}</style>
        
        <table 
            className='tool-table' 
            role='table'
            style={{
                fontFamily: "'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                width: '100%',
                borderCollapse: 'separate',
                borderSpacing: '0 8px',
                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
                backdropFilter: 'blur(20px) saturate(180%)',
                WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                borderRadius: '16px',
                padding: '20px',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
                border: '1px solid rgba(255, 255, 255, 0.18)',
                overflow: 'hidden',
                position: 'relative',
                transformStyle: 'preserve-3d'
            }}
        >
            <thead>
                <tr style={{
                    background: 'linear-gradient(135deg, rgba(0, 122, 255, 0.2) 0%, rgba(88, 86, 214, 0.15) 100%)',
                    borderRadius: '12px',
                    boxShadow: '0 4px 16px rgba(0, 122, 255, 0.2)'
                }}>
                    <th style={{
                        padding: '16px 20px',
                        fontWeight: '600',
                        fontSize: '14px',
                        letterSpacing: '0.5px',
                        textTransform: 'uppercase',
                        color: 'rgba(255, 255, 255, 0.9)',
                        borderRadius: '12px 0 0 12px',
                        background: 'linear-gradient(90deg, rgba(255, 255, 255, 0.1), transparent)',
                        animation: 'glow 3s ease-in-out infinite',
                        textAlign: 'left',
                        position: 'relative',
                        overflow: 'hidden'
                    }}>
                        <span style={{
                            background: 'linear-gradient(45deg, #007AFF, #5856D6)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text'
                        }}>
                            Borrower
                        </span>
                    </th>
                    <th style={{
                        padding: '16px 20px',
                        fontWeight: '600',
                        fontSize: '14px',
                        letterSpacing: '0.5px',
                        textTransform: 'uppercase',
                        color: 'rgba(255, 255, 255, 0.9)',
                        textAlign: 'left',
                        position: 'relative'
                    }}>
                        <span style={{
                            background: 'linear-gradient(45deg, #007AFF, #5856D6)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text'
                        }}>
                            Thing Lent
                        </span>
                    </th>
                    <th style={{
                        padding: '16px 20px',
                        fontWeight: '600',
                        fontSize: '14px',
                        letterSpacing: '0.5px',
                        textTransform: 'uppercase',
                        color: 'rgba(255, 255, 255, 0.9)',
                        textAlign: 'left'
                    }}>
                        <span style={{
                            background: 'linear-gradient(45deg, #007AFF, #5856D6)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text'
                        }}>
                            Date Lent
                        </span>
                    </th>
                    <th style={{
                        padding: '16px 20px',
                        fontWeight: '600',
                        fontSize: '14px',
                        letterSpacing: '0.5px',
                        textTransform: 'uppercase',
                        color: 'rgba(255, 255, 255, 0.9)',
                        textAlign: 'left'
                    }}>
                        <span style={{
                            background: 'linear-gradient(45deg, #007AFF, #5856D6)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text'
                        }}>
                            Date Returned
                        </span>
                    </th>
                    <th style={{
                        padding: '16px 20px',
                        fontWeight: '600',
                        fontSize: '14px',
                        letterSpacing: '0.5px',
                        textTransform: 'uppercase',
                        color: 'rgba(255, 255, 255, 0.9)',
                        borderRadius: '0 12px 12px 0',
                        textAlign: 'center'
                    }}>
                        <span style={{
                            background: 'linear-gradient(45deg, #007AFF, #5856D6)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text'
                        }}>
                            Action
                        </span>
                    </th>
                </tr>
            </thead>
            <tbody>
                {
                    data.map((item, key) => (
                        <tr 
                            key={item.id}
                            style={{
                                '--row-index': key,
                                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.02) 100%)',
                                borderRadius: '12px',
                                backdropFilter: 'blur(10px)',
                                WebkitBackdropFilter: 'blur(10px)',
                                border: '1px solid rgba(255, 255, 255, 0.1)',
                                boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)',
                                transition: 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                                position: 'relative',
                                overflow: 'hidden',
                                cursor: 'pointer'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'translateX(5px) scale(1.02)';
                                e.currentTarget.style.boxShadow = '0 8px 32px rgba(0, 122, 255, 0.3)';
                                e.currentTarget.style.background = 'linear-gradient(135deg, rgba(0, 122, 255, 0.15) 0%, rgba(88, 86, 214, 0.08) 100%)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'translateX(0) scale(1)';
                                e.currentTarget.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.1)';
                                e.currentTarget.style.background = 'linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.02) 100%)';
                            }}
                        >
                            <td style={{
                                padding: '16px 20px',
                                fontSize: '15px',
                                fontWeight: '500',
                                color: 'rgba(255, 255, 255, 0.9)',
                                borderRadius: '12px 0 0 12px',
                                position: 'relative'
                            }}>
                                <span style={{
                                    background: 'linear-gradient(90deg, rgba(255, 255, 255, 0.1), transparent)',
                                    backgroundSize: '1000px 100%',
                                    animation: 'shimmer 2s infinite linear',
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    right: 0,
                                    bottom: 0,
                                    opacity: 0,
                                    transition: 'opacity 0.3s ease'
                                }}></span>
                                {item.name}
                            </td>
                            <td style={{
                                padding: '16px 20px',
                                fontSize: '15px',
                                fontWeight: '400',
                                color: 'rgba(255, 255, 255, 0.8)',
                                position: 'relative'
                            }}>
                                {item.tool}
                            </td>
                            <td style={{
                                padding: '16px 20px',
                                fontSize: '15px',
                                fontWeight: '400',
                                color: 'rgba(255, 255, 255, 0.7)',
                                fontVariantNumeric: 'tabular-nums'
                            }}>
                                {item.dateLent}
                            </td>
                            <td style={{
                                padding: '16px 20px',
                                fontSize: '15px',
                                fontWeight: '400',
                                color: 'rgba(255, 255, 255, 0.7)',
                                fontVariantNumeric: 'tabular-nums'
                            }}>
                                {item.dateReturn}
                            </td>
                            <td style={{
                                padding: '16px 20px',
                                borderRadius: '0 12px 12px 0',
                                textAlign: 'center'
                            }}>
                                <button 
                                    onClick={() => removeFunction(item.id)}
                                    style={{
                                        background: 'linear-gradient(135deg, #FF453A 0%, #FF6B6B 100%)',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '8px',
                                        padding: '8px 16px',
                                        fontSize: '14px',
                                        fontWeight: '600',
                                        cursor: 'pointer',
                                        transition: 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                                        boxShadow: '0 4px 16px rgba(255, 69, 58, 0.3)',
                                        position: 'relative',
                                        overflow: 'hidden',
                                        backdropFilter: 'blur(10px)',
                                        WebkitBackdropFilter: 'blur(10px)',
                                        border: '1px solid rgba(255, 255, 255, 0.2)',
                                        fontFamily: 'inherit'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.target.style.transform = 'translateY(-2px) scale(1.05)';
                                        e.target.style.boxShadow = '0 8px 32px rgba(255, 69, 58, 0.6)';
                                        e.target.style.background = 'linear-gradient(135deg, #FF6B6B 0%, #FF453A 100%)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.target.style.transform = 'translateY(0) scale(1)';
                                        e.target.style.boxShadow = '0 4px 16px rgba(255, 69, 58, 0.3)';
                                        e.target.style.background = 'linear-gradient(135deg, #FF453A 0%, #FF6B6B 100%)';
                                    }}
                                    onMouseDown={(e) => {
                                        e.target.style.transform = 'translateY(0) scale(0.95)';
                                    }}
                                    onMouseUp={(e) => {
                                        e.target.style.transform = 'translateY(-2px) scale(1.05)';
                                    }}
                                >
                                    <span style={{
                                        background: 'linear-gradient(90deg, rgba(255, 255, 255, 0.3), transparent)',
                                        backgroundSize: '1000px 100%',
                                        animation: 'shimmer 3s infinite linear',
                                        position: 'absolute',
                                        top: 0,
                                        left: '-100%',
                                        right: 0,
                                        bottom: 0,
                                        opacity: 0.5
                                    }}></span>
                                    Remove
                                </button>
                            </td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
        </>
    )
}

export default ToolList