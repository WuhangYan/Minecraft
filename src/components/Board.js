import React, { useState } from 'react';
import { Boxpanel } from './Boxpanel';
import { Recordpanel } from './Recordpanel';
import { Menu } from './Menu';

export function Board() {
  const [mines, setMines] = useState([]);
  const [status, setStatus] = useState('initial');
  const [diff, setDiff] = useState('easy');
  const reset = () => {
    setStatus('initial');
  }
  const handleStatus = (s) => {
    if(s === 'process') {
      setMines(genarateMines(total_row, total_col, total_mine))
    }
    setStatus(s);
  }
  const handleSetDiff = (d) => {
    setDiff(d);
    reset();
  }
  console.log('status: ' + status)
  let total_row, total_col, total_mine;
  switch (diff) {
    case 'easy':
      total_row = 9;
      total_col = 9;
      total_mine = 10;
      break;
    case 'medium':
      total_row = 16;
      total_col = 16;
      total_mine = 40;
      break;
    case 'medium':
      total_row = 16;
      total_col = 30;
      total_mine = 99;
      break;
    default:
      break;
  }
  return (
    <div>
      <div className='menu'>
        <Menu
          setDiff={handleSetDiff}
        />
      </div>
      <div className='board'>
        <div><Recordpanel /></div>
        <div>
          <Boxpanel
            total_row={total_row}
            total_col={total_col}
            total_mine={total_mine}
            setStatus={handleStatus}
            status={status}
            mines={mines}
          />
        </div>
      </div>
      {
        status === 'win' || status === 'loose' ?
        <div className='dialog'>
          <div>{status.toUpperCase()}</div>
          <div>
            <button onClick={() => {reset()}}>Restart</button>
          </div>
        </div> : <div></div>
      }
    </div>
  )
}

function genarateMines(total_row, total_col, total_mine) {
  let result = new Array(total_row);
  for(let k=0;k<total_row;k++) {
    result[k] = new Array(total_col);
  }
  let round = 0;
  while(round < total_mine){
    let i = Math.floor(Math.random()*total_row);
    let j = Math.floor(Math.random()*total_col);
    if(result[i][j]!==9) {
      result[i][j] = 9;
      round++;
    }
  }
  for(let m=0;m<total_row;m++) {
    for(let n=0;n<total_col;n++) {
      if(result[m][n]!==9){
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
