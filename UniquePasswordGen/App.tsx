import { useCallback, useEffect, useState } from 'react'
import './App.css'

function App() {
  const [length, setLength] = useState(0)
  const [value ,setValue] = useState('');
  const [isNumber,setIsNumber] = useState(false);
  const [isCharacters, setIsCharacter] = useState(false);

  useEffect(()=>{generateString()},[length,isNumber,isCharacters,length])
  const generateString= useCallback(()=>{
    let pass ='';
    let str  ='abcdefghijklmnopqrstuvwxyz';
  
    if(isNumber) str+='1234567890';
    if(isCharacters) str+='~!@#$%^&*())_+';

    for (let i = 0; i < length; i++) {
      const charIndex = Math.floor(Math.random() * str.length)
      pass += str.charAt(charIndex)
    }

    setValue(pass);

  },[length,value,isCharacters,isNumber ,setValue])

  const copy = () => {
    navigator.clipboard.writeText(value)
    alert('Copied to clipboard!')
  }
  return (
    <>
        <h1 className='text-4xl text-center text-white'>HI lengther</h1>
        <div>   
          <input type='text' value={value} readOnly placeholder='Generated password will be shown here'/>
          <button onClick={()=>copy()}>Copy</button>
        </div>

        <div>
          <input type='range' value={length} min={0} onChange={(e)=>setLength(Number(e.target.value))}/>
          <label>Length ({length})</label>
          <input type='checkbox' checked={isNumber} onChange={()=>setIsNumber(prev=>!prev)}  /><label>Number {isNumber.toString()}</label>
          <input type ='checkbox' checked={isCharacters}  onChange={()=>setIsCharacter(prev=>!prev)}  /><label>Character {isCharacters.toString()}</label>
        </div>
    </>
  )
}

export default App
