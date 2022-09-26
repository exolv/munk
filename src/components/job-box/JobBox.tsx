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
      <span className='font-poppins text-sm font-normal'>Junior Frontend Developer</span>
      <p className='font-poppins text-[13px] font-normal text-gray-400 mb-4'>Luxoft</p>
      <button
        className={`font-poppins rounded-[4px] text-white text-[11px] px-1.5 py-0.5 inline-block tracking-wide ${status === ASTEPTARE ? 'bg-red-500' : (status === INTERVIU ? 'bg-yellow-500' : 'bg-green-500')}`}
        onClick={() => changeStatus()}
      >{status}</button>
    </div>
  );
}