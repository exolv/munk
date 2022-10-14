import React, { FC, SetStateAction, useEffect, useState } from 'react';

import moment from 'moment';
moment.locale('ro');

import '../../styles.css';

import { TrackedJobStatus } from '../../interfaces/TrackedJobStatus';
import storage from '../../services/StorageService';
import TimelineLog from '../../interfaces/TimelineLog';

const Timeline: FC = () => {
  const [timelineLogs, setTimelineLogs] = useState<TimelineLog[]>([]);
  useEffect(() => {
    (async () => {
      const trackedJobs: any = await storage.getTimelineLogs();
      if (trackedJobs) {
        setTimelineLogs(trackedJobs);
      }
    })();
  }, []);

  const timelineLogColor = (status: TrackedJobStatus): string => {
    switch (status) {
      case TrackedJobStatus.APPLIED:
        return 'red';
      case TrackedJobStatus.INTERVIEW:
        return 'yellow';
      case TrackedJobStatus.OFFER:
        return 'green';
      case TrackedJobStatus.TRACKING:
        return 'cyan';
      default:
        return 'gray';
    }
  }

  return (
    <div className='pt-20 px-6 pb-6 bg-gray-100'>
      <div className='mb-6 flex justify-between items-center'>
        <h1 className='font-poppins font-normal text-xl'>Activitate</h1>
        <h6 className='font-poppins font-normal text-xs text-gray-400'>{moment().format('D MMMM, YYYY')}</h6>
      </div>
      <div className={`timeline ${timelineLogs.length > 0 ? 'has-logs' : ''} w-full h-full relative flex flex-col`}>
        {
          timelineLogs.length > 0 ?
            timelineLogs.map((log, index)  => (
              <div key={index} className={`timeline-log timeline-log-color-${timelineLogColor(log.status)} relative px-5 py-4 rounded-lg ml-6 mb-4 ${Object.values(TrackedJobStatus).includes(log.status as TrackedJobStatus) ? 'bg-white drop-shadow-munk' : ''}`}>
                <span className='font-poppins text-xs font-normal text-gray-400'>{moment(log.date).format('D MMMM, YYYY')}</span>
                <a href={chrome.runtime.getURL('app.html')} target='_blank'>
                  <h6 className='font-poppins text-sm font-normal mt-2 mb-1'>{log.title}</h6>
                </a>
                <p className='font-poppins text-sm font-normal text-gray-400'>{log.companyName}</p>
              </div>
            ))
          :
            <p className='font-poppins font-normal text-sm text-gray-400'>Nu sunt log-uri. Începe să urmărești un job pentru a-l adăuga aici.</p>
        }
      </div>
    </div>
  );
}

export default Timeline;