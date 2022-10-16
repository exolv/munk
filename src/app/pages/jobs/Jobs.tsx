import React, { FC, useState, useEffect } from 'react';

import Navbar from '../../components/navbar/Navbar';
import Sidebar from '../../components/sidebar/Sidebar';

import storage from '../../../services/StorageService';
import TrackedJob from '../../../interfaces/TrackedJob';
import Board from '../../components/board/Board';
import { BoardType } from '../../../interfaces/TrackedJobStatus';

const Jobs: FC = () => {
  const [trackedJobs, setTrackedJobs] = useState<TrackedJob[]>([]);
  useEffect(() => {
    (async () => {
      const trackedJobs: any = await storage.getTrackedJobs();
      if (trackedJobs) {
        setTrackedJobs(trackedJobs);
      }
    })();
  }, []);
  
  const { TRACKING, APPLIED, INTERVIEWS, OFFERS } = BoardType;

  return (
    <div className='flex'>
      <Sidebar active='jobs' />
      <div className='bg-gray-100 w-full min-h-screen'>
        <Navbar title='Job-uri' />

        <div className='pl-32 pr-20 py-24'>
          <div className='flex items-start'>
            <Board type={TRACKING} title='Job-uri Salvate' jobs={trackedJobs} />
            <Board type={APPLIED} title='Aplicări' jobs={[]} />
            <Board type={INTERVIEWS} title='Interviuri' jobs={[]} />
            <Board type={OFFERS} title='Oferte' jobs={[]} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Jobs;