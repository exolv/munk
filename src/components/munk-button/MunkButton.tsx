import React, { FC } from 'react';
import {
  PlusCircleIcon,
  StarIcon,
  CurrencyDollarIcon,
  ArrowTopRightOnSquareIcon,
  ChevronRightIcon
} from '@heroicons/react/24/outline';

import '../../styles.css';

export const MunkButton: FC<{id: number}> = ({ id }) => {
  return (
    <button className='group relative cursor-pointer'>
      <img src={chrome.runtime.getURL('assets/img/munk-icon.svg')} className='w-10 h-10 pb-2' />
      <div className='min-w-[180px] absolute top-10 -right-2 bg-white rounded-xl drop-shadow-munk z-50 hidden group-hover:!block'>
        <div className='w-4 h-4 transform rotate-45 absolute bg-white -top-1 right-[12px]'></div>
        <ul className='text-left overflow-hidden py-2'>
          <li className='px-5 py-2.5 hover:bg-gray-100 flex items-center justify-between'>
            <div className='flex items-center'>
              <PlusCircleIcon className='w-7 h-7 text-gray-500 mr-3' />
              <span className='font-poppins font-normal text-[12px] text-gray-500'>Adaugă</span>
            </div>
          </li>
          <li className='px-5 py-2.5 hover:bg-gray-100 flex items-center justify-between'>
            <div className='flex items-center'>
              <StarIcon className='w-7 h-7 text-gray-500 mr-3' />
              <span className='font-poppins font-normal text-[12px] text-gray-500'>Rating-uri</span>
            </div>
            <ChevronRightIcon className='w-5 h-5 text-gray-500 ml-3' />
          </li>
          <li className='px-5 py-2.5 hover:bg-gray-100 flex items-center justify-between'>
            <div className='flex items-center'>
              <CurrencyDollarIcon className='w-7 h-7 text-gray-500 mr-3' />
              <span className='font-poppins font-normal text-[12px] text-gray-500'>Salarii</span>
            </div>
            <ChevronRightIcon className='w-5 h-5 text-gray-500 ml-3' />
          </li>
          <li className='px-5 py-2.5 hover:bg-gray-100 flex items-center justify-between'>
            <div className='flex items-center'>
              <ArrowTopRightOnSquareIcon className='w-7 h-7 text-gray-500 mr-3' />
              <span className='font-poppins font-normal text-[12px] text-gray-500'>Undelucram.ro</span>
            </div>
          </li>
        </ul>
      </div>
    </button>
  );
}