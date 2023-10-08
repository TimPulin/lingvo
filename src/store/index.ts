import { configureStore } from '@reduxjs/toolkit';
import { currentLangReducer } from './slicers/current-lang-slice';
import { dictionaryReducer } from './slicers/dictionary-slice';
import { currentPageNameReducer } from './slicers/current-page-slice';
import { userTokenReducer } from './slicers/user-token-slice';
import { languagesListReducer } from './slicers/languages-list-slicer';

export const store = configureStore({
  reducer: {
    currentLang: currentLangReducer,
    dictionary: dictionaryReducer,
    currentPageName: currentPageNameReducer,
    userToken: userTokenReducer,
    languagesList: languagesListReducer,
  },
});

export type RootStateType = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
