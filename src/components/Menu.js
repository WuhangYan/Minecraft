import React from 'react';
import '../assets/styles/style.css';

export function Menu(props) {
  return (
    <React.Fragment>
      <div onClick={() => {props.setDiff('easy')}}>简单</div>
      <div onClick={() => {props.setDiff('medium')}}>中等</div>
      <div onClick={() => {props.setDiff('hard')}}>困难</div>
    </React.Fragment>
  )
}
