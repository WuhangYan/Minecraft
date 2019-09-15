import React, { useState } from 'react';
import '../assets/styles/style.css';
import flag from '../assets/imgs/flag.jpg';

export function Box(props) {
  let className = '';
  switch(props.num) {
    case 0: className += 'zero';
      break;
    case 1: className += 'one';
      break;
    case 2: className += 'two';
      break;
    case 3: className += 'three';
      break;
    case 4: className += 'four';
      break;
    case 5: className += 'five';
      break;
    case 6: className += 'six';
      break;
    case 7: className += 'seven';
      break;
    case 8: className += 'eight';
      break;
  }
  const opened = props.opened ? 'opened' : 'unopen';
  const element = props.opened ? <span className={className}>{props.num}</span> : props.flaged ? <img src={flag} /> : '';
  const handleClick = (e) => {
    const btnNum = e.button;
    if(props.clicked) return;
    if(btnNum === 0 && !props.flaged) {
      if(props.num === 9) {
        alert('loose')
        props.loose();
      }
      else {
        if(props.num === 0) {
          props.setZero(props.coor);
        }
        else{
          props.setOpen(props.coor);
        }
      }
    }
    else if(btnNum === 2) {
      props.setFlag(props.coor);
    }
  }

  return (
    <button
      onMouseUp={(event)=>handleClick(event)}
      className={'box ' + opened}
      onContextMenu={(e) => {e.preventDefault()}}
    >
      {element}
    </button>
  )
}
