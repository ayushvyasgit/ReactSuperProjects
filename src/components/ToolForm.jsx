import React, { useCallback, useState } from 'react'

const ToolForm=({addData})=>{
    const [name , setName] = useState('');
    const [tool , setTool] = useState('');
    const [dateLent , setDateLent] = useState('');
    const [dateReturn , setDateReturn] = useState('');
    const [notes ,setNotes] = useState('');
    const [error, setError] = useState({});
    
    const formValidation = useCallback(()=>{
        let newError={};
        if(!name.trim()) newError.name='Name is required';
        if(!tool.trim()) newError.tool='Tool is required';
        if (!dateLent) newError.dateLent = 'Date Lent is required'
        if (!dateReturn) newError.dateReturn = 'Return date is required'
        if (!notes.trim()) newError.notes = 'Notes are required'
        setError(newError);
        return newError;    
    },[name, tool, dateLent, dateReturn, notes])
    
   const formValidationAndAddition=useCallback((e)=>{
        e.preventDefault();
        let errorsList = formValidation()
        if(Object.keys(errorsList).length >0){
            return ;
        }   
        let obj ={
            id:Date.now().toString(),name,tool,dateLent,dateReturn,notes
        }
        addData(obj);
        setName('');
        setTool('');
        setDateLent('');
        setDateReturn('');
        setNotes('')
        setError({})
   }, [formValidation, addData, name, tool, dateLent, dateReturn, notes])

    return (
        <>
        <style>{`
            @import url('https://fonts.googleapis.com/css2?family=SF+Pro+Display:wght@300;400;500;600;700&display=swap');
            
            @keyframes formSlideIn {
                0% {
                    opacity: 0;
                    transform: translateY(-40px) scale(0.98);
                }
                100% {
                    opacity: 1;
                    transform: translateY(0) scale(1);
                }
            }
            
            @keyframes inputFocus {
                0% {
                    box-shadow: 0 4px 16px rgba(0, 122, 255, 0.2);
                    transform: scale(1);
                }
                100% {
                    box-shadow: 0 8px 32px rgba(0, 122, 255, 0.4);
                    transform: scale(1.02);
                }
            }
            
            @keyframes errorBounce {
                0%, 20%, 50%, 80%, 100% {
                    transform: translateY(0);
                }
                40% {
                    transform: translateY(-5px);
                }
                60% {
                    transform: translateY(-3px);
                }
            }
            
            @keyframes buttonPress {
                0% {
                    transform: scale(1);
                }
                50% {
                    transform: scale(0.98);
                }
                100% {
                    transform: scale(1);
                }
            }
            
            @keyframes gradientShift {
                0%, 100% {
                    background-position: 0% 50%;
                }
                50% {
                    background-position: 100% 50%;
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
            
            .form {
                animation: formSlideIn 0.8s cubic-bezier(0.16, 1, 0.3, 1);
            }
            
            .form input:focus, .form textarea:focus {
                animation: inputFocus 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
            }
            
            .error {
                animation: errorBounce 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
            }
            
            .submit-btn:active {
                animation: buttonPress 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94);
            }
        `}</style>
        
        <div style={{
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
            backdropFilter: 'blur(20px) saturate(180%)',
            WebkitBackdropFilter: 'blur(20px) saturate(180%)',
            borderRadius: '20px',
            padding: '32px',
            border: '1px solid rgba(255, 255, 255, 0.18)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
            marginBottom: '32px'
        }}>
            <form 
                className='form' 
                onSubmit={(e)=>formValidationAndAddition(e)}
                style={{
                    display: 'grid',
                    gap: '20px',
                    fontFamily: "'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
                }}
            >
                <div style={{ position: 'relative' }}>
                    <input 
                        type='text' 
                        placeholder="Enter borrower's name" 
                        value={name} 
                        onChange={(e)=>setName(e.target.value)}
                        style={{
                            width: '100%',
                            padding: '16px 20px',
                            borderRadius: '12px',
                            border: '1px solid rgba(255, 255, 255, 0.2)',
                            background: 'rgba(255, 255, 255, 0.1)',
                            backdropFilter: 'blur(10px)',
                            WebkitBackdropFilter: 'blur(10px)',
                            color: 'rgba(255, 255, 255, 0.9)',
                            fontSize: '16px',
                            fontWeight: '400',
                            transition: 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                            outline: 'none',
                            fontFamily: 'inherit',
                            boxSizing: 'border-box'
                        }}
                        onFocus={(e) => {
                            e.target.style.borderColor = 'rgba(0, 122, 255, 0.6)';
                            e.target.style.background = 'rgba(0, 122, 255, 0.1)';
                        }}
                        onBlur={(e) => {
                            e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                            e.target.style.background = 'rgba(255, 255, 255, 0.1)';
                        }}
                    />
                    {error.name && (
                        <div 
                            className='error'
                            id='1'
                            style={{
                                color: '#FF453A',
                                fontSize: '14px',
                                marginTop: '8px',
                                fontWeight: '500',
                                background: 'linear-gradient(135deg, rgba(255, 69, 58, 0.15) 0%, rgba(255, 69, 58, 0.05) 100%)',
                                padding: '8px 12px',
                                borderRadius: '8px',
                                border: '1px solid rgba(255, 69, 58, 0.3)'
                            }}
                        >
                            {error.name}
                        </div>
                    )}
                </div>
                
                <div style={{ position: 'relative' }}>
                    <input 
                        type='text' 
                        placeholder="Enter thing name" 
                        value={tool} 
                        onChange={(e)=>setTool(e.target.value)}
                        style={{
                            width: '100%',
                            padding: '16px 20px',
                            borderRadius: '12px',
                            border: '1px solid rgba(255, 255, 255, 0.2)',
                            background: 'rgba(255, 255, 255, 0.1)',
                            backdropFilter: 'blur(10px)',
                            WebkitBackdropFilter: 'blur(10px)',
                            color: 'rgba(255, 255, 255, 0.9)',
                            fontSize: '16px',
                            fontWeight: '400',
                            transition: 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                            outline: 'none',
                            fontFamily: 'inherit',
                            boxSizing: 'border-box'
                        }}
                        onFocus={(e) => {
                            e.target.style.borderColor = 'rgba(0, 122, 255, 0.6)';
                            e.target.style.background = 'rgba(0, 122, 255, 0.1)';
                        }}
                        onBlur={(e) => {
                            e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                            e.target.style.background = 'rgba(255, 255, 255, 0.1)';
                        }}
                    />
                    {error.tool && (
                        <div 
                            className='error'
                            id='2'
                            style={{
                                color: '#FF453A',
                                fontSize: '14px',
                                marginTop: '8px',
                                fontWeight: '500',
                                background: 'linear-gradient(135deg, rgba(255, 69, 58, 0.15) 0%, rgba(255, 69, 58, 0.05) 100%)',
                                padding: '8px 12px',
                                borderRadius: '8px',
                                border: '1px solid rgba(255, 69, 58, 0.3)'
                            }}
                        >
                            {error.tool}
                        </div>
                    )}
                </div>
                
                <div style={{ position: 'relative' }}>
                    <label style={{
                        color: 'rgba(255, 255, 255, 0.7)',
                        fontSize: '14px',
                        fontWeight: '500',
                        marginBottom: '8px',
                        display: 'block',
                        letterSpacing: '0.3px'
                    }}>
                        Date Lent
                    </label>
                    <input 
                        type='Date' 
                        placeholder="dd-mm-yyyy" 
                        value={dateLent} 
                        onChange={(e)=>setDateLent((e.target.value))}
                        style={{
                            width: '100%',
                            padding: '16px 20px',
                            borderRadius: '12px',
                            border: '1px solid rgba(255, 255, 255, 0.2)',
                            background: 'rgba(255, 255, 255, 0.1)',
                            backdropFilter: 'blur(10px)',
                            WebkitBackdropFilter: 'blur(10px)',
                            color: 'rgba(255, 255, 255, 0.9)',
                            fontSize: '16px',
                            fontWeight: '400',
                            transition: 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                            outline: 'none',
                            fontFamily: 'inherit',
                            fontVariantNumeric: 'tabular-nums',
                            boxSizing: 'border-box'
                        }}
                        onFocus={(e) => {
                            e.target.style.borderColor = 'rgba(0, 122, 255, 0.6)';
                            e.target.style.background = 'rgba(0, 122, 255, 0.1)';
                        }}
                        onBlur={(e) => {
                            e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                            e.target.style.background = 'rgba(255, 255, 255, 0.1)';
                        }}
                    />
                    {error.dateLent && (
                        <div 
                            className='error'
                            id='3'
                            style={{
                                color: '#FF453A',
                                fontSize: '14px',
                                marginTop: '8px',
                                fontWeight: '500',
                                background: 'linear-gradient(135deg, rgba(255, 69, 58, 0.15) 0%, rgba(255, 69, 58, 0.05) 100%)',
                                padding: '8px 12px',
                                borderRadius: '8px',
                                border: '1px solid rgba(255, 69, 58, 0.3)'
                            }}
                        >
                            {error.dateLent}
                        </div>
                    )}
                </div>
                
                <div style={{ position: 'relative' }}>
                    <label style={{
                        color: 'rgba(255, 255, 255, 0.7)',
                        fontSize: '14px',
                        fontWeight: '500',
                        marginBottom: '8px',
                        display: 'block',
                        letterSpacing: '0.3px'
                    }}>
                        Return Due Date
                    </label>
                    <input 
                        type='Date' 
                        placeholder="dd-mm-yyyy" 
                        value={dateReturn} 
                        onChange={(e)=>setDateReturn((e.target.value))}
                        style={{
                            width: '100%',
                            padding: '16px 20px',
                            borderRadius: '12px',
                            border: '1px solid rgba(255, 255, 255, 0.2)',
                            background: 'rgba(255, 255, 255, 0.1)',
                            backdropFilter: 'blur(10px)',
                            WebkitBackdropFilter: 'blur(10px)',
                            color: 'rgba(255, 255, 255, 0.9)',
                            fontSize: '16px',
                            fontWeight: '400',
                            transition: 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                            outline: 'none',
                            fontFamily: 'inherit',
                            fontVariantNumeric: 'tabular-nums',
                            boxSizing: 'border-box'
                        }}
                        onFocus={(e) => {
                            e.target.style.borderColor = 'rgba(0, 122, 255, 0.6)';
                            e.target.style.background = 'rgba(0, 122, 255, 0.1)';
                        }}
                        onBlur={(e) => {
                            e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                            e.target.style.background = 'rgba(255, 255, 255, 0.1)';
                        }}
                    />
                    {error.dateReturn && (
                        <div 
                            className='error'
                            id='4'
                            style={{
                                color: '#FF453A',
                                fontSize: '14px',
                                marginTop: '8px',
                                fontWeight: '500',
                                background: 'linear-gradient(135deg, rgba(255, 69, 58, 0.15) 0%, rgba(255, 69, 58, 0.05) 100%)',
                                padding: '8px 12px',
                                borderRadius: '8px',
                                border: '1px solid rgba(255, 69, 58, 0.3)'
                            }}
                        >
                            {error.dateReturn}
                        </div>
                    )}
                </div>
                
                <div style={{ position: 'relative' }}>
                    <textarea 
                        type='textarea' 
                        placeholder="Enter any additional notes (optional)" 
                        value={notes} 
                        onChange={(e)=>setNotes(e.target.value)}
                        rows="4"
                        style={{
                            width: '100%',
                            padding: '16px 20px',
                            borderRadius: '12px',
                            border: '1px solid rgba(255, 255, 255, 0.2)',
                            background: 'rgba(255, 255, 255, 0.1)',
                            backdropFilter: 'blur(10px)',
                            WebkitBackdropFilter: 'blur(10px)',
                            color: 'rgba(255, 255, 255, 0.9)',
                            fontSize: '16px',
                            fontWeight: '400',
                            transition: 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                            outline: 'none',
                            fontFamily: 'inherit',
                            resize: 'vertical',
                            minHeight: '100px',
                            boxSizing: 'border-box'
                        }}
                        onFocus={(e) => {
                            e.target.style.borderColor = 'rgba(0, 122, 255, 0.6)';
                            e.target.style.background = 'rgba(0, 122, 255, 0.1)';
                        }}
                        onBlur={(e) => {
                            e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                            e.target.style.background = 'rgba(255, 255, 255, 0.1)';
                        }}
                    />
                    {error.notes && (
                        <div 
                            className='error'
                            id='5'
                            style={{
                                color: '#FF453A',
                                fontSize: '14px',
                                marginTop: '8px',
                                fontWeight: '500',
                                background: 'linear-gradient(135deg, rgba(255, 69, 58, 0.15) 0%, rgba(255, 69, 58, 0.05) 100%)',
                                padding: '8px 12px',
                                borderRadius: '8px',
                                border: '1px solid rgba(255, 69, 58, 0.3)'
                            }}
                        >
                            {error.notes}
                        </div>
                    )}
                </div>
                
                {Object.keys(error).length>0 && (
                    <div 
                        className='error'
                        style={{
                            color: '#FF453A',
                            fontSize: '16px',
                            fontWeight: '600',
                            background: 'linear-gradient(135deg, rgba(255, 69, 58, 0.2) 0%, rgba(255, 69, 58, 0.1) 100%)',
                            padding: '16px 20px',
                            borderRadius: '12px',
                            border: '1px solid rgba(255, 69, 58, 0.4)',
                            textAlign: 'center',
                            backdropFilter: 'blur(10px)',
                            WebkitBackdropFilter: 'blur(10px)',
                            boxShadow: '0 4px 16px rgba(255, 69, 58, 0.2)'
                        }}
                    >
                        All fields are required
                    </div>
                )}
                
                <button 
                    type='submit' 
                    className='submit-btn'
                    style={{
                        background: 'linear-gradient(135deg, #007AFF 0%, #5856D6 100%)',
                        backgroundSize: '200% 200%',
                        animation: 'gradientShift 3s ease infinite',
                        color: 'white',
                        border: 'none',
                        borderRadius: '12px',
                        padding: '16px 24px',
                        fontSize: '18px',
                        fontWeight: '600',
                        cursor: 'pointer',
                        transition: 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                        boxShadow: '0 8px 32px rgba(0, 122, 255, 0.4)',
                        position: 'relative',
                        overflow: 'hidden',
                        backdropFilter: 'blur(10px)',
                        WebkitBackdropFilter: 'blur(10px)',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        fontFamily: 'inherit',
                        letterSpacing: '0.3px',
                        textTransform: 'none'
                    }}
                    onMouseEnter={(e) => {
                        e.target.style.transform = 'translateY(-3px) scale(1.02)';
                        e.target.style.boxShadow = '0 12px 48px rgba(0, 122, 255, 0.6)';
                        e.target.style.background = 'linear-gradient(135deg, #5856D6 0%, #007AFF 100%)';
                    }}
                    onMouseLeave={(e) => {
                        e.target.style.transform = 'translateY(0) scale(1)';
                        e.target.style.boxShadow = '0 8px 32px rgba(0, 122, 255, 0.4)';
                        e.target.style.background = 'linear-gradient(135deg, #007AFF 0%, #5856D6 100%)';
                    }}
                    onMouseDown={(e) => {
                        e.target.style.transform = 'translateY(0) scale(0.98)';
                    }}
                    onMouseUp={(e) => {
                        e.target.style.transform = 'translateY(-3px) scale(1.02)';
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
                    Submit Record
                </button>
            </form>
        </div>
        </>
    )
}

export default ToolForm;