import { createSlice } from '@reduxjs/toolkit';
import {
  IPairWords, DictionaryStateType, dictionary,
} from '../utils/dictionary/dictionary-types';

interface ActionType {
  type: string,
  payload: {
    word: IPairWords,
    key: string,
  },
}

const initialState: DictionaryStateType = {
  value: dictionary,
};

export const dictionarySlice = createSlice({
  name: 'dictionary',
  initialState,

  reducers: {
    addNewWord: (state: DictionaryStateType, action: ActionType) => {
      const newState = { ...state.value };
      newState[action.payload.key].push(action.payload.word);
      state.value = newState;
    },
    editWord: (state: DictionaryStateType, action: ActionType) => {
      const { key, word } = action.payload;
      const newState = { ...state.value };
      if (word.id) {
        const editingWordIndex = newState[key].findIndex((currentWord) => currentWord.id === word.id);
        newState[key][editingWordIndex] = { ...word };
      }
      state.value = newState;
    },
  },
});

export const { addNewWord, editWord } = dictionarySlice.actions;
export const dictionaryReducer = dictionarySlice.reducer;
export interface IAddNewWordReducer {
  addNewWord:(state: DictionaryStateType, action: ActionType) => void;
}
export interface IEditWordReducer {
  editWord:(state: DictionaryStateType, action: ActionType) => void;
}
