import React, { FC, useState, useEffect } from 'react';

import {
  EllipsisHorizontalIcon
} from '@heroicons/react/24/outline';

import Navbar from '../../components/navbar/Navbar';
import Sidebar from '../../components/sidebar/Sidebar';
import JobBox from '../../components/job-box/JobBox';

import storage from '../../../services/StorageService';
import TrackedJob from '../../../interfaces/TrackedJob';

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
  
  
  return (
    <div className='flex'>
      <Sidebar active='jobs' />
      <div className='bg-gray-100 w-full min-h-screen'>
        <Navbar title='Job-uri' />

        <div className='pl-32 pr-20 py-24'>
          <div className='flex'>

            <div className='bg-white p-5 rounded-xl mr-10 w-[calc(25%-30px)] min-h-[300px]'>
              <div className='flex items-center justify-between'>
                <h6 className='font-poppins font-medium text-sm'>Job-uri Salvate ({trackedJobs.length})</h6>
                <EllipsisHorizontalIcon className='w-6 h-6 text-gray-400 cursor-pointer' />
              </div>
              <div>
                {
                  trackedJobs.length > 0 ?
                    trackedJobs.map((job, index)  => (
                      <JobBox key={index} {...job} />
                    ))
                  :
                    <p className='font-poppins font-normal text-xs text-gray-400 mt-4'>Nu ai vreun job urmărit.</p>
                }
              </div>
            </div>

            <div className='bg-white p-5 rounded-xl mr-10 w-[calc(25%-30px)] min-h-[300px]'>
              <div className='flex items-center justify-between'>
                <h6 className='font-poppins font-medium text-sm'>Aplicări</h6>
                <EllipsisHorizontalIcon className='w-6 h-6 text-gray-400 cursor-pointer' />
              </div>
              <div>
                //
              </div>
            </div>

            <div className='bg-white p-5 rounded-xl mr-10 w-[calc(25%-30px)] min-h-[300px]'>
              <div className='flex items-center justify-between'>
                <h6 className='font-poppins font-medium text-sm'>Interviuri</h6>
                <EllipsisHorizontalIcon className='w-6 h-6 text-gray-400 cursor-pointer' />
              </div>
              <div>
                //
              </div>
            </div>

            <div className='bg-white p-5 rounded-xl w-[calc(25%-30px)] min-h-[300px]'>
              <div className='flex items-center justify-between'>
                <h6 className='font-poppins font-medium text-sm'>Oferte</h6>
                <EllipsisHorizontalIcon className='w-6 h-6 text-gray-400 cursor-pointer' />
              </div>
              <div>
                //
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default Jobs;