import React, { FC } from 'react';
import {
  InformationCircleIcon
} from '@heroicons/react/24/outline';

import SalaryData from '../../interfaces/SalaryData';

import '../../styles.css';

const Salary: FC<SalaryData> = ({ range }) => {
  const rangeMiddle: number = range.max ? Math.floor((range.min + range.max) / 2) : range.min;

  return (
    <div className='pr-3 flex items-center justify-end'>
      <span className='text-white text-[14px]'>
        {
          range.max ?
            `${range.min} - ${range.max} lei`
          :
            `${range.min} lei`
        }
      </span>
      <div className='ml-3 group relative'>
        <InformationCircleIcon className='w-7 h-7 text-white' />
        <div className='min-w-[200px] absolute top-9 -right-2 bg-white rounded-xl drop-shadow-munk z-50 hidden group-hover:!block'>
          <div className='w-4 h-4 transform rotate-45 absolute bg-white -top-1 right-[9px] -z-10'></div>
          <div className='px-6 py-5'>
            <p className='font-poppins font-normal text-gray-500 text-[12px] text-left'>Estimare în baza cuvintelor cheie din titlul job-ului.</p>
          </div>
          <div className='px-6 py-5 border-t border-solid border-gray-200'>
            <div className='flex items-center justify-between'>
              <div className='bg-red-400 h-7 rounded-md w-2'></div>
              <div className='bg-orange-400 h-7 rounded-md w-2'></div>
              <div className='bg-amber-400 h-7 rounded-md w-2'></div>
              <div className='bg-yellow-400 h-7 rounded-md w-2'></div>
              <div className='bg-lime-400 h-7 rounded-md w-2'></div>
              <div className='bg-green-400 h-7 rounded-md w-2'></div>
              <div className='bg-emerald-400 h-7 rounded-md w-2'></div>
              <div className='bg-teal-400 h-7 rounded-md w-2'></div>
              <div className='bg-cyan-400 !bg-gray-200 h-7 rounded-md w-2'></div>
              <div className='bg-sky-400 !bg-gray-200 h-7 rounded-md w-2'></div>
              <div className='bg-blue-400 !bg-gray-200 h-7 rounded-md w-2'></div>
            </div>
            <div className='flex justify-between mt-2'>
              <div className='flex flex-col justify-start text-left'>
                <span className='font-poppins font-normal text-[10px] text-gray-400'>min</span>
                <p className='font-poppins font-normal text-[12px] text-black leading-tight'>3500 lei</p>
              </div>
              <div className='flex flex-col justify-end text-right'>
                <span className='font-poppins font-normal text-[10px] text-gray-400'>max</span>
                <p className='font-poppins font-normal text-[12px] text-black leading-tight'>15500 lei</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Salary;