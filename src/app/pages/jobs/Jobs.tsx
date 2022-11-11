import React, { FC, useEffect, useState } from 'react';

import { 
  DndContext,
  DragOverlay,
  closestCorners,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors
} from '@dnd-kit/core';
import { sortableKeyboardCoordinates, arrayMove } from '@dnd-kit/sortable';

import { useSelector, useDispatch } from 'react-redux';

import Navbar from '../../components/navbar/Navbar';
import Sidebar from '../../components/sidebar/Sidebar';

import Board from '../../components/board/Board';
import { BoardType } from '../../../interfaces/TrackedJobStatus';
import TrackedJob from '../../../interfaces/TrackedJob';
import { setInitialState } from '../../redux/slices/trackedJobsSlice';
import JobBox from '../../components/job-box/JobBox';

const Jobs: FC = () => {
  const [trackedJobs, setTrackedJobs] = useState({
    TRACKING: [],
    APPLIED: [],
    INTERVIEWS: [],
    OFFERS: []
  });
  const [activeId, setActiveId] = useState();

  // Redux
  const dispatch = useDispatch<any>();
  const initialTrackedJobs = useSelector((state: any) => state.trackedJobs.value);
  
  useEffect(() => {
    dispatch(setInitialState());
  }, [dispatch]);

  useEffect(() => {
    setTrackedJobs({
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
  const findContainer = (id: any) => {
    if (id in trackedJobs) {
      return id;
    }

    return Object.keys(trackedJobs).find((board: BoardType) => trackedJobs[board].includes(id));
  }
  const handleDragStart = (event: any) => {
    const { active } = event;
    const { id } = active;

    setActiveId(id);
  }
  const handleDragOver = (event: any) => {
    const { active, over, draggingRect } = event;
    const { id } = active;
    const { id: overId } = over;

    const activeContainer: BoardType = findContainer(id);
    const overContainer: BoardType = findContainer(overId);

    if (
      !activeContainer ||
      !overContainer ||
      activeContainer === overContainer
    ) {
      return;
    }

    setTrackedJobs((prev: any) => {
      const activeItems = prev[activeContainer];
      const overItems = prev[overContainer];

      const activeIndex = activeItems.indexOf(id);
      const overIndex = overItems.indexOf(overId);

      let newIndex;
      if (overId in prev) {
        newIndex = overItems.length + 1;
      } else {
        const isBelowLastItem =
          over &&
          overIndex === overItems.length - 1 &&
          draggingRect?.offsetTop > over.rect?.offsetTop + over.rect.height;

        const modifier = isBelowLastItem ? 1 : 0;

        newIndex = overIndex >= 0 ? overIndex + modifier : overItems.length + 1;
      }

      return {
        ...prev,
        [activeContainer]: [
          ...prev[activeContainer].filter((item: any) => item !== active.id)
        ],
        [overContainer]: [
          ...prev[overContainer].slice(0, newIndex),
          trackedJobs[activeContainer][activeIndex],
          ...prev[overContainer].slice(newIndex, prev[overContainer].length)
        ]
      };
    });
  }
  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    const { id } = active;
    const { id: overId } = over;

    const activeContainer: BoardType = findContainer(id);
    const overContainer: BoardType = findContainer(overId);

    if (
      !activeContainer ||
      !overContainer ||
      activeContainer !== overContainer
    ) {
      return;
    }

    const activeIndex = trackedJobs[activeContainer].indexOf(active.id);
    const overIndex = trackedJobs[overContainer].indexOf(overId);

    if (activeIndex !== overIndex) {
      setTrackedJobs((items: any) => ({
        ...items,
        [overContainer]: arrayMove(items[overContainer], activeIndex, overIndex)
      }));
    }

    setActiveId(null);
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
              <Board type={BoardType.TRACKING} title='Joburi Salvate' jobs={trackedJobs.TRACKING} />
              <Board type={BoardType.APPLIED} title='Aplicări' jobs={trackedJobs.APPLIED} />
              <Board type={BoardType.INTERVIEWS} title='Interviuri' jobs={trackedJobs.INTERVIEWS} />
              <Board type={BoardType.OFFERS} title='Oferte' jobs={trackedJobs.OFFERS} />
              <DragOverlay>{activeId ? <JobBox id={activeId} active /> : null}</DragOverlay>
            </div>
          </div>
          </DndContext>
      </div>
    </div>
  );
}

export default Jobs;