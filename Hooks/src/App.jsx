import { useState } from 'react'
import { useReducer } from 'react'
import reducer from './UseReducer/MyCom'
import UseR from './UseReducer/UseR'
import './App.css'
import Useref from './UseRef/Useref'
import Stopwatch from './UseRef/Stopwatch'
import Useid from './UseId/Useid'

function App() {
  // const [a, setA] = useState(20)

const [state, dispatch] = useReducer(reducer, { age: 20});


    function handleClick() {
  dispatch({ type: 'incremented_age' });
    }

  return (
    <>
    {/* <h1>{a}</h1>
      <button onClick={()=> setA(30)}>Chanche Value</button> */}
      <br />
      <p>Age:{state.age}</p>
       <button onClick={handleClick}>increment age</button>
       <br />
       <UseR/>
       <Useref />
       <Stopwatch/><br />
       <Useid/>
     </>
    );
}

export default App
