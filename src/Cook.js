import axios from 'axios'
import React, { useEffect, useState } from 'react'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
const Cook = () => {

const [searchtext,setsearchtext]=useState("")

const {
  transcript,
  listening,
  resetTranscript,
  browserSupportsSpeechRecognition
} = useSpeechRecognition();


  const [Results,setResults]=useState([])

  useEffect(()=>{
 
 if(searchtext!=="")
 {
    let temptext=searchtext
    let result = temptext.replace(" ","%20");
  result = result.trim()

   const debounce=setTimeout(() => {
    axios.get(`https://www.googleapis.com/customsearch/v1?key=AIzaSyC6Mi0HPkELkDH3S7Ub7BEKMIxhLiT6Vto&cx=017576662512468239146:omuauf_lfve&q=${result}`).then((res)=>{
      console.log(res.data)
      setResults(res.data.items)
      console.log("map",Results)
   }).catch((err)=>{
     console.log(err)
   })
   }, 3000);  

   
    return ()=>{
    clearTimeout(debounce)
    }
  }
      },[searchtext])

      useEffect(()=>{
        setsearchtext(transcript)
      },[transcript])




  return (
 <div style={{display:'flex',flexDirection:'column',backgroundColor:'yellow'}}>



<div style={{display:'flex',backgroundColor:'red',flexDirection:'column',alignItems:"start"}}>

<p>Microphone: {listening ? 'Please speak' : ' mic is off'}</p>

<div style={{display:'flex',flexDirection:'row',justifyContent:"space-between",backgroundColor:'green',width:"20%",}}>
      <button onClick={SpeechRecognition.startListening}>Start</button>
     
      <button onClick={SpeechRecognition.stopListening}>Stop</button>
      <button onClick={resetTranscript}>Reset</button>
      
      </div>
      <p> Searching for - {transcript}</p>
</div>
<div>
  {
    Results.map(({title,formattedUrl})=>{
      return(
      <a href={formattedUrl}>  <p > <u>{title}</u></p></a>
      )
    })
  }
</div>

<div>
  
</div>


 </div>
  )

}

export default Cook