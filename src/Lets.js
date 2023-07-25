import React, { useEffect, useState } from 'react'

const Lets = (props) => {
    props.wobj.onmessage = function (event) {
        console.log(event.data);
    }
    
    useEffect(()=>{
        props.wobj.send('hello from react')
    },[])
  return (
   <div>
    asd
   </div>
  )
}

export default Lets