// TODO проверить на необходимость содержания этого файла (при возможности удалить)

export interface IPairWords {
  cardId: number | null,
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
      cardId: 1,
      nativeWord: 'тест',
      foreignWord: 'test',
      transcription: 'тест',
    },
  ],
};
