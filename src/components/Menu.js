import React from 'react';
import '../assets/styles/style.css';

export function Menu() {
  const toggleDialog = (id) => {
    let e = document.getElementById(id);
    let style = e.style;
    if(style.display=='none') {
      style.display = 'block';
      style.position = 'absolute';
      e.setAttribute('class', 'open');
    }
    else {
      style.display = 'none';
    }
  }
  return (
    <ul className='menu'>
        <li className='btn' onClick={()=>toggleDialog('game_dialog')}>
          <span>游戏</span>
          <ul id='game_dialog' style={{display: 'none'}}>
            <li><span>重新开始</span></li>
            <li><span>调整难度</span></li>
            <li><span>退出</span></li>
          </ul>
        </li>
        <li className='btn' onClick={()=>toggleDialog('help_dialog')}>
          <span>帮助</span>
          <ul id='help_dialog' style={{display: 'none'}}>
            <li><span>关于</span></li>
          </ul>
        </li>
    </ul>
  )
}
