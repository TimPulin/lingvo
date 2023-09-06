/* eslint-disable @typescript-eslint/naming-convention */

import { useState } from 'react';
import CardForm from './CardForm';

const CARD_NATIVE = 'card--native';
const CARD_FOREIGN = 'card--foreign';

const CONTENT_NATIVE = 'card__content--native';
const CONTENT_FOREIGN = 'card__content--foreign';

const CONTENT_HIDE = 'card__content--hide';

// interface INewCard {
//   foreignWord: string;
//   nativeWord: string;
//   transcription: string;
// }

export default function NewCard() {
  const [foreignWord, _setForeignWord] = useState<string>('');
  const [transcription, _setTranscription] = useState<string>('');
  const [nativeWord, _setNativeWord] = useState<string>('');

  const [isCardNative, setIsCardNative] = useState(true);
  const [isContentNative, setIsContentNative] = useState(true);

  const cardClass = () => (isCardNative ? CARD_NATIVE : CARD_FOREIGN);

  const nativeContentClass = () => (isCardNative ? '' : CONTENT_NATIVE);
  const foreignContentClass = () => (isCardNative ? CONTENT_FOREIGN : '');

  const nativeContentHide = () => (isContentNative ? '' : CONTENT_HIDE);

  const foreignContentHide = () => (isContentNative ? CONTENT_HIDE : '');

  function turnCard() {
    setIsCardNative(!isCardNative);

    setTimeout(() => {
      setIsContentNative(!isContentNative);
    }, 250);
  }

  const setNativeWord = (value:string) => {
    _setNativeWord(value);
  };

  const setForeignWord = (value:string) => {
    _setForeignWord(value);
  };

  const setTranscription = (value:string) => {
    _setTranscription(value);
  };

  const onSubmitNative = (event: React.FormEvent) => {
    event.preventDefault();
    turnCard();
  };

  const onSubmitForeign = (event: React.FormEvent) => {
    console.log('foreign');
    event.preventDefault();
    turnCard();
  };

  const onCancelNative = () => {
    setNativeWord('');
  };

  const onCancelForeign = () => {
    _setForeignWord('');
    _setTranscription('');
  };

  return (
    <div
      className="card card--edit"
    >

      <div className={`card__body ${cardClass()}`}>

        <div className={`card__content ${nativeContentHide()} ${nativeContentClass()}`}>
          <div
            className="card__input"
            onMouseUp={(event) => event.stopPropagation()}
            role="button"
            tabIndex={0}
          >
            {/* {Native Card} */}
            <CardForm
              words={[
                {
                  word: nativeWord, updateFunction: setNativeWord, placeholderText: 'native', key: 1,
                },
              ]}
              primaryButtonName="Forward"
              onSubmit={onSubmitNative}
              onCancel={onCancelNative}
            />
          </div>
        </div>

        {/* {Foreign Card} */}
        <div className={`card__content ${foreignContentHide()} ${foreignContentClass()}`}>
          <div
            className="card__input"
            onMouseUp={(event) => event.stopPropagation()}
            role="button"
            tabIndex={0}
          >
            <CardForm
              words={[
                {
                  word: foreignWord, updateFunction: setForeignWord, placeholderText: 'foreign', key: 2,
                },
                {
                  word: transcription, updateFunction: setTranscription, placeholderText: 'transcription', key: 3,
                },
              ]}
              onSubmit={onSubmitForeign}
              onCancel={onCancelForeign}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

// TODO вычислить максимальное количество знаков для карточки
