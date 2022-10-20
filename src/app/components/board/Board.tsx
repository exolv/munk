import React, { FC } from 'react';

import { useDrop } from 'react-dnd';

import {
  EllipsisHorizontalIcon
} from '@heroicons/react/24/outline';

import JobBox from '../../components/job-box/JobBox';
import TrackedJob from '../../../interfaces/TrackedJob';
import { BoardType } from '../../../interfaces/TrackedJobStatus';

const Board: FC<{ type: BoardType; title: string; jobs: TrackedJob[] }> = ({ type, title, jobs = [] }) => {
  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: 'JOB_BOX',
    drop: () => ({
      board: type
    }),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    })
  }));

  return (
    jobs &&
    <div className='bg-white p-5 rounded-xl mr-10 w-[calc(25%-30px)]'>
      <div className='flex items-center justify-between mb-4'>
        <h6 className='font-poppins font-medium text-sm'>{title} ({jobs.length})</h6>
        <EllipsisHorizontalIcon className='w-6 h-6 text-gray-400 cursor-pointer' />
      </div>
      <div
        ref={drop}
        className={`${canDrop && isOver ? 'bg-gray-50' : 'bg-white'} rounded-xl w-full min-h-[200px]`}
      >
        {
          jobs.length > 0 ?
            jobs.map((job, index)  => (
              <JobBox key={index} {...job} />
            ))
          :
            null
        }
      </div>
    </div>
  );
}

export default Board;