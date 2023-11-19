export type CollectionType = {
  'id': number,
  'name': string,
  'description': string,
  'languageId': number,
  'translationLanguageId': number,
  'language': {
    'id': number,
    'original': string,
    'russian': string,
    'english': string,
    'iso': string
  },
  'translationLanguage': {
    'id': number,
    'original': string,
    'russian': string,
    'english': string,
    'iso': string
  },
  'binds': {
    'id': number,
    'userId': number,
    'phraseId': number,
    'translationPhraseId': number,
    'collectionId': number
  }
};

export type CollectionsListType = CollectionType[];

// ============================

export type PaginationType = {
  count: number,
};

type PhraseType = {
  id: number,
  createdAt: string,
  value: string,
  languageId: number
};

export type CollectionLanguageType = {
  id: number,
  original: string,
  russian: string,
  english: string,
  iso: string
};

export type CollectionLanguageListType = CollectionLanguageType[];

export type CardType = {
  createdAt: string,
  userId: number,
  collectionId: string,
  id: number,
  phrase: PhraseType,
  phraseId: number,
  translationPhrase: PhraseType,
  translationPhraseId: number,
  pronunciation: string,
};

export type CardsListType = CardType[];

export type CardsCollectionType = {
  id: number,
  name: 'string',
  description: 'string',
  languageId: number,
  translationLanguageId: number,
  language: CollectionLanguageType,
  'translationLanguage': CollectionLanguageType,
  'binds': CardsListType,
};

export type CollectionLanguagePromiseType = {
  status: number,
  data: {
    data: CollectionLanguageListType,
    pagination: PaginationType
  },

};

export type UserType = {
  avatar: string,
  username: string,
  id: number,
  language: CollectionLanguageType,
};

export type UserPromiseType = {
  status: number,
  data: UserType
};

// ============================

export type CollectionFormType = {
  name: string,
  description: string,
  languageId: number,
  translationLanguageId: number
};

export type NewWordType = {
  phrase: string,
  translationPhrase: string,
};

// =============================

export type OnSaveCardArgumentsType = {
  newWord: NewWordType;
  cardId?: number;
};

// ==============================

export type OnDeleteCardArgumentsType = {
  cardId: number;
};
