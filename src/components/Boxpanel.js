import React, { useState, useEffect } from 'react';
import { Box } from './Box';
import '../assets/styles/style.css';

export function Boxpanel(props) {
  const r = props.total_row, c = props.total_col, m = props.total_mine;
  //const [mines, setMines] = useState(genarateMines(r, c, m));
  const [time, setTime] = useState(0);
  const [openBox, setOpenBox] = useState([]);
  const [flagBox, setFlagBox] = useState([]);
  const mines = props.mines;
  useEffect(() => {
    if(props.status === 'initial') {
      props.setStatus('process');
      setOpenBox([]);
      setFlagBox([]);
    }
  })
  if(props.status === 'initial') return null;
  //console.log(mines)
  //console.log(props);
  /* zeroBox for storing the box having no mines around and arr for storing the box needed to be auto opened
  before pusing new box to both array, a check for duplicate is required.
  */
  const handleZero = (coor) => {
    let zeroBox = [], arr = openBox;
    zeroBox.push(coor);
    arr.push(coor);
    let loop = 0;
    while(loop < zeroBox.length) {
      const coorArr = zeroBox[loop++].split('-');
      const row = parseInt(coorArr[0]), col = parseInt(coorArr[1]);
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

  const handleAutoOpen = (coor) => {
    let flags = 0, arr = [];
    const coorArr = coor.split('-');
    const row = parseInt(coorArr[0]), col = parseInt(coorArr[1]);
    if(row>0 && col>0) {
      arr.push((row-1) + '-' + (col-1));
      if(flagBox.indexOf((row-1) + '-' + (col-1))>=0) {
        flags++;
      }
    }
    if(row>0) {
      arr.push((row-1) + '-' + col);
      if(flagBox.indexOf((row-1) + '-' + col)>=0) {
        flags++;
      }
    }
    if(row>0 && col<c-1) {
      arr.push((row-1) + '-' + (col+1));
      if(flagBox.indexOf((row-1) + '-' + (col+1))>=0) {
        flags++;
      }
    }
    if(col>0) {
      arr.push(row + '-' + (col-1));
      if(flagBox.indexOf(row + '-' + (col-1))>=0) {
        flags++;
      }
    }
    if(col<c-1) {
      arr.push(row + '-' + (col+1));
      if(flagBox.indexOf(row + '-' + (col+1))>=0) {
        flags++;
      }
    }
    if(row<r-1 && col>0) {
      arr.push((row+1) + '-' + (col-1));
      if(flagBox.indexOf((row+1) + '-' + (col-1))>=0) {
        flags++;
      }
    }
    if(row<r-1) {
      arr.push((row+1) + '-' + col);
      if(flagBox.indexOf((row+1) + '-' + col)>=0) {
        flags++;
      }
    }
    if(row<r-1 && col<c-1) {
      arr.push((row+1) + '-' + (col+1));
      if(flagBox.indexOf((row+1) + '-' + (col+1))>=0) {
        flags++;
      }
    }
    if(flags === mines[row][col]) {
      let open_arr = openBox;
      for(let i=0;i<arr.length;i++) {
        if(flagBox.indexOf(arr[i]) < 0 && open_arr.indexOf(arr[i]) < 0) open_arr.push(arr[i]);
      }
      setOpenBox([...open_arr]);
    }
    else if(flags < mines[row][col]) {
      let blink = [];
      for(let i=0;i<arr.length;i++) {
        if(flagBox.indexOf(arr[i]) < 0 && openBox.indexOf(arr[i]) < 0) blink.push(arr[i]);
      }
      for(let i=0;i<blink.length;i++) {
        document.getElementById(blink[i]).style.backgroundColor = '#B8B8B8';
        setTimeout(() => {
          for(let j=0;j<blink.length;j++) {
            document.getElementById(blink[j]).removeAttribute('style');
          }
        }, 100);
      }
    }
  }

  const handleLoose = () => {
    props.setStatus('loose');
  }

  if(openBox.length + flagBox.length === r * c) {
    props.setStatus('win');
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
          autoOpen={handleAutoOpen}
          opened={openBox.indexOf(i+'-'+j)>=0}
          flaged={flagBox.indexOf(i+'-'+j)>=0}
          status={props.status}
          loose={handleLoose}
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
    <div className='box_panel10'>
      {row}
    </div>
  )
}
