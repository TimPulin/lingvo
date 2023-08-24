import { createSlice } from '@reduxjs/toolkit';

interface ICurrentLang {
  value: string;
}
interface ActionType {
  type: string;
  payload: string;
}

const initialState: ICurrentLang = {
  value: 'en',
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
