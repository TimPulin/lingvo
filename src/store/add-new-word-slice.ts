import { createSlice } from '@reduxjs/toolkit';
import { IPairWords, DictionaryType, dictionary } from '../utils/dictionary/dictionary-types';

type IDictionary = {
  value: DictionaryType;
};

interface ActionType {
  type: string,
  payload: {
    word: IPairWords,
    key: string,
  },
}

const initialState: IDictionary = {
  value: dictionary,
};

export const addNewWordSlice = createSlice({
  name: 'dictionary',
  initialState,

  reducers: {
    addNewWord: (state: IDictionary, action: ActionType) => {
      const newState = { ...state.value };
      newState[action.payload.key].push(action.payload.word);
      state.value = newState;
    },
  },
});

export const { addNewWord } = addNewWordSlice.actions;
export const addNewWordReducer = addNewWordSlice.reducer;
export interface IAddNewWordReducer {
  addNewWord:(state: IDictionary, action: ActionType) => void;
}
