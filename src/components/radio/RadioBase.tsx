export interface IRadioBaseList {
  name: string;
  label: string;
  value: string | number;
}

interface IRadioBaseProps extends IRadioBaseList {
  onChange(value: string | number): void;
  currentLang: string;
}

export default function RadioBase(props: IRadioBaseProps) {
  const {
    name, label, value, onChange, currentLang,
  } = props;

  const checkedClass = () => (currentLang === value ? 'radio-custom--checked' : '');

  return (
    <label className={`radio-custom ${checkedClass()}`}>

      <span className="radio-custom__checkbox">
        <span className="radio-custom__check-mark" />
      </span>

      <span className="radio-custom__text">{label}</span>
      <input
        className="radio-custom__input"
        type="radio"
        name={name}
        value={value}
        onChange={() => onChange(value)}
      />
    </label>
  );
}
