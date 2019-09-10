import React, { useState } from 'react';
import { Boxpanel } from './Boxpanel';
import { Recordpanel } from './Recordpanel';

export function Board() {
  return (
    <div className='board'>
      <div><Recordpanel /></div>
      <div><Boxpanel /></div>
    </div>
  )
}
