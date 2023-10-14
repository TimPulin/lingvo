import { useState } from 'react';
import CirclePlusIcon from '../icons/CirclePlusIcon';

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
    <div className={`button-plus ${classAdditional} ${touchedClass()}`}>
      <button
        type="button"
        className="button-plus__button"
        onTouchStart={() => {
          setIsTouched(true); console.log('touched');
        }}
        onTouchEnd={() => setIsTouched(false)}
        onClick={onClickFunction}
      >
        <CirclePlusIcon />
      </button>
    </div>
  );
}
