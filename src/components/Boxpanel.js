import React, { useState } from 'react';
import { Box } from './Box';
import '../assets/styles/style.css';

export function Boxpanel() {
  let r = 9, c = 9;
  const mines = genarateMines();
  let col = [];
  for(let i=0;i<r;i++){
    let row = [];
    for(let j=0;j<c;j++){
      row.push(<Box key={i+'-'+j} num={mines[i][j]} flag={false} clicked={false} />)
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

function genarateMines() {
  const r = 9, c = 9;
  let result = new Array(r);
  for(let k=0;k<r;k++) {
    result[k] = new Array(c);
  }
  let round = 0;
  while(round < 10){
    let i = Math.floor(Math.random()*r);                       //[0, 1)*rows &向下取整 => [0, 8)
    let j = Math.floor(Math.random()*c);
    if(result[i][j]!==9) {
      result[i][j] = 9;
      round++;
    }
  }
  for(let m=0;m<r;m++) {
    for(let n=0;n<c;n++) {
      if(result[m][n]!=9){
        let num = 0;
        if(m>0 && n>0 && result[m-1][n-1]===9) num++;
        if(m>0 && result[m-1][n]===9) num++;
        if(m>0 && n<c-1 && result[m-1][n+1]===9) num++;
        if(n>0 && result[m][n-1]===9) num++;
        if(n<c-1 && result[m][n+1]===9) num++;
        if(m<r-1 && n>0 && result[m+1][n-1]===9) num++;
        if(m<r-1 && result[m+1][n]===9) num++;
        if(m<r-1 && n<c-1 && result[m+1][n+1]===9) num++;
        result[m][n]=num;
      }
    }
  }
  return result;
}
