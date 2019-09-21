import React, {useState, useEffect} from 'react';

export function Recordpanel(props) {
  const [time, setTime] = useState('00:00');
  //let time = '00:00';
  useEffect(() => {
    if(props.status === 'process') {
    setTimeout(() => {
      const arr = time.split(':');
      let min = arr[0], sec = arr[1];
      if(sec.charAt(1) === '9') {
        if(sec.charAt(0) === '5') {
          if(min.charAt(1) === '9') {
            if(min.charAt(0) === '9') alert('time out');
            else {
              sec = '00';
              min = parseInt(min.charAt(0)) + 1 + '0';
              setTime(min + ':' + sec);
              //time = min + ':' + sec;
            }
          }
          else {
            sec = '00';
            min = min.charAt(0) + (parseInt(min.charAt(1)) + 1);
            setTime(min + ':' + sec);
            //time = min + ':' + sec;
          }
        }
        else {
          sec = parseInt(sec.charAt(0)) + 1 + '0';
          setTime(min + ':' + sec);
          //time = min + ':' + sec;
        }
      }
      else {
        sec = sec.charAt(0) + (parseInt(sec.charAt(1)) + 1);
        setTime(min + ':' + sec);
        //time = min + ':' + sec;
      }
    }, 1000)
  }
  })

  return (
    <div className='record_panel'>
      <div>{time}</div>
    </div>
  )
}
