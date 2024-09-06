import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ResumeData } from './ResumeSlice';

interface ResumeHistoryState {
  history: ResumeData[];
  flatHistory: ResumeData[];
}

const initialState: ResumeHistoryState = {
  history: [],
  flatHistory: [],
};

const flattenObjects = (nestedObjects: ResumeData[][]): ResumeData[] => {
  return nestedObjects.reduce((acc, current) => acc.concat(current), []);
};

const resumeHistorySlice = createSlice({
  name: 'resumeHistory',
  initialState,
  reducers: {
    addToHistory: (state, action: PayloadAction<ResumeData[]>) => {
      state.history.push(action.payload);
      state.flatHistory = flattenObjects([...state.history]);
    },
  },
});

export const { addToHistory } = resumeHistorySlice.actions;

export const serializeHistory = (state: ResumeHistoryState) => {
  return JSON.stringify(state.flatHistory);
};

export default resumeHistorySlice.reducer;