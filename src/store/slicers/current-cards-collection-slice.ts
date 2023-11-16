import { createSlice } from '@reduxjs/toolkit';
import { cloneDeep } from 'lodash';
import { CardsCollectionType } from '../../utils/types';

type CurrentCardsCollectionType = {
  value: CardsCollectionType | null
};

type ActionType = {
  type: string;
  payload: CardsCollectionType;
};

const initialState:CurrentCardsCollectionType = {
  value: null,
};

export const updateCurrentCardsCollectionSlice = createSlice({
  name: 'current-cards-collection',
  initialState,
  reducers: {
    updateCurrentCardsCollection: (state:CurrentCardsCollectionType, action:ActionType) => {
      const cardsCollection = cloneDeep(action.payload);
      state.value = cardsCollection;
    },
  },
});

export const { updateCurrentCardsCollection } = updateCurrentCardsCollectionSlice.actions;
export const currentCardsCollectionReducer = updateCurrentCardsCollectionSlice.reducer;
export type CurrentCardsCollectionReducerType = {
  updateCurrentCardsCollection: (state:CurrentCardsCollectionType, action:ActionType) => void;
};
