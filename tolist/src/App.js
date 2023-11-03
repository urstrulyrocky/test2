import { useState } from "react";

function App(){

  const [number,setNumber] = useState(0);

  const handleIncrement = ()=> {
    setNumber(number+1)
  }
  return(
    <>
    <div>
        <button onClick={handleIncrement}>Increment</button>
        </div>
        {number}
        </>
  )
};

export default App