// доступные css классы: options-flat, options-flat--row (отрисовывается в ряд)

import RadioBase, { IRadioBaseList } from './RadioBase';

interface IRadioBlockProps {
  list: IRadioBaseList[];
  componentClass: string;
  currentLang: string;
  onChange(value: string | number): void;
}

export default function RadioBlock(props: IRadioBlockProps) {
  const {
    list, componentClass, currentLang, onChange,
  } = props;

  return (
    <div className={componentClass}>
      <ul className="options-flat__list">
        {list.map((item) => (
          <li className="options-flat__item" key={item.value}>
            <RadioBase
              name={item.name}
              label={item.label}
              value={item.value}
              currentLang={currentLang}
              onChange={onChange}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
