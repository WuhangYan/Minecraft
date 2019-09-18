import React from 'react';
import '../assets/styles/style.css';
import flag from '../assets/imgs/flag.jpg';
import mine from '../assets/imgs/mine.jpeg';

export function Box(props) {
  let className = getClassName(props.num);
  const opened = props.opened ? 'opened' : 'unopen';
  const element = props.opened ? props.num === 9 ? <img id='mine' src={mine} /> :
  <span className={className}>{props.num}</span> : props.flaged ? <img id='flag' src={flag} /> : '';
/*
  use 'right_left' variable to detemine whether both right and left click event happened
  the positive action is left/right mouse down then left/right mouse up both to the opened box
  the negatice action, like left mouse down then up or left/right mouse down then left up then left down, etc,
  will reset the 'right_left' value
*/
  let right_left = 0;
  const handleMouseUp = (e) => {
    if(props.status !== 'process') return 
    const btnNum = e.button;
    if(props.opened) {
      if(right_left >= 2 && right_left <= 3) {
        if(btnNum === 0) {
          right_left++;
        }
        if(btnNum === 2) {
          right_left++;
        }
        if(right_left === 4) {
          props.autoOpen(props.coor);
          right_left = 0
        }
      }
      else if(right_left > 3 || right_left < 2) right_left = 0;
    }
    else {
      if(btnNum === 0 && !props.flaged) {
        document.getElementById(props.coor).removeAttribute('style');
        if(props.num === 0) {
          props.setZero(props.coor);
        }
        else {
          props.setOpen(props.coor);
        }
      }
    }
  }
  const handleMouseDown = (e) => {
    if(props.status !== 'process') return;
    const btnNum = e.button;
    if(props.opened) {
      if(btnNum === 0) {
        right_left++;
      }
      if(btnNum === 2) {
        right_left++;
      }
    }
    else {
      if(btnNum === 2) {
        props.setFlag(props.coor);
      }
      else if(btnNum === 0) {
        document.getElementById(props.coor).style.backgroundColor = '#B8B8B8';
      }
    }
  }

  return (
    <button
      onMouseUp={(event)=>handleMouseUp(event)}
      onMouseDown={(event)=>handleMouseDown(event)}
      className={'box ' + opened}
      onContextMenu={(e) => {e.preventDefault()}}
      id={props.coor}
    >
      {element}
    </button>
  )
}

function getClassName(num) {
  let className = '';
  switch(num) {
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
  return className;
}
