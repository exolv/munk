import React, { FC, useState } from 'react';

import '../../styles.css';

enum Status {
  ASTEPTARE = 'Așteptare',
  INTERVIU = 'Interviu',
  ACCEPTAT = 'Acceptat'
}

export const JobBox: FC = () => {
  const { ASTEPTARE, INTERVIU, ACCEPTAT } = Status;
  const [status, setStatus] = useState<Status>(ASTEPTARE);
  const changeStatus = () => {
    switch (status) {
      case ASTEPTARE:
        setStatus(INTERVIU);
      break;
      case INTERVIU:
        setStatus(ACCEPTAT);
      break;
      case ACCEPTAT:
        setStatus(ASTEPTARE);
      break;
    }
  }

  return (
    <div className='min-h-[100px] bg-white p-4 rounded-lg drop-shadow-munk'>
      <span className='font-poppins text-[15px] font-normal'>Frontend Developer</span>
      <p className='font-poppins text-sm font-normal text-gray-400 mb-4'>Luxoft</p>
      <button
        className={`font-poppins rounded-[4px] text-white text-xs px-1 py-0.5 inline-block tracking-wide ${status === ASTEPTARE ? 'bg-red-500' : (status === INTERVIU ? 'bg-yellow-500' : 'bg-green-500')}`}
        onClick={() => changeStatus()}
      >{status}</button>
    </div>
  );
}