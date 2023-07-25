import React, { useEffect } from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import AddIcon from '@mui/icons-material/Add';
import gcss from './generalcss.module.css'
import { useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import axios from 'axios';
const Two = () => {

  const [name,setname]=useState('')
  const [age,setage]=useState('')
  const [flagrefresh,setflagrefresh]=useState(true)
  const [editflag,seteditflag]=useState(false)
  const [tempid,settempid]=useState('')
  const onsubmit=()=>{
    const submitobject={name:name,age:age}
console.log(submitobject);

if(editflag===false)
{
  axios.post('http://localhost:3001/Entries/InsertEntries',submitobject).then((res)=>{
    console.log('posted data');
    setflagrefresh(!flagrefresh)
  }).catch((Err)=>console.log('err'))
}
else
{
  submitobject.id=tempid
  axios.put('http://localhost:3001/Entries/EditEntries',submitobject).then((res)=>{
 settempid('')
 setflagrefresh(!flagrefresh)
 seteditflag(false)
  }).catch((Err)=>console.log('err'))
}


setname('')
setage('')
  }



 const [list,setlist]=useState([]) 
useEffect(()=>{
axios.get('http://localhost:3001/Entries/getallentries').then(res=>setlist(res.data)).catch(err=>console.log('err',err))

},[flagrefresh])

console.log('data',list);

const deletelistitem=(itemid)=>{
  console.log(itemid);
  axios.delete('http://localhost:3001/Entries/DeleteEntries',{
  
    data: {
      id: itemid
    }
  }).then((res)=>{console.log('Item deleted')
setflagrefresh(!flagrefresh)
}).catch(err=>console.log('err',err))
}

const editlistitem=(itemid,name,age)=>{
  seteditflag(true)
  setname(name)
  setage(age)
  settempid(itemid)
}

  return (
    <div style={{display:'flex',flexDirection:'column',height:'100%',backgroundColor:'#CAF1DE'}}>

<div style={{display:'flex',flexDirection:'row',justifyContent:'center',padding:10}}>
<Box sx={{display:'flex'}}>
      
      
      <TextField value={name} id="filled-basic" label="NAME" variant="filled" onChange={e=>setname(e.target.value)}  />
      <TextField value={age} sx={{marginLeft:1}} id="filled-basic" label="AGE" variant="filled" onChange={e=>setage(e.target.value)} />
    <button onClick={onsubmit}>
     <AddIcon  className={gcss.buttone} sx={{marginLeft:1,alignSelf:'center'}}   />
     </button>
    </Box>
</div>

<div style={{display:'flex',flexDirection:'column',justifyContent:'center',padding:10}}>
{
  list?.map((e,i)=>{
    return(
      <div key={i} style={{display:'flex',justifyContent:'center'}}>
        <p style={{backgroundColor:'#F7EE2E',width:100,padding:5,textAlign:'center',borderRadius:5,marginRight:10,marginTop:5}}>{e.name}</p>
        <p style={{backgroundColor:'red',width:30,padding:5,textAlign:'center',borderRadius:5,marginTop:5}}>{e.age}</p>
        <button onClick={()=>{
          deletelistitem(e._id)
        }}  className={gcss.delete} style={{display:'flex',alignItems:'center',marginLeft:10}}>
          <DeleteIcon  sx={{color:'blue',alignSelf:'center'}} />
        </button>
        <button onClick={()=>{
          editlistitem(e._id,e.name,e.age)
        }}  className={gcss.delete} style={{display:'flex',alignItems:'center',marginLeft:10}}>
          <EditIcon  sx={{color:'grey',alignSelf:'center'}} />
        </button>
        </div>
    )
  })
}

</div>

    </div>
  )
}

export default Two