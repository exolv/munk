import React, { FC, useEffect, useState } from 'react';

import { 
  DndContext,
  DragOverlay,
  closestCorners,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragStartEvent,
  DragOverEvent,
  DragEndEvent
} from '@dnd-kit/core';
import { sortableKeyboardCoordinates, arrayMove } from '@dnd-kit/sortable';

import { useSelector, useDispatch } from 'react-redux';
import { update } from '../../redux/slices/trackedJobsSlice';

import Navbar from '../../components/navbar/Navbar';
import Sidebar from '../../components/sidebar/Sidebar';

import Board from '../../components/board/Board';
import { BoardType, TrackedJobStatus } from '../../../interfaces/TrackedJobStatus';
import TrackedJob from '../../../interfaces/TrackedJob';
import { setInitialState } from '../../redux/slices/trackedJobsSlice';
import JobBox from '../../components/job-box/JobBox';
import storage from '../../../services/StorageService';

interface TrackedJobsIds {
  TRACKING: number[],
  APPLIED: number[],
  INTERVIEWS: number[],
  OFFERS: number[]
}

const Jobs: FC = () => {
  const [trackedJobsIds, setTrackedJobsIds] = useState<TrackedJobsIds | any>({
    TRACKING: [],
    APPLIED: [],
    INTERVIEWS: [],
    OFFERS: []
  });
  const [activeTrackedJobId, setActiveTrackedJobId] = useState<number | null>();

  // Redux
  const dispatch = useDispatch<any>();
  const initialTrackedJobs = useSelector((state: any) => state.trackedJobs.value);
  
  useEffect(() => {
    dispatch(setInitialState());
  }, [dispatch]);

  useEffect(() => {
    setTrackedJobsIds({
      TRACKING: initialTrackedJobs?.filter((job: TrackedJob) => job.board === BoardType.TRACKING).map((job: TrackedJob) => job.id),
      APPLIED: initialTrackedJobs?.filter((job: TrackedJob) => job.board === BoardType.APPLIED).map((job: TrackedJob) => job.id),
      INTERVIEWS: initialTrackedJobs?.filter((job: TrackedJob) => job.board === BoardType.INTERVIEWS).map((job: TrackedJob) => job.id),
      OFFERS: initialTrackedJobs?.filter((job: TrackedJob) => job.board === BoardType.OFFERS).map((job: TrackedJob) => job.id)
    });
    
  }, [initialTrackedJobs]);


  // Drag & Drop
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates
    })
  );
  const findContainer = (id: number): any => {
    if (id in trackedJobsIds) {
      return id;
    }

    return Object.keys(trackedJobsIds).find((board: BoardType) => trackedJobsIds[board].includes(id));
  }
  const handleDragStart = (event: DragStartEvent | any) => {
    const { active } = event;
    const { id } = active;

    setActiveTrackedJobId(id);
  }
  const handleDragOver = (event: DragOverEvent | any) => {
    const { active, over, draggingRect } = event;
    const { id } = active;
    const { id: overId } = over;

    const activeBoard = findContainer(id);
    const overBoard = findContainer(overId);

    if (!activeBoard || !overBoard || activeBoard === overBoard) {
      return;
    }

    setTrackedJobsIds((prev: TrackedJobsIds | any) => {
      const activeTrackedJobsIds = prev[activeBoard];
      const overTrackedJobsIds = prev[overBoard];

      const activeIndex = activeTrackedJobsIds.indexOf(id);
      const overIndex = overTrackedJobsIds.indexOf(overId);

      let newIndex;
      if (overId in prev) {
        newIndex = overTrackedJobsIds.length + 1;
      } else {
        const isBelowLastItem = over && overIndex === overTrackedJobsIds.length - 1 && draggingRect?.offsetTop > over.rect?.offsetTop + over.rect.height;
        const modifier = isBelowLastItem ? 1 : 0;

        newIndex = overIndex >= 0 ? overIndex + modifier : overTrackedJobsIds.length + 1;
      }

      return {
        ...prev,
        [activeBoard]: [
          ...prev[activeBoard].filter((trackedJobsId: any) => trackedJobsId !== active.id)
        ],
        [overBoard]: [
          ...prev[overBoard].slice(0, newIndex),
          trackedJobsIds[activeBoard][activeIndex],
          ...prev[overBoard].slice(newIndex, prev[overBoard].length)
        ]
      };
    });
  }
  const handleDragEnd = async (event: DragEndEvent | any) => {
    const { active, over } = event;
    const { id } = active;
    const { id: overId } = over;

    const activeBoard = findContainer(id);
    const overBoard = findContainer(overId);

    if (!activeBoard || !overBoard || activeBoard !== overBoard) {
      return;
    }

    const activeIndex = trackedJobsIds[activeBoard].indexOf(active.id);
    const overIndex = trackedJobsIds[overBoard].indexOf(overId);

    if (activeIndex !== overIndex) {
      setTrackedJobsIds((trackedJobsIds: TrackedJobsIds | any) => ({
        ...trackedJobsIds,
        [overBoard]: arrayMove(trackedJobsIds[overBoard], activeIndex, overIndex)
      }));
    } else {
      const trackedJob: any = await storage.getTrackedJob(id);
      if (trackedJob) {
        const updateTrackedJob = await storage.updateTrackedJob(id, {
          ...trackedJob,
          board: overBoard as BoardType
        });
        if (updateTrackedJob) {
          dispatch(update({
            ...trackedJob,
            board: overBoard as BoardType
          }));

          switch (overBoard as BoardType) {
            case BoardType.INTERVIEWS:
              await storage.addTimelineLog({
                positionTitle: trackedJob.positionTitle,
                companyName: trackedJob.companyName,
                date: new Date().toISOString(),
                status: TrackedJobStatus.INTERVIEW,
                title: `Interviu stabilit la ${trackedJob.companyName} pe data de [DATE].`
              });
              break;
          }
        }
      }
    }

    setActiveTrackedJobId(null);
  }

  
  return (
    <div className='flex'>
      <Sidebar active='jobs' />
      <div className='bg-gray-100 w-full min-h-screen'>
        <Navbar title='Joburi' />

        <DndContext 
          sensors={sensors}
          collisionDetection={closestCorners}
          onDragStart={handleDragStart}
          onDragOver={handleDragOver}
          onDragEnd={handleDragEnd}
        >
          <div className='pl-32 pr-20 py-24'>
            <div className='flex items-start'>
              <Board type={BoardType.TRACKING} title='Joburi Salvate' jobs={trackedJobsIds.TRACKING} />
              <Board type={BoardType.APPLIED} title='Aplicări' jobs={trackedJobsIds.APPLIED} />
              <Board type={BoardType.INTERVIEWS} title='Interviuri' jobs={trackedJobsIds.INTERVIEWS} />
              <Board type={BoardType.OFFERS} title='Oferte' jobs={trackedJobsIds.OFFERS} />
              <DragOverlay>{activeTrackedJobId ? <JobBox id={activeTrackedJobId} /> : null}</DragOverlay>
            </div>
          </div>
          </DndContext>
      </div>
    </div>
  );
}

export default Jobs;