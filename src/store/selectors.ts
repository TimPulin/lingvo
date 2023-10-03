// TODO как-то проверить, нужен ли импорт React
/* eslint-disable-next-line */
// import React from 'react';
import { useSelector } from 'react-redux';
import type { DefaultOptionType } from 'antd/es/select';
import { Languages, ILangPack } from '../utils/lang-pack/lang-pack-types';
import { dataLangs } from '../utils/lang-pack/lang-pack-basic';
import { DictionaryType, CollectionType } from '../utils/dictionary/dictionary-types';
import { RootStateType } from './index';

export function useCurrentLangPack():ILangPack {
  const currentLang:Languages = useSelector((store: RootStateType) => store.currentLang.value);
  return dataLangs[currentLang];
}

export function useDictionary():DictionaryType {
  return useSelector((store: RootStateType) => store.dictionary.value);
}

export function useCollection(collectionKey:string):CollectionType {
  return useSelector((store: RootStateType) => store.dictionary.value[collectionKey]);
}

export function useCurrentPageName():string {
  return useSelector((store:RootStateType) => store.currentPageName.value);
}

export function useUserToken() {
  return useSelector((store:RootStateType) => store.userToken.value);
}

export function useLanguagesList():DefaultOptionType[] {
  return useSelector((store:RootStateType) => store.languagesList.value);
}
