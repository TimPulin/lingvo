import { createSlice } from '@reduxjs/toolkit';
import { Languages } from '../utils/lang-pack/lang-pack-basic';

interface ICurrentLang {
  value: Languages;
}
interface ActionType {
  type: string;
  payload: Languages;
}

const initialState: ICurrentLang = {
  value: Languages.EN,
};

export const updateCurrentLangSlice = createSlice({
  name: 'currentLang',
  initialState,

  reducers: {
    updateCurrentLang: (state: ICurrentLang, action: ActionType) => {
      state.value = action.payload;
    },
  },
});

export const { updateCurrentLang } = updateCurrentLangSlice.actions;
export const currentLangReducer = updateCurrentLangSlice.reducer;
export interface ICurrentLangReducer {
  updateCurrentLang: (state: ICurrentLang, action: ActionType) => void;
}
