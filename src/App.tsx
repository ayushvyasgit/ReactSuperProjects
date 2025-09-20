
import { useState } from 'react'

function App() {

  const [color , setColor] = useState('white');

  function randomColorGenerator(){
    const r = Math.random()*(256);
    const  b = Math.random()*(256);
    const g = Math.random()*(256);

    const color  = `rgb(${r.toFixed(0)}, ${b.toFixed(0)}, ${g.toFixed(0)})`;
    console.log(color);
    return color;
  }

  return (
    <>
      <button onClick={()=>setColor(randomColorGenerator())} >Change Color</button>
      <div style={{backgroundColor:color , height:'100vh' ,width:'100vw'}} ></div>

    </>
  )
}

export default App
