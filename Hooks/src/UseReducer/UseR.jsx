import { useReducer } from "react";

function reducer(state,action){
    if(action.type === 'incremented_age'){
        return {
            age: state.age + 1
        };
    }
    throw new Error('Unknown action.');
}

export default function CountAge(){

    const [state,dispatch]= useReducer(reducer,{age:40});
   return(
    <>
       <button onClick={()=>dispatch({type:'incremented_age'})}>Increment age</button>
       <p>Hello! you are {state.age}</p>
    </>
   )


}