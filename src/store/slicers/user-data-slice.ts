import { createSlice } from '@reduxjs/toolkit';
import { cloneDeep } from 'lodash';

type UserDataType = {
  username: string;
  avatar: string;
};

type StateType = {
  value: UserDataType;
};

type ActionType = {
  type: string;
  payload: UserDataType;
};

const IMG_PATH_DEFAULT = '/images/icons/icon-user-default.png';

const initialState:StateType = {
  value: {
    username: '',
    avatar: IMG_PATH_DEFAULT,
  },
};

const updateUserDataSlicer = createSlice({
  name: 'userData',
  initialState,
  reducers: {
    updateUserData: (state:StateType, action:ActionType) => {
      const copiedPayload = cloneDeep(action.payload);
      state.value = copiedPayload;
    },
  },
});

export const { updateUserData } = updateUserDataSlicer.actions;
export const updateUserDataReducer = updateUserDataSlicer.reducer;
export interface IUpdateUserDataReducer {
  updateUserData: (state:StateType, action:ActionType) => void;
}
