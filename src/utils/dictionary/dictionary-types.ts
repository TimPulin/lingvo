export interface IPairWords {
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

export const dictionary: DictionaryType = {
  defaultCollection: [
    {
      nativeWord: 'тест',
      foreignWord: 'test',
      transcription: 'тест',
    },
  ],
};
