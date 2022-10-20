import { createSlice } from '@reduxjs/toolkit';

import storage from '../../../services/StorageService';

export const trackedJobsSlice = createSlice({
  name: 'trackedJobs',
  initialState: {
    value: []
  },
  reducers: {
    set: (state, action) => {
      state.value = action.payload;
    },
    add: (state, action) => {
      state.value.push(action.payload);
    },
    update: (state, action): any => {
      const index = state.value.findIndex(item => item.id === action.payload.id);
      const newState = [...state.value];
      newState[index] = action.payload;
      return {...state, value: newState};
    },
    remove: (state, action) => {
      state.value = state.value.filter((item: any) => item.id !== action.payload.id);
    }
  }
});

export const { set, add, update, remove } = trackedJobsSlice.actions;

export default trackedJobsSlice.reducer;

export const setInitialState = () => {
  return async (dispatch: any) => {
    try {
      const trackedJobs = await storage.getTrackedJobs();
      if (trackedJobs) {
        dispatch(set(trackedJobs));
      }
    } catch (error) {
      //
    }
  };
};