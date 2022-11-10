import React, { FC, useEffect, useState } from 'react';

import { useSelector, useDispatch } from 'react-redux';

import Navbar from '../../components/navbar/Navbar';
import Sidebar from '../../components/sidebar/Sidebar';

import Board from '../../components/board/Board';
import { BoardType } from '../../../interfaces/TrackedJobStatus';
import TrackedJob from '../../../interfaces/TrackedJob';
import { setInitialState } from '../../redux/slices/trackedJobsSlice';

const Jobs: FC = () => {
  const dispatch = useDispatch<any>();
  const trackedJobs = useSelector((state: any) => state.trackedJobs.value);

  useEffect(() => {
    dispatch(setInitialState());
  }, [dispatch]);
  
  const { TRACKING, APPLIED, INTERVIEWS, OFFERS } = BoardType;

  return (
    <div className='flex'>
      <Sidebar active='jobs' />
      <div className='bg-gray-100 w-full min-h-screen'>
        <Navbar title='Joburi' />

        <div className='pl-32 pr-20 py-24'>
          <div className='flex items-start'>
            <Board type={TRACKING} title='Joburi Salvate' jobs={trackedJobs?.filter((job: TrackedJob) => job.board === TRACKING)} />
            <Board type={APPLIED} title='Aplicări' jobs={trackedJobs?.filter((job: TrackedJob) => job.board === APPLIED)} />
            <Board type={INTERVIEWS} title='Interviuri' jobs={trackedJobs?.filter((job: TrackedJob) => job.board === INTERVIEWS)} />
            <Board type={OFFERS} title='Oferte' jobs={trackedJobs?.filter((job: TrackedJob) => job.board === OFFERS)} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Jobs;