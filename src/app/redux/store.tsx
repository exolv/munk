import { configureStore } from '@reduxjs/toolkit';
import trackedJobsSlice from './slices/trackedJobsSlice';

export const store = configureStore({
  reducer: {
    trackedJobs: trackedJobsSlice
  }
});