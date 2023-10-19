import { useState } from 'react';

const BUTTON_TOUCHED = 'button--touched';

type ButtonPlusPropsType = {
  classAdditional: string;
  onClickFunction: () => void;
  ElementJSX: any;
};

export default function ButtonPlus(props: ButtonPlusPropsType) {
  const { classAdditional, onClickFunction, ElementJSX } = props;
  const [isTouched, setIsTouched] = useState(false);
  const touchedClass = () => (isTouched ? BUTTON_TOUCHED : '');

  return (
    <button
      type="button"
      className={`button button-base ${classAdditional} ${touchedClass()}`}
      onTouchStart={() => {
        setIsTouched(true);
      }}
      onTouchEnd={() => setIsTouched(false)}
      onClick={onClickFunction}
    >
      {ElementJSX}
    </button>
  );
}
