interface ILangPack {
  CREATE_NEW_CARD: string,
  CARDS: string,
  SETTINGS: string,
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
  },

  en: {
    CREATE_NEW_CARD: 'Create new card',
    CARDS: 'Cards',
    SETTINGS: 'Settings',
  },

  esl: {
    CREATE_NEW_CARD: 'Crear una nueva tarjeta',
    CARDS: 'Tarjetas',
    SETTINGS: 'Ajustes',
  },

  hebrew: {
    CREATE_NEW_CARD: 'Create new card',
    CARDS: 'Cards',
    SETTINGS: 'Settings',
  },
};
