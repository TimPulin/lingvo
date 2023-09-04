type InputPropsType = {
  value: string | number;
  updateFunction: (value: string | number) => void;
};

export default function Input(props:InputPropsType) {
  const { value, updateFunction } = props;

  function onChange(event: React.FormEvent<HTMLInputElement>):void {
    if (event.target instanceof HTMLInputElement) {
      updateFunction(event.target.value);
    }
  }

  return (
    <label className="custom-input">
      <span className="custom-input_placeholder"> text</span>
      <input
        className="custom-input__input"
        type="text"
        value={value}
        onInput={onChange}
      />
    </label>
  );
}
