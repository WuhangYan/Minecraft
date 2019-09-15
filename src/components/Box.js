import React, { useState } from 'react';
import '../assets/styles/style.css';
import flag from '../assets/imgs/flag.jpg';

export function Box(props) {
  const element = props.opened ? props.num : props.flaged ? <img src={flag} /> : '';
  const handleClick = (e) => {
    const btnNum = e.button;
    if(props.clicked) return;
    if(btnNum===0 && !props.flag) {
      if(props.num===9) alert('loose')   //will update in next commits
      else {
        if(props.num===0) {
          props.setZero(props.coor);
        }
        else{
          props.setOpen(props.coor);
        }
      }
    }
    else if(btnNum===2) {
      props.setFlag(props.coor);
    }
  }

  return (
    <button
      onMouseUp={(event)=>handleClick(event)}
      className='box'
      onContextMenu={(e) => {e.preventDefault()}}
    >
      {element}
    </button>
  )
}
