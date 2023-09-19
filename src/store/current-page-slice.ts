import { createSlice } from '@reduxjs/toolkit';

interface ICurrentPageName {
  value: string;
}

interface IActionType {
  type: string,
  payload: string,
}

const initialState:ICurrentPageName = {
  value: 'MAIN_PAGE_NAME',
};

export const updateCurrentPageNameSlice = createSlice({
  name: 'currentPageName',
  initialState,

  reducers: {
    updateCurrentPageName: (state:ICurrentPageName, action:IActionType) => {
      state.value = action.payload;
    },
  },
});

export const { updateCurrentPageName } = updateCurrentPageNameSlice.actions;
export const currentPageNameReducer = updateCurrentPageNameSlice.reducer;
export interface ICurrentPageReducer {
  updateCurrentPageName: (state:ICurrentPageName, action:IActionType) => void;
}
