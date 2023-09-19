import { configureStore } from '@reduxjs/toolkit';
import { currentLangReducer } from './current-lang-slice';
import { dictionaryReducer } from './dictionary-slice';
import { currentPageNameReducer } from './current-page-slice';

export const store = configureStore({
  reducer: {
    currentLang: currentLangReducer,
    dictionary: dictionaryReducer,
    currentPageName: currentPageNameReducer,
  },
});

export type RootStateType = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
