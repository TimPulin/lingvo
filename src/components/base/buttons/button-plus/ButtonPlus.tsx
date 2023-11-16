import { useState } from 'react';
import FilledCirclePlusIcon from '../../../icons/FilledCirclePlusIcon';

const BUTTON_TOUCHED = 'button-plus--touched';

type ButtonPlusPropsType = {
  classAdditional: string;
  onClickFunction: () => void;
};

export default function ButtonPlus(props: ButtonPlusPropsType) {
  const { classAdditional, onClickFunction } = props;
  const [isTouched, setIsTouched] = useState(false);
  const touchedClass = () => (isTouched ? BUTTON_TOUCHED : '');

  return (
    <button
      type="button"
      className={`button-base button-plus ${classAdditional} ${touchedClass()}`}
      onTouchStart={() => {
        setIsTouched(true); console.log('touched');
      }}
      onTouchEnd={() => setIsTouched(false)}
      onClick={onClickFunction}
    >
      <FilledCirclePlusIcon />
    </button>
  );
}
