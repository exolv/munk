import React, { FC, useEffect, useState } from 'react';

import '../../../styles.css';

import {
  XMarkIcon
} from '@heroicons/react/24/outline';

import { useDispatch } from 'react-redux';
import { remove, update } from '../../redux/slices/trackedJobsSlice';

import storage from '../../../services/StorageService';
import TrackedJob from '../../../interfaces/TrackedJob';

const JobBox: FC<{ id: number, active?: boolean }> = ({ id, active = false }) => {
  const [job, setJob] = useState<TrackedJob>();

  const fetchJob = async () => {
    const getTrackedJob: any = await storage.getTrackedJob(id);
    if (getTrackedJob) {
      setJob(getTrackedJob);
    }
  }
  useEffect(() => {
    fetchJob();
  }, [job]);

  const dispatch = useDispatch();

  const removeTrackedJob = async () => {
    const removeTrackedJob = await storage.removeTrackedJob(id);
    if (removeTrackedJob) {
      dispatch(remove({ id: id }));
      await storage.addTimelineLog({
        positionTitle: job?.positionTitle,
        companyName: job?.companyName,
        date: new Date().toISOString(),
        status: null,
        title: `Ai șters jobul ${job?.positionTitle}.`
      });
    }
  }

  return (
    <div className={`relative overflow-hidden bg-white p-5 rounded-lg border border-solid border-gray-100 mt-4 flex items-start cursor-grab transition-all ease-in-out ${active ? '' : ''}`}>
      <div className='w-4 h-4 cursor-pointer absolute top-4 right-4 flex items-center justify-center' onClick={() => removeTrackedJob()}>
        <XMarkIcon className='w-4 h-4 text-gray-400 cursor-pointer' />
      </div>
      <div className='w-10 h-10 overflow-hidden rounded-md mr-4 flex flex-shrink-0'>
        <img src={job?.companyImage} alt={job?.companyName} className='max-w-full' />
      </div>
      <div>
        <h4 className='font-poppins text-sm font-medium pr-5'>{job?.positionTitle}</h4>
        <p className='font-poppins text-[12px] font-normal text-gray-600 mt-2'>{job?.companyName}</p>
      </div>
    </div>
  );
}

export default JobBox;