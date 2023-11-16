export interface ILangPack {
  MAIN_PAGE: string,
  CARDS_PAGE: string,
  NEW_CARD_PAGE: string,
  SETTING_PAGE: string,
  COLLECTIONS_PAGE: string,
  NEW_COLLECTION_PAGE: string,

  MAIN: string,
  CREATE_NEW_CARD: string,
  CARDS: string,
  SETTINGS: string,
  LANGUAGE: string,

  NATIVE: string,
  FOREIGN: string,
  TRANSCRIPTION: string,
  CANCEL: string,
  SAVE: string,
  FORWARD: string,
  EDIT: string,
  DELETE: string,

  // ФРАЗЫ
  CARD_CHANGES_MADE: string,
  CARD_SAVED: string,

  COLLECTION:string,
  NATIVE_LANGUAGE_COLLECTION:string,
  FOREIGN_LANGUAGE_COLLECTION:string,
  COLLECTION_NAME:string,
  COLLECTION_DESCRIPTION:string,

  CANT_SAVE_CHANGE: string,
  CARD_DELETED: string,
  CANT_DELETE_CARD: string,
  RELOAD_APP: string,
  CREATE_CARD: string,
  GO_BACK_TO_PAGE_COLLECTION: string,
  PLEASE_AUTHORIZATION: string,
  COLLECTION_DELETED: string,
  CHANGE_SAVED: string,
  CANT_CHANGE_NEW_CARD: string,
  NEW_COLLECTION_SAVED: string,
  WELCOME: string,
  INSTALL_APP: string,
}

export enum Languages {
  EN = 'en',
  RU = 'ru',
  ESL = 'esl',
  HBW = 'hebrew',
}

export type DataLangType = {
  [key in Languages]?: ILangPack;
};
