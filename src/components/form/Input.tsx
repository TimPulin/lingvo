import { useState, useEffect } from 'react';

type InputPropsType = {
  value: string | number;
  updateFunction: (value: string | number) => void;
  placeholderText?: string;
};

const FOCUS_CLASS = 'custom-input--filled';

export default function Input(props: InputPropsType) {
  const { value, updateFunction, placeholderText } = props;
  const [isFocus, setIsFocus] = useState(false);
  const focusClass = () => (isFocus ? FOCUS_CLASS : '');

  function onInput(event:React.FormEvent) {
    if (event.target instanceof HTMLInputElement) {
      updateFunction(event.target.value);
    }
  }

  function onFocus() {
    setIsFocus(true);
  }

  function onBlur() {
    if (!value) {
      setIsFocus(false);
    }
  }

  useEffect(() => {
    if (value) {
      setIsFocus(true);
    } else {
      setIsFocus(false);
    }
  }, [value]);

  return (
    <label
      className={`custom-input ${focusClass()}`}
      tabIndex={-1}
      onTouchStart={onFocus}
      onBlur={onBlur}
    >
      <span className="custom-input__placeholder">
        {' '}
        {placeholderText}
      </span>
      <input
        className="custom-input__input"
        type="text"
        value={value}
        onChange={onInput}
        onFocus={onFocus}
      />
    </label>
  );
}

Input.defaultProps = {
  placeholderText: '',
};
