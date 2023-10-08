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
