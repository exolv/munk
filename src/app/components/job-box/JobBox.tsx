import React, { FC, useEffect, useState } from 'react';

import '../../../styles.css';

import {
  XMarkIcon
} from '@heroicons/react/24/outline';

import { useDispatch } from 'react-redux';
import { remove } from '../../redux/slices/trackedJobsSlice';

import storage from '../../../services/StorageService';
import TrackedJob from '../../../interfaces/TrackedJob';

const JobBox: FC<{ id: number }> = ({ id }) => {
  const [trackedJob, setTrackedJob] = useState<TrackedJob>();

  useEffect(() => {
    (async () => {
      const getTrackedJob: any = await storage.getTrackedJob(id);
      if (getTrackedJob) {
        setTrackedJob(getTrackedJob);
      }
    })();
  }, [trackedJob]);

  const dispatch = useDispatch();

  const removeTrackedJob = async () => {
    const removeTrackedJob = await storage.removeTrackedJob(id);
    if (removeTrackedJob) {
      dispatch(remove({ id: id }));
      await storage.addTimelineLog({
        positionTitle: trackedJob?.positionTitle,
        companyName: trackedJob?.companyName,
        date: new Date().toISOString(),
        status: null,
        title: `Ai șters jobul ${trackedJob?.positionTitle}.`
      });
    }
  }

  return (
    <div className={`relative overflow-hidden bg-white p-5 rounded-lg border border-solid border-gray-100 mt-4 flex items-start cursor-grab transition-all ease-in-out`}>
      <div className='w-4 h-4 cursor-pointer absolute top-4 right-4 flex items-center justify-center' onClick={() => removeTrackedJob()}>
        <XMarkIcon className='w-4 h-4 text-gray-400 cursor-pointer' />
      </div>
      <div className='w-10 h-10 overflow-hidden rounded-md mr-4 flex flex-shrink-0'>
        <img src={trackedJob?.companyImage} alt={trackedJob?.companyName} className='max-w-full' />
      </div>
      <div>
        <h4 className='font-poppins text-sm font-medium pr-5'>{trackedJob?.positionTitle}</h4>
        <p className='font-poppins text-[12px] font-normal text-gray-600 mt-2'>{trackedJob?.companyName}</p>
      </div>
    </div>
  );
}

export default JobBox;