import { configureStore } from '@reduxjs/toolkit';
import { currentLangReducer } from './current-lang-slice';
import { addNewWordReducer } from './add-new-word-slice';

export const store = configureStore({
  reducer: {
    currentLang: currentLangReducer,
    dictionary: addNewWordReducer,
  },
});

export type RootStateType = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
