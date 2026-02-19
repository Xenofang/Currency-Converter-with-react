import React  from "react";
import {useEffect , useState} from "react"

function useCurrency(currency){
    const  [data , setData] = useState({}) 
    useEffect(()=>{
        const API= `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${currency}.json` ;
        fetch(API)
        .then((res)=> res.json())
        .then((res)=> setData(res[currency]) )
        .catch(err => console.error(err));
        console.log(data);
    },[currency])
    console.log(data);
    return data;
    
}
export default useCurrency;