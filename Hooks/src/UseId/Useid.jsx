import { useId } from "react";

export default function Useid(){
    const id = useId();
    console.log('id:', id)
    return(
        <form>
            <label htmlFor={id + '-firstName'}>First Name:</label>
            <input id={id + '-firstName'} type="text" />
            <hr />
             <label htmlFor={id + '-lastName'}>Last Name:</label>
            <input id={id + '-lastName'} type="text" />
        </form>
    );
}