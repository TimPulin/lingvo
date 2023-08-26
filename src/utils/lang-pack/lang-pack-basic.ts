export interface ILangPack {
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
    CREATE_NEW_CARD: 'Создать новую карточку',
    CARDS: 'Карточки',
    SETTINGS: 'Настройки',
    LANGUAGE: 'Язык',
  },

  en: {
    CREATE_NEW_CARD: 'Create new card',
    CARDS: 'Cards',
    SETTINGS: 'Settings',
    LANGUAGE: 'Language',
  },

  esl: {
    CREATE_NEW_CARD: 'Crear una nueva tarjeta',
    CARDS: 'Tarjetas',
    SETTINGS: 'Ajustes',
    LANGUAGE: 'Lengua',
  },

  hebrew: {
    CREATE_NEW_CARD: 'Create new card',
    CARDS: 'Cards',
    SETTINGS: 'Settings',
    LANGUAGE: 'Language',
  },
};
