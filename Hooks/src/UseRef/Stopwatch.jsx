import { useState,useRef } from "react";

export default function Stopwatch(){
    const [startTime,setStartTime] = useState(null);
    const [now,setNow] = useState(null);
    const intervalRef = useRef(null);

    function handleStart(){
        setStartTime(Date.now());
        setNow(Date.now());


        clearInterval(intervalRef.current);
        intervalRef.current = setInterval(() => {
            setNow(Date.now());
        },10);
    }

    function handleStop(){
        clearInterval(intervalRef.current);
    }

    let sec = 0;
    if(startTime != null && now != null){
        sec = (now - startTime)/1000;
    }

    return(
        <>
          <h1>Time passed: { sec.toFixed(0)}</h1> <br />
          <button onClick={handleStart}> Start</button> <br />
          <button onClick={handleStop}>Stop</button>
        </>
    );
}