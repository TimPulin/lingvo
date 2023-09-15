export interface IPairWords {
  id: number | null,
  nativeWord: string,
  foreignWord: string,
  transcription: string,
}

export interface IPairWordsInfo extends IPairWords {
  frequencyRating: number,
}

export type CollectionType = IPairWords[];

export type DictionaryType = {
  [key: string]: CollectionType;
};

export type DictionaryStateType = {
  value: DictionaryType;
};

export const dictionary: DictionaryType = {
  defaultCollection: [
    {
      id: 1,
      nativeWord: 'тест',
      foreignWord: 'test',
      transcription: 'тест',
    },
  ],
};
