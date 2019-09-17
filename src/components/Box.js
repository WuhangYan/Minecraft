import React from 'react';
import '../assets/styles/style.css';
import flag from '../assets/imgs/flag.jpg';

export function Box(props) {
  const game_over = props.opened ? props.num === 9 ? props.loose() : null : null;
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
  let right_left = 0;             //for detecting either left and right click click down together
  const handleMouseUp = (e) => {
    const btnNum = e.button;
    if(props.opened) {
      if(btnNum === 0) {
        right_left++;
      }
      if(btnNum === 2) {
        right_left++;
      }
      if(right_left === 4) {
        props.autoOpen(props.coor);
        right_left === 0
      }
    }
    else {
      if(btnNum === 0 && !props.flaged) {
        document.getElementById(props.coor).removeAttribute('style');
        if(props.num === 9) {
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
    }
  }
  const handleMouseDown = (e) => {
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
