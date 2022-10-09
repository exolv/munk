import React, { FC } from 'react';
import { Status } from '../job-box/JobBox';
import moment from 'moment';
moment.locale('ro');

import '../../styles.css';

const logs: any[] = [
  {
    type: Status.OFFER,
    company: 'Greppy Systems',
    color: 'green',
    title: 'Ofertă primită - 6000 lei.',
    date: new Date('2022-09-29')
  },
  {
    type: undefined,
    company: 'DevNest',
    color: 'cyan',
    title: 'Status modificat.',
    date: new Date('2022-10-01')
  },
  {
    type: Status.INTERVIEW,
    company: 'DevNest',
    color: 'yellow',
    title: 'Interviu stabilit în 30 Septembrie.',
    date: new Date('2022-10-04')
  },
  {
    type: Status.OFFER,
    company: 'Endava',
    color: 'green',
    title: 'Ofertă primită - 12000 lei.',
    date: new Date('2022-10-06')
  }
];

export const Timeline: FC = () => {
  return (
    <div className='pt-20 px-6 pb-6 bg-gray-100'>
      <div className='mb-6 flex justify-between items-center'>
        <h1 className='font-poppins font-normal text-xl'>Timeline</h1>
        <h6 className='font-poppins font-normal text-xs text-gray-400'>{moment().format('D MMMM, YYYY')}</h6>
      </div>
      <div className={`timeline ${logs.length > 0 ? 'has-logs' : ''} w-full h-full relative flex flex-col`}>
        {
          logs.length > 0 ?
            logs.map((log, index)  => (
              <div key={index} className={`timeline-log timeline-log-color-${log.color} relative px-5 py-4 rounded-lg ml-6 mb-4 ${Object.values(Status).includes(log.type as Status) ? 'bg-white drop-shadow-munk' : ''}`}>
                <span className='font-poppins text-xs font-normal text-gray-400'>{moment(log.date).format('D MMMM, YYYY')}</span>
                <h6 className='font-poppins text-sm font-normal mt-2 mb-1'>{log.title}</h6>
                <p className='font-poppins text-sm font-normal text-gray-400'>{log.company}</p>
              </div>
            ))
          :
            <p className='font-poppins font-normal text-sm text-gray-400'>No timeline logs.</p>
        }
      </div>
    </div>
  );
}