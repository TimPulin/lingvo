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

export type CollectionFormType = {
  name: string,
  description: string,
  languageId: number,
  translationLanguageId: number
};
