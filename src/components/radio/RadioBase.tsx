export interface IRadioBaseProps {
  name: string;
  label: string;
  value: string | number;
}

export default function RadioBase(props: IRadioBaseProps) {
  const { name, label, value } = props;

  function handleChange(event: any) {
    if (event.target.checked) {
      console.log('checked');
    } else {
      console.log('not');
    }
  }

  return (
    <label className="radio-custom">
      {label}
      <input
        className="radio-custom__input"
        type="radio"
        name={name}
        value={value}
        onChange={(event) => handleChange(event)}
      />
    </label>
  );
}
