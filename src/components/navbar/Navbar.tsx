import React, { FC } from 'react';

import '../../styles.css';

export const Navbar: FC = () => {
  return (
    <div className='bg-white px-6 py-3 flex justify-between items-center rounded-b-xl drop-shadow-munk'>
      <div className='flex items-center'>
        <img src={chrome.runtime.getURL('assets/img/munk-icon.svg')} className='w-6 h-6' />
        <span className='font-poppins text-sm font-bold ml-2'>munk</span>
      </div>
      <div></div>
    </div>
  );
}