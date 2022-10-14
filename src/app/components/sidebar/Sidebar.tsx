import React, { FC } from 'react';

import '../../../styles.css';

import {
  RectangleGroupIcon,
  UsersIcon,
  CalendarIcon,
  Cog8ToothIcon
} from '@heroicons/react/24/outline';

import {
  Link
} from 'react-router-dom';

const Sidebar: FC<{ active: string; }> = ({ active }) => {
  return (
    <div className='fixed top-0 left-0 bottom-0 z-50 bg-[#0061ff] w-16 min-h-screen py-5 flex items-center flex-col'>
      <img src={chrome.runtime.getURL('assets/img/munk-icon-white.svg')} className='w-6 h-6 mb-16' />
      <Link to='/app.html'>
        <div className={`${active === 'jobs' ? 'bg-[#025aea]' : 'bg-[#1972ff]'} hover:bg-[#025aea] transition-colors ease-linear duration-150 w-8 h-8 rounded-lg flex justify-center items-center cursor-pointer mb-8`}>
          <RectangleGroupIcon className='w-5 h-5 text-white' />
        </div>
      </Link>
      <Link to='/app.html/contacts'>
        <div className={`${active === 'contacts' ? 'bg-[#025aea]' : 'bg-[#1972ff]'} hover:bg-[#025aea] transition-colors ease-linear duration-150 w-8 h-8 rounded-lg flex justify-center items-center cursor-pointer mb-8`}>
          <UsersIcon className='w-5 h-5 text-white' />
        </div>
      </Link>
      <Link to='/app.html/calendar'>
        <div className={`${active === 'calendar' ? 'bg-[#025aea]' : 'bg-[#1972ff]'} hover:bg-[#025aea] transition-colors ease-linear duration-150 w-8 h-8 rounded-lg flex justify-center items-center cursor-pointer mb-8`}>
          <CalendarIcon className='w-5 h-5 text-white' />
        </div>
      </Link>
      <Link to='/app.html/settings'>
        <div className={`${active === 'settings' ? 'bg-[#025aea]' : 'bg-[#1972ff]'} hover:bg-[#025aea] transition-colors ease-linear duration-150 w-8 h-8 rounded-lg flex justify-center items-center cursor-pointer mb-8`}>
          <Cog8ToothIcon className='w-5 h-5 text-white' />
        </div>
      </Link>
    </div>
  );
}

export default Sidebar;