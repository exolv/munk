import React, { FC } from 'react';

import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';

import {
  EllipsisHorizontalIcon
} from '@heroicons/react/24/outline';

import JobBox from '../../components/job-box/JobBox';
import TrackedJob from '../../../interfaces/TrackedJob';
import { BoardType } from '../../../interfaces/TrackedJobStatus';

const Board: FC<{ type: BoardType; title: string; jobs: number[] }> = ({ type, title, jobs = [] }) => {
  const { isOver, setNodeRef } = useDroppable({
    id: type
  });

  return (
    jobs &&
    <div className='bg-white p-5 rounded-xl mr-10 w-[calc(25%-30px)]'>
      <div className='flex items-center justify-between mb-4'>
        <h6 className='font-poppins font-medium text-sm'>{title} ({jobs.length})</h6>
        <EllipsisHorizontalIcon className='w-6 h-6 text-gray-400 cursor-pointer' />
      </div>

      <SortableContext
        id={type} 
        items={jobs} 
        strategy={verticalListSortingStrategy}
      >
        <div
          ref={setNodeRef}
          className={`${isOver ? 'bg-gray-50' : 'bg-white'} rounded-xl w-full min-h-[200px]`}
        >
          {
            jobs.length > 0 ?
              jobs.map((id, index) => (
                <JobBox key={index} id={id} />
              ))
            :
              null
          }
        </div>
      </SortableContext>
    </div>
  );
}

export default Board;