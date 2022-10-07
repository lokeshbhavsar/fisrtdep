import React, { useEffect } from 'react'
import Peer from 'peerjs'

const New = () => {
 
    useEffect(()=>{
const peer=new Peer()

peer.on('open',function(id){
    console.log(id);
},[])
      
    })

  return (
    <div>Nesw</div>
  )
}

export default New