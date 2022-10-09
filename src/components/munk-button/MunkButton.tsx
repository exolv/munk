import React, { FC, useEffect, useState } from 'react';
import {
  PlusCircleIcon,
  StarIcon,
  CurrencyDollarIcon,
  ArrowTopRightOnSquareIcon,
  ChevronRightIcon
} from '@heroicons/react/24/outline';

import '../../styles.css';

import storage from '../../services/StorageService';
import { TrackedJobStatus } from '../../interfaces/TrackedJobStatus';

enum TrackBtnState {
  DEFAULT = 'Urmărește',
  TRACKING = 'Urmărit'
}

const MunkButton: FC<{id: number}> = ({ id }) => {
  const [trackBtnState, setTrackBtnState] = useState<TrackBtnState>(TrackBtnState.DEFAULT);

  useEffect(() => {
    (async () => {
      const getTrackedJob = await storage.getTrackedJob(id);
      if (getTrackedJob) {
        setTrackBtnState(TrackBtnState.TRACKING);
      }
    })();
  }, []);

  const trackJob = async () => {
    const element: Element = document.querySelector(`.job-card-container[data-job-id='${id}']`);
    if (element) {
      let companyName: Element | string = element.querySelector('.job-card-container__company-name');
      let positionTitle: Element | string = element.querySelector('.job-card-list__title');
      if (companyName && positionTitle) {
        companyName = companyName.textContent.trim().replace(/\n/g, '');
        positionTitle = positionTitle.textContent.trim().replace(/\n/g, '');

        const addTrackedJob: any = await storage.addTrackedJob({
          id: id,
          positionTitle: positionTitle,
          companyName: companyName,
          date: new Date()
        });
        if (addTrackedJob) {
          setTrackBtnState(TrackBtnState.TRACKING);
          await storage.addTimelineLog({
            positionTitle: positionTitle,
            companyName: companyName,
            date: new Date(),
            status: TrackedJobStatus.TRACKING,
            title: `Urmărești jobul ${positionTitle}.`
          });
        }
      }
    }
  }

  return (
    <button className='group relative cursor-pointer'>
      <img src={chrome.runtime.getURL('assets/img/munk-icon.svg')} className='w-10 h-10 pb-2' />
      <div className='min-w-[180px] absolute top-10 -right-2 bg-white rounded-xl drop-shadow-munk z-50 hidden group-hover:!block'>
        <div className='w-4 h-4 transform rotate-45 absolute bg-white -top-1 right-[12px] -z-10'></div>
        <ul className='text-left overflow-hidden py-2'>
          <li className='px-5 py-2.5 hover:bg-gray-100 flex items-center justify-between' onClick={() => trackBtnState === TrackBtnState.DEFAULT && trackJob()}>
            <div className='flex items-center'>
              <PlusCircleIcon className={`w-7 h-7 ${trackBtnState === TrackBtnState.TRACKING ? 'text-gray-400' : 'text-gray-500'} mr-3`} />
              <span className={`font-poppins font-normal text-[12px] ${trackBtnState === TrackBtnState.TRACKING ? 'text-gray-400' : 'text-gray-500'}`}>{trackBtnState}</span>
            </div>
          </li>
          <li className='px-5 py-2.5 hover:bg-gray-100 flex items-center justify-between'>
            <div className='flex items-center'>
              <StarIcon className='w-7 h-7 text-gray-500 mr-3' />
              <span className='font-poppins font-normal text-[12px] text-gray-500'>Rating-uri</span>
            </div>
            <ChevronRightIcon className='w-5 h-5 text-gray-500 ml-3' />
          </li>
          <li className='px-5 py-2.5 hover:bg-gray-100 flex items-center justify-between'>
            <div className='flex items-center'>
              <CurrencyDollarIcon className='w-7 h-7 text-gray-500 mr-3' />
              <span className='font-poppins font-normal text-[12px] text-gray-500'>Salarii</span>
            </div>
            <ChevronRightIcon className='w-5 h-5 text-gray-500 ml-3' />
          </li>
          <li className='px-5 py-2.5 hover:bg-gray-100 flex items-center justify-between'>
            <div className='flex items-center'>
              <ArrowTopRightOnSquareIcon className='w-7 h-7 text-gray-500 mr-3' />
              <span className='font-poppins font-normal text-[12px] text-gray-500'>Undelucram.ro</span>
            </div>
          </li>
        </ul>
      </div>
    </button>
  );
}

export default MunkButton;