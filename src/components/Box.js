import React, { useState } from 'react';
import '../assets/styles/style.css';

export function Box(props) {
  const element = props.clicked ? props.num : '';
  const handleClick = (e) => {
    const btnNum = e.button;
    if(props.clicked) return;
    if(btnNum===0 && !props.flag) {
      if(props.num===9) alert('loose')   //will update in next commits
      else {
        if(props.num===0) {
          props.zero(props.coor);
        }
        else{
          props.open(props.coor);
        }
      }
    }

  }

  return (
    <button onMouseUp={(event)=>handleClick(event)} className='box'>
      {element}
    </button>
  )
}
