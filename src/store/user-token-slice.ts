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
  value: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjMsInVzZXJuYW1lIjoi0KLQtdC50LzRg9GA0LDQtyDQn9GD0LvQuNC9IiwiZW1haWwiOiJ0aW1wdXZrY29tQGdtYWlsLmNvbSIsImlhdCI6MTY5NjEwODQ4NywiZXhwIjoxNjk2MTk0ODg3fQ.o4qgqoZ7q_ZK6Jv6qjDUrG6P8_mn9vf7c0f8Wu38sho',
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
