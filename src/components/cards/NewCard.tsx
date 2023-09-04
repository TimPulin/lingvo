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
  const [foreignWord, setForeignWord] = useState('');
  const [transcription, setTranscription] = useState('');
  const [nativeWord, setNativeWord] = useState('');

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

  return (
    <div
      className="card card--edit"
      onMouseUp={turnCard}
      role="button"
      tabIndex={0}
    >

      <div className={`card__body ${cardClass()}`}>

        <div className={`card__content ${nativeContentHide()} ${nativeContentClass()}`}>
          <div
            className="card__input"
            onMouseUp={(event) => event.stopPropagation()}
            role="button"
            tabIndex={0}
          >
            <CardForm words={[
              { word: nativeWord, updateFunction: () => setNativeWord, key: 1 },
            ]}
            />
          </div>
        </div>

        <div className={`card__content ${foreignContentHide()} ${foreignContentClass()}`}>
          <div
            className="card__input"
            onMouseUp={(event) => event.stopPropagation()}
            role="button"
            tabIndex={0}
          >
            <CardForm words={[
              { word: foreignWord, updateFunction: () => setForeignWord, key: 2 },
              { word: transcription, updateFunction: () => setTranscription, key: 3 },
            ]}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

// TODO вычислить максимальное количество знаков для карточки
