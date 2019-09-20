import React, { useState } from 'react';
import { Boxpanel } from './Boxpanel';
import { Recordpanel } from './Recordpanel';
import { Menu } from './Menu';

const style = {
  'board': {
    'easy': {
      marginLeft: '38%',
      marginTop: '4%',
      width: '280px',
      height: '340px',
      border: '5px solid lightgrey',
      backgroundColor: 'lightgrey'
    },
    'medium': {
      marginLeft: '33%',
      marginTop: '4%',
      width: '490px',
      height: '544px',
      border: '5px solid lightgrey',
      backgroundColor: 'lightgrey'
    },
    'hard': {
      marginLeft: '20%',
      marginTop: '4%',
      width: '910px',
      height: '544px',
      border: '5px solid lightgrey',
      backgroundColor: 'lightgrey'
    }
  },
  'box_panel': {
    'easy': {
      borderColor: 'grey white white grey',
      borderWidth: '2px',
      borderStyle: 'solid',
      marginLeft: '3px',
      marginRight: '3px',
      marginTop: '10px',
      boxSizing: 'border-box',
      height: '274px'
    },
    'medium': {
      borderColor: 'grey white white grey',
      borderWidth: '2px',
      borderStyle: 'solid',
      marginLeft: '3px',
      marginRight: '3px',
      marginTop: '10px',
      boxSizing: 'border-box',
      height: '484px'
    },
    'hard': {
      borderColor: 'grey white white grey',
      borderWidth: '2px',
      borderStyle: 'solid',
      marginLeft: '3px',
      marginRight: '3px',
      marginTop: '10px',
      boxSizing: 'border-box',
      height: '484px'
    }
  },
  'record_panel': {
    borderColor: 'grey white white grey',
    borderWidth: '2px',
    borderStyle: 'solid',
    marginLeft: '3px',
    marginRight: '3px',
    marginTop: '5px',
    height: '40px'
  }
}


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
    case 'hard':
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
      <div style={style.board.easy}>
        <div style={style.record_panel}><Recordpanel /></div>
        <div style={style.box_panel.easy}>
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
