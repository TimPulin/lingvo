import { useRef } from 'react';

type InputPropsType = {
  value: string | number;
  updateFunction: (value: string | number) => void;
};

export default function Input(props:InputPropsType) {
  const { value, updateFunction } = props;
  const labelRef = useRef<HTMLLabelElement>(null);

  function onChange(event: React.FormEvent<HTMLInputElement>):void {
    if (event.target instanceof HTMLInputElement) {
      updateFunction(event.target.value);
    }
  }

  return (
    <label className="custom-input" tabIndex={0} ref={labelRef}>
      <span className="custom-input__placeholder"> text</span>
      <input
        className="custom-input__input"
        type="text"
        value={value}
        onInput={onChange}
        onFocus={() => labelRef.current?.focus()}
      />
    </label>
  );
}
