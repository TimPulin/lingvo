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

type PhraseType = {
  id: number,
  createdAt: string,
  value: string,
  languageId: number
};

type CollectionLanguageType = {
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
