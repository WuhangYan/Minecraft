import React, { useState } from 'react';
import { Boxpanel } from './Boxpanel';
import { Recordpanel } from './Recordpanel';

export function Board() {
  const [mines, setMines]= useState(genarateMines(9, 9));
  const reset = () => {
    setMines(genarateMines(9, 9));
  }
  return (
    <div className='board'>
      <div><Recordpanel /></div>
      <div>
        <Boxpanel
          mines={mines}
          total_row={9}
          total_col={9}
          reset={reset}
        />
      </div>
    </div>
  )
}

function genarateMines(total_row, total_col) {
  let result = new Array(total_row);
  for(let k=0;k<total_row;k++) {
    result[k] = new Array(total_col);
  }
  let round = 0;
  while(round < 10){
    let i = Math.floor(Math.random()*total_row);                       //[0, 1)*rows &向下取整 => [0, 8)
    let j = Math.floor(Math.random()*total_col);
    if(result[i][j]!==9) {
      result[i][j] = 9;
      round++;
    }
  }
  for(let m=0;m<total_row;m++) {
    for(let n=0;n<total_col;n++) {
      if(result[m][n]!=9){
        let num = 0;
        if(m>0 && n>0 && result[m-1][n-1]===9) num++;
        if(m>0 && result[m-1][n]===9) num++;
        if(m>0 && n<total_col-1 && result[m-1][n+1]===9) num++;
        if(n>0 && result[m][n-1]===9) num++;
        if(n<total_col-1 && result[m][n+1]===9) num++;
        if(m<total_row-1 && n>0 && result[m+1][n-1]===9) num++;
        if(m<total_row-1 && result[m+1][n]===9) num++;
        if(m<total_row-1 && n<total_col-1 && result[m+1][n+1]===9) num++;
        result[m][n]=num;
      }
    }
  }
  return result;
}
