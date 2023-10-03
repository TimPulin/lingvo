import { createSlice } from '@reduxjs/toolkit';

type UserTokenType = {
  value: string | null;
};

type ActionType = {
  type: string;
  payload: string;
};

const initialState: UserTokenType = {
  /* eslint-disable-next-line */
  value: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsInVzZXJuYW1lIjoi0KLQtdC50LzRg9GA0LDQtyDQn9GD0LvQuNC9IiwiZW1haWwiOiJ0aW1wdXZrY29tQGdtYWlsLmNvbSIsImlhdCI6MTY5NjM2OTY3NSwiZXhwIjoxNjk2NDU2MDc1fQ.BiL0dv0I8v71Rrvs8LcbMbKriuykUzkVL7Ke-qWVrcc',
};

export const updateUserTokenSlicer = createSlice({
  name: 'userToken',
  initialState,

  reducers: {
    updateUserToken: (state:UserTokenType, action:ActionType) => {
      state.value = action.payload;
    },
  },
});

export const { updateUserToken } = updateUserTokenSlicer.actions;
export const userTokenReducer = updateUserTokenSlicer.reducer;
export interface IUpdateUserTokenReducer {
  updateUserToken: (state:UserTokenType, action:ActionType) => void;
}
