import React, { useState } from 'react';
import { Box } from './Box';
import '../assets/styles/style.css';

export function Boxpanel(props) {
  const [openBox, setOpenBox] = useState(new Array());
  const [flagBox, setFlagBox] = useState(new Array());
  const mines = props.mines;
  const r = props.total_row, c = props.total_col;
  /* zeroBox for storing the box having no mines around and arr for storing the box needed to be auto opened
  before pusing new box to both array, a check for duplicate is required.
  */
  const handleZero = (pos) => {
    let zeroBox = [], arr = openBox;
    zeroBox.push(pos);
    arr.push(pos);
    let loop = 0;
    while(loop < zeroBox.length) {
      const posArr = zeroBox[loop++].split('-');
      const row = parseInt(posArr[0]), col = parseInt(posArr[1]);
      if(row>0 && col>0 && arr.indexOf((row-1) + '-' + (col-1))<0 && flagBox.indexOf((row-1) + '-' + (col-1))<0) {
        arr.push((row-1) + '-' + (col-1));
        if(mines[row-1][col-1]===0 && zeroBox.indexOf((row-1) + '-' + (col-1))<0) zeroBox.push((row-1) + '-' + (col-1));
      }
      if(row>0 && arr.indexOf((row-1) + '-' + col)<0 && flagBox.indexOf((row-1) + '-' + col)<0) {
        arr.push((row-1) + '-' + col);
        if(mines[row-1][col]===0 && zeroBox.indexOf((row-1) + '-' + col)<0) zeroBox.push((row-1) + '-' + col);
      }
      if(row>0 && col<c-1 && arr.indexOf((row-1) + '-' + (col+1))<0 && flagBox.indexOf((row-1) + '-' + (col+1))<0) {
        arr.push((row-1) + '-' + (col+1));
        if(mines[row-1][col+1]===0 && zeroBox.indexOf((row-1) + '-' + (col+1))<0) zeroBox.push((row-1) + '-' + (col+1));
      }
      if(col>0 && arr.indexOf(row + '-' + (col-1))<0 && flagBox.indexOf(row + '-' + (col-1))<0) {
        arr.push(row + '-' + (col-1));
        if(mines[row][col-1]===0 && zeroBox.indexOf(row + '-' +  (col-1))<0) zeroBox.push(row + '-' +  (col-1));
      }
      if(col<c-1 && arr.indexOf(row + '-' + (col+1))<0 && flagBox.indexOf(row + '-' + (col+1))<0) {
        arr.push(row + '-' + (col+1));
        if(mines[row][col+1]===0 && zeroBox.indexOf(row + '-' + (col+1))<0) zeroBox.push(row + '-' + (col+1));
      }
      if(row<r-1 && col>0 && arr.indexOf((row+1) + '-' + (col-1))<0 && flagBox.indexOf((row+1) + '-' + (col-1))<0) {
        arr.push((row+1) + '-' + (col-1));
        if(mines[row+1][col-1]===0 && zeroBox.indexOf((row+1) + '-' + (col-1))<0) zeroBox.push((row+1) + '-' + (col-1));
      }
      if(row<r-1 && arr.indexOf((row+1) + '-' + col)<0 && flagBox.indexOf((row+1) + '-' + col)<0) {
        arr.push((row+1) + '-' + col);
        if(mines[row+1][col]===0 && zeroBox.indexOf((row+1) + '-' + col)<0) zeroBox.push((row+1) + '-' + col);
      }
      if(row<r-1 && col<c-1 && arr.indexOf((row+1) + '-' + (col+1))<0 && flagBox.indexOf((row+1) + '-' + (col+1))<0) {
        arr.push((row+1) + '-' + (col+1));
        if(mines[row+1][col+1]===0 && zeroBox.indexOf((row+1) + '-' + (col+1))<0) zeroBox.push((row+1) + '-' + (col+1));
      }
    }
    setOpenBox([...arr]);
  }

  const handleOpen = (coor) => {
    setOpenBox([...openBox, coor]);
  }

  const handleFlag = (coor) => {
    const location = flagBox.indexOf(coor);
    if(location>=0) {
      const update = flagBox;
      update.splice(location, 1);
      setFlagBox([...update]);
    }
    else setFlagBox([...flagBox, coor]);
  }

  const handleReset= () => {
    setOpenBox(new Array());
    setFlagBox(new Array());
    props.reset();
  }

  if(openBox.length + flagBox.length === r * c) {
    setOpenBox(new Array());
    setFlagBox(new Array());
    props.reset();
  }

  let row = [];
  for(let i=0;i<r;i++){
    let col = [];
    for(let j=0;j<c;j++){
      col.push(
        <Box
          key={i+'-'+j}
          coor={i+'-'+j}
          num={mines[i][j]}
          setOpen={handleOpen}
          setZero={handleZero}
          setFlag={handleFlag}
          opened={openBox.indexOf(i+'-'+j)>=0}
          flaged={flagBox.indexOf(i+'-'+j)>=0}
          reset={() => props.reset()}
          loose={handleReset}
        />
      )
    }
    row.push(
      <div key={i}>
        {col}
      </div>
    );
  }
  return (
    <div className='box_panel'>
      {row}
    </div>
  )
}
