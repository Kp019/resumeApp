import { configureStore } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import resumeReducer from './Reducer/ResumeSlice';
import resumeHistory from './Reducer/ResumeHistorySlice'
import userReducer from './Reducer/UserSlice';

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
};

const persistedReducer = persistReducer(persistConfig, resumeReducer);
const presistedResumeHistory = persistReducer(persistConfig, resumeHistory)
const persistedUserReducer = persistReducer(persistConfig, userReducer)

export const store = configureStore({
  reducer: {
    resumes: persistedReducer,
    resumeHistory: presistedResumeHistory,
    Users: persistedUserReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
