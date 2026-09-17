import { useState } from "react"

function Counter(){

    const[counter,setCounter]=useState(10)

    const addValue=()=>{
        setCounter(prevCounter=>prevCounter + 1);
        setCounter(prevCounter=>prevCounter + 1);
        setCounter(prevCounter=>prevCounter+ 1);
        setCounter(prevCountr=>prevCountr + 1);
    }
    const removeValue=()=>{
        setCounter(counter - 1);
    }

return(
    <>
    <h1>Hello</h1>
   <h2>Counter value:{counter}</h2>

   <button onClick={addValue}>Add Value</button>
   <button onClick={removeValue}>removeValue</button>
   </>
)
}
export default Counter