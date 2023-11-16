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
  value: null,
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
