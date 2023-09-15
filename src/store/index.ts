import { configureStore } from '@reduxjs/toolkit';
import { currentLangReducer } from './current-lang-slice';
import { dictionaryReducer } from './dictionary-slice';

export const store = configureStore({
  reducer: {
    currentLang: currentLangReducer,
    dictionary: dictionaryReducer,
  },
});

export type RootStateType = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
