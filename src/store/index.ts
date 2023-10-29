import { configureStore } from '@reduxjs/toolkit';
import { currentLangReducer } from './slicers/current-lang-slice';
import { dictionaryReducer } from './slicers/dictionary-slice';
import { currentPageNameReducer } from './slicers/current-page-slice';
import { languagesListReducer } from './slicers/languages-list-slicer';
import { currentCardsCollectionReducer } from './slicers/current-cards-collection-slice';
import { userTokenReducer } from './slicers/user-token-slice';
import { updateUserDataReducer } from './slicers/user-data-slice';

export const store = configureStore({
  reducer: {
    currentLang: currentLangReducer,
    dictionary: dictionaryReducer,
    currentPageName: currentPageNameReducer,
    languagesList: languagesListReducer,
    currentCardsCollection: currentCardsCollectionReducer,
    userToken: userTokenReducer,
    userData: updateUserDataReducer,
  },
});

export type RootStateType = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
