import { Input } from 'antd';

import { useState, useEffect } from 'react';

type InputPropsType = {
  name: string;
  value: string | number;
  updateFunction: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholderText?: string;
  maxLength?:number | undefined;
};

const FOCUS_CLASS = 'input-custom--filled';

export default function InputCustom(props: InputPropsType) {
  const {
    name, value, updateFunction, placeholderText, maxLength = undefined,
  } = props;
  const [isFocus, setIsFocus] = useState(false);
  const focusClass = () => (isFocus ? FOCUS_CLASS : '');

  const onFocus = () => {
    setIsFocus(true);
  };

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
    <div className="input-custom card__input-custom">
      <label
        className={`input-custom__label ${focusClass()}`}
        tabIndex={-1}
        onTouchStart={onFocus}
        onBlur={onBlur}
      >
        <span className="input-custom__placeholder">
          {placeholderText}
        </span>
        <Input
          className="input-custom__input"
          value={value}
          name={name}
          maxLength={maxLength}
          onChange={updateFunction}
          onFocus={onFocus}
          onClick={(event) => event.stopPropagation()}
        />
      </label>
    </div>
  );
}

InputCustom.defaultProps = {
  placeholderText: '',
  maxLength: undefined,
};
