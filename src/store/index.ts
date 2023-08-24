import { configureStore } from '@reduxjs/toolkit';
import { currentLangReducer } from './current-lang-slice';

export const store = configureStore({
  reducer: {
    currentLang: currentLangReducer,
  },
});

export type RootStateType = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
