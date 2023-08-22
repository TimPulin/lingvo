// доступные css классы: options-flat, options-flat--row (отрисовывается в ряд)

import { v4 as getUniqId } from 'uuid';
import RadioBase, { IRadioBaseProps } from './RadioBase';

interface IRadioBlockProps {
  componentClass: string,
  list: IRadioBaseProps[]
}

export default function RadioBlock(props: IRadioBlockProps) {
  const { list, componentClass } = props;
  list.map((item) => ({
    ...item,
    id: getUniqId(),
  }
  ));

  return (
    <div className={componentClass}>
      <ul className="options-flat__list">
        {list.map((item) => (
          <li className="options-flat__item" id={getUniqId()}>
            <RadioBase
              name={item.name}
              label={item.label}
              value={item.value}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
