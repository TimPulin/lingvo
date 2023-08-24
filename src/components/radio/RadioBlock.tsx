// доступные css классы: options-flat, options-flat--row (отрисовывается в ряд)

import { v4 as getUniqId } from 'uuid';
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
  list.map((item) => ({
    ...item,
    id: getUniqId(),
  }
  ));

  return (
    <div className={componentClass}>
      <ul className="options-flat__list">
        {list.map((item) => (
          <li className="options-flat__item" key={getUniqId()}>
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
