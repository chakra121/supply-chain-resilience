"use client";
import { Button } from '@/components/ui/button';
import axios from 'axios';
import {useState, useEffect, use} from 'react';

export default function Home() {
  const [message, setMesssage]= useState("Api not fetched");
  const [count, setCount] = useState(0);
  const increaseCounter=()=>{
    setCount(count + 1);
  }
  useEffect(() => {
    axios.get(`${process.env.NEXT_PUBLIC_API_URL}/`)
    .then((response) => {
      console.log("Data fetched:", response);
      setMesssage(response.data.message);
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
  }, []);

  return (
    <div>
      <h1></h1>
      <p>{message} & {count}</p>
      <Button onClick={increaseCounter}>Refresh Page</Button>  
    </div>
  );
}
