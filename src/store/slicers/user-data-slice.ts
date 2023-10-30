import { createSlice } from '@reduxjs/toolkit';
import { cloneDeep } from 'lodash';

type UserDataType = {
  userName: string;
  userAvatar: string;
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
    userName: '',
    userAvatar: IMG_PATH_DEFAULT,
  },
};

const updateUserDataSlicer = createSlice({
  name: 'userData',
  initialState,
  reducers: {
    updateUserData: (state:StateType, action:ActionType) => {
      if (action.payload.userAvatar === '') action.payload.userAvatar = IMG_PATH_DEFAULT;
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
