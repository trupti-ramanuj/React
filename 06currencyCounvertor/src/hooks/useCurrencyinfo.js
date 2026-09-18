import { useEffect, useState } from "react";

function useCurrencyinfo(curr){
    const [data,setData]=({})
useEffect(()=>{
    fetch('https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/usd.json')
    .then((res)=>res.json)
    .then((res)=>setData(res[curr]))
    console.log(data);
},[curr])
console.log(data);
return data
}
export default useCurrencyinfo;