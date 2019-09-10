import React, { useState } from 'react';
import { Box } from './Box';
import '../assets/styles/style.css';

export function Boxpanel() {
  const [difficulty, setDiff] = useState('easy');
  let r = 9, c = 9;
  let col = [];
  for(let i=1;i<=r;i++){
    let row = [];
    for(let j=1;j<=c;j++){
      row.push(<Box key={i+'-'+j} />)
    }
    col.push(
      <div key={i} >
        {row}
      </div>
    );
  }
  return (
    <div className='box_panel'>
      {col}
    </div>
  )
}