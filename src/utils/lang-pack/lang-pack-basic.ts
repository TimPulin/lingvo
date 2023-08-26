export interface ILangPack {
  MAIN: string,
  CREATE_NEW_CARD: string,
  CARDS: string,
  SETTINGS: string,
  LANGUAGE: string,
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

export const dataLangs = {
  ru: {
    MAIN: 'Главная',
    CREATE_NEW_CARD: 'Создать новую карточку',
    CARDS: 'Карточки',
    SETTINGS: 'Настройки',
    LANGUAGE: 'Язык',
  },

  en: {
    MAIN: 'Main',
    CREATE_NEW_CARD: 'Create new card',
    CARDS: 'Cards',
    SETTINGS: 'Settings',
    LANGUAGE: 'Language',
  },

  esl: {
    MAIN: 'Principal',
    CREATE_NEW_CARD: 'Crear una nueva tarjeta',
    CARDS: 'Tarjetas',
    SETTINGS: 'Ajustes',
    LANGUAGE: 'Lengua',
  },

  hebrew: {
    MAIN: 'Main',
    CREATE_NEW_CARD: 'Create new card',
    CARDS: 'Cards',
    SETTINGS: 'Settings',
    LANGUAGE: 'Language',
  },
};
