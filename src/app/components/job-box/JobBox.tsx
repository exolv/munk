import React, { FC } from 'react';
import { useDrag } from 'react-dnd';

import '../../../styles.css';

import {
  XMarkIcon
} from '@heroicons/react/24/outline';

import { useDispatch } from 'react-redux';
import { remove, update } from '../../redux/slices/trackedJobsSlice';

import storage from '../../../services/StorageService';
import TrackedJob from '../../../interfaces/TrackedJob';
import { BoardType } from '../../../interfaces/TrackedJobStatus';

const JobBox: FC<TrackedJob> = ({ id, companyImage, positionTitle, companyName, date }) => {
  const dispatch = useDispatch();

  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'JOB_BOX',
    item: {
      jobId: id
    },
    end: async (item, monitor) => {
      const { board }: { board: BoardType; } = monitor.getDropResult();
      if (item && board) {
        const updateTrackedJob = await storage.updateTrackedJob(item.jobId, {
          id,
          positionTitle,
          companyName,
          date,
          companyImage,
          board
        });
        if (updateTrackedJob) {
          dispatch(update({
            id,
            positionTitle,
            companyName,
            date,
            companyImage,
            board
          }));
        }
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
      handlerId: monitor.getHandlerId()
    })
  }));


  const removeTrackedJob = async () => {
    const removeTrackedJob = await storage.removeTrackedJob(id);
    if (removeTrackedJob) {
      dispatch(remove({ id: id }));
    }
  }

  return (
    <div
      ref={drag}
      className='relative overflow-hidden bg-white p-5 rounded-lg border border-solid border-gray-100 mt-4 cursor-pointer flex items-start'
    >
      <div className='w-4 h-4 cursor-pointer absolute top-4 right-4 flex items-center justify-center' onClick={() => removeTrackedJob()}>
        <XMarkIcon className='w-4 h-4 text-gray-400 cursor-pointer' />
      </div>
      <div className='w-10 h-10 overflow-hidden rounded-md mr-4 flex flex-shrink-0'>
        <img src={companyImage} alt={companyName} className='max-w-full' />
      </div>
      <div>
        <h4 className='font-poppins text-sm font-medium pr-5'>{positionTitle}</h4>
        <p className='font-poppins text-[12px] font-normal text-gray-600 mt-2'>{companyName}</p>
      </div>
    </div>
  );
}

export default JobBox;