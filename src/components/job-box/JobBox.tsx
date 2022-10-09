import React, { FC, useState } from 'react';

import { TrackedJobStatus } from '../../interfaces/TrackedJobStatus';

import '../../styles.css';

export const JobBox: FC = () => {
  const { APPLIED, INTERVIEW, OFFER } = TrackedJobStatus;
  const [status, setStatus] = useState<TrackedJobStatus>(APPLIED);
  const changeStatus = () => {
    switch (status) {
      case APPLIED:
        setStatus(INTERVIEW);
      break;
      case INTERVIEW:
        setStatus(OFFER);
      break;
      case OFFER:
        setStatus(APPLIED);
      break;
    }
  }

  return (
    <div className='min-h-[100px] bg-white px-5 py-4 rounded-lg drop-shadow-munk'>
      <span className='font-poppins text-sm font-normal'>Junior Frontend Developer</span>
      <p className='font-poppins text-[13px] font-normal text-gray-400 mb-4'>Luxoft</p>
      <button
        className={`font-poppins rounded-[4px] text-white text-[11px] px-1.5 py-0.5 inline-block tracking-wide ${status === APPLIED ? 'bg-red-500' : (status === INTERVIEW ? 'bg-yellow-500' : 'bg-green-500')}`}
        onClick={() => changeStatus()}
      >{status}</button>
    </div>
  );
}