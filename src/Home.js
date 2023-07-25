import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { io } from 'socket.io-client';
const Home = () => {
  const [msg,setmsg]=useState('')
  

  const [socket,setsocket]=useState(null)
  useEffect(() => {
    // Replace with your server URL
    if(socket===null)
    {
      setsocket(io('http://localhost:5000'))
    }
    else
    {
      socket.on('connect', () => {
        console.log('Connected to server');
      });
      socket.on('fromserver', (data) => {
        console.log('sad',data);
      });
    }
  
  }, []);

  const[r,sr]=useState(null)
useEffect(()=>{
if(socket!==null)
{
  socket.on('fromserver', (data) => {
    sr(data)
    console.log('sad',data);

  });}

},[socket])
 
  
const clicked=()=>{
  socket.emit('clientEvent', msg);
  
  setmsg('')
}

  return (
    <div>
<input onChange={e=>setmsg(e.target.value)} value={msg} type='text'></input>
<button onClick={clicked}>click</button>



    </div>
  )
}

export default Home