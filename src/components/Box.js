import React, { useState } from 'react';
import '../assets/styles/style.css';

export function Box(props) {

  return (
    <button onClick={()=>console.log(props)} className='box' />
  )
}
