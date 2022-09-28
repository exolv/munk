import React, { FC } from 'react';
import {
  RectangleGroupIcon,
  CalendarIcon
} from '@heroicons/react/24/outline';

import '../../styles.css';

export const Navbar: FC = () => {
  return (
    <div className='fixed top-0 left-0 right-0 bg-white px-6 py-3 flex justify-between items-center rounded-b-xl drop-shadow-munk z-50'>
      <div className='flex items-center'>
        <img src={chrome.runtime.getURL('assets/img/munk-icon.svg')} className='w-6 h-6' />
        <span className='font-poppins text-sm font-bold ml-2'>munk</span>
      </div>
      <div className='flex items-center justify-end'>
        <div className='p-2 rounded-full hover:bg-gray-100 flex items-center justify-center cursor-pointer mr-2'>
          <CalendarIcon className='w-5 h-5 text-gray-500' />
        </div>
        <a href={chrome.runtime.getURL('app.html')} target='_blank' className='p-2 rounded-full hover:bg-gray-100 flex items-center justify-center'>
          <RectangleGroupIcon className='w-5 h-5 text-gray-500' />
        </a>
      </div>
    </div>
  );
}