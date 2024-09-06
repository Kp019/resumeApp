import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ResumeData {
  sections: [];
  filename: string;
  jobTitle: string;
  Date: string;
  user: string;
  text: string;
  score: number;
}

interface ResumeState {
  data: ResumeData[];
  loading: boolean;
  error: string | null;
}

const initialState: ResumeState = {
  data: [],
  loading: false,
  error: null,
};

const resumeSlice = createSlice({
  name: 'resumes',
  initialState,
  reducers: {
    saveData: (state, action: PayloadAction<ResumeData[]>) => {
      state.data = action.payload;
    },
  },
});

export const { saveData } = resumeSlice.actions;

export default resumeSlice.reducer;
