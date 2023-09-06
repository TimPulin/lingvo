// TODO как-то проверить, нужен ли импорт React
/* eslint-disable-next-line */
// import React from 'react';
import { useSelector } from 'react-redux';
import { dataLangs, Languages, ILangPack } from '../utils/lang-pack/lang-pack-basic';
import { DictionaryType } from '../utils/dictionary/dictionary-types';
import { RootStateType } from './index';

export function useCurrentLangPack():ILangPack {
  const currentLang:Languages = useSelector((store: RootStateType) => store.currentLang.value);

  return dataLangs[currentLang];
}

export function useDictionary():DictionaryType {
  return useSelector((store: RootStateType) => store.dictionary.value);
}
