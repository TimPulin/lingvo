// // TODO проверить на необходимость содержания этого файла (при возможности удалить)

import { NewWordType } from '../types';

export interface IPairWords extends NewWordType {
  cardId: number | null,
  // nativeWord: string,
  // foreignWord: string,
  // transcription: string,
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

// TODO проверить на удаление
export const dictionary: DictionaryType = {
  defaultCollection: [
    {
      cardId: 1,
      phrase: 'тест',
      translationPhrase: 'test',
      pronunciation: 'тест',
    },
  ],
};
