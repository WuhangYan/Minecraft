import React, { useState, useEffect } from 'react';
import '../assets/styles/style.css';

export function Recordpanel(props) {
  const [time, setTime] = useState('00:00');
  const [left, setLeft] = useState('0'+props.left_mine);
  useEffect(() => {
    if(props.status === 'initial') {
      setTime('00:00');
    }
    if(props.status === 'process') {
      let min = 0, sec = 0;
      const time_tick = setInterval(() => {
        if(sec < 60) sec++;
        else {
          min++;
          sec = 0;
        }
        const m = min < 10 ? '0' + min : min + '';
        const s = sec < 10 ? '0' + sec : sec + '';
        setTime(m + ':' + s);
      }, 1000)
      return () => {
        clearTimeout(time_tick);
      }
    }
  }, [props.status])

  useEffect(() => {
    const num = props.left_mine;
    if(num < 10) setLeft('00'+num);
    else setLeft('0'+num)
  }, [props.left_mine])

  return (
    <div className='record_panel'>
      <div className='time'>{time}</div>
      <div className='left'>{left}</div>
    </div>
  )
}
