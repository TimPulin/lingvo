import { createSlice } from '@reduxjs/toolkit';
import type { DefaultOptionType } from 'antd/es/select';

type LanguagesListType = {
  value: DefaultOptionType[];
};

type ActionType = {
  type: string,
  payload: DefaultOptionType[]
};

const initialState:LanguagesListType = {
  value: [],
};

export const setLanguagesListSlicer = createSlice({
  name: 'languagesList',
  initialState,

  reducers: {
    setLanguagesList: (state:LanguagesListType, action:ActionType) => {
      state.value = action.payload;
    },
  },
});

export const { setLanguagesList } = setLanguagesListSlicer.actions;
export const languagesListReducer = setLanguagesListSlicer.reducer;
export interface ILanguagesListReducer {
  setLanguagesList: (state:LanguagesListType, action:ActionType) => void,
}
