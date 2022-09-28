import React, { FC } from 'react';
import { Status } from '../job-box/JobBox';

import '../../styles.css';

const logs = [
  {
    type: Status.OFFER,
    company: 'Greppy Systems',
    color: 'green',
    title: 'Ofertă primită - 6000 lei.',
    date: new Date()
  },
  {
    type: undefined,
    company: 'DevNest',
    color: 'cyan',
    title: 'Status modificat.',
    date: new Date()
  },
  {
    type: Status.INTERVIEW,
    company: 'DevNest',
    color: 'yellow',
    title: 'Interviu stabilit în 30 Septembrie.',
    date: new Date()
  }
];

export const Timeline: FC = () => {
  return (
    <div className='pt-20 px-6 pb-6 bg-gray-100'>
      <div className='timeline w-full h-full relative flex flex-col'>
        {
          logs.length > 0 ?
            logs.map((log, index)  => (
              <div key={index} className={`timeline-log timeline-log-color-${log.color} relative px-5 py-4 rounded-lg ml-6 mb-4 ${Object.values(Status).includes(log.type as Status) ? 'bg-white drop-shadow-munk' : ''}`}>
                <span className='font-poppins text-[12px] font-normal text-gray-400'>{new Intl.DateTimeFormat('ro-RO', { year: 'numeric', month: 'long', day: 'numeric'}).format(log.date)}</span>
                <h6 className='font-poppins text-sm font-normal mt-2 mb-1'>{log.title}</h6>
                <p className='font-poppins text-[13px] font-normal text-gray-400'>{log.company}</p>
              </div>
            ))
          :
            <p>No timeline logs.</p>
        }
      </div>
    </div>
  );
}