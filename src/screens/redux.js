import React from 'react'
const initialval=0
const redux = (state=initialval,action) => {
 switch(action.type)
 {
    case 'Increment':return state+1
    default: return state
 }
}

export default redux