import { ReactElement, useState } from 'react';

const BUTTON_TOUCHED = 'button--touched';
const BUTTON_BASE_ICON = 'button-base--icon';

type ButtonBasePropsType = {
  classAdditional?: string;
  onClickFunction: () => void;
  ElementJSX?: ReactElement;
  text?: string | number
};

export default function ButtonBase(props: ButtonBasePropsType) {
  const {
    classAdditional, onClickFunction, ElementJSX, text,
  } = props;
  const [isTouched, setIsTouched] = useState(false);

  const classButtonBaseIcon = () => (text ? '' : BUTTON_BASE_ICON);

  const touchedClass = () => (isTouched ? BUTTON_TOUCHED : '');

  function renderButtonIcon() {
    if (ElementJSX) {
      return <span className="button-base__icon">{ElementJSX}</span>;
    }
    return null;
  }

  function renderButtonText() {
    if (text) {
      return <span className="button-base__text">{text}</span>;
    }
    return null;
  }

  return (
    <button
      type="button"
      className={`button-base ${classAdditional} ${touchedClass()} ${classButtonBaseIcon()}`}
      onTouchStart={() => {
        setIsTouched(true);
      }}
      onTouchEnd={() => setIsTouched(false)}
      onClick={onClickFunction}
    >
      {renderButtonIcon()}
      {renderButtonText()}
    </button>
  );
}

ButtonBase.defaultProps = {
  classAdditional: '',
  ElementJSX: '',
  text: '',
};
