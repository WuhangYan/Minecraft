import React, { useState } from 'react';
import { Boxpanel } from './Boxpanel';
import { Recordpanel } from './Recordpanel';
import { Menu } from './Menu';
import { style, genarateMines } from '../assets/utilities/utilities';

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
      <div style={style.board[diff]}>
        <div style={style.record_panel}><Recordpanel /></div>
        <div style={style.box_panel[diff]}>
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
