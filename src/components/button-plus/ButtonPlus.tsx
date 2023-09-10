import { useState } from 'react';

const BUTTON_TOUCHED = 'button-plus--touched';

export default function ButtonPlus() {
  const [isTouched, setIsTouched] = useState(false);
  const touchedClass = () => (isTouched ? BUTTON_TOUCHED : '');

  return (
    <div className={`button-plus ${touchedClass()}`}>
      <button
        type="button"
        className="button-plus__button"
        onTouchStart={() => {
          setIsTouched(true); console.log('touched');
        }}
        onTouchEnd={() => setIsTouched(false)}
      >
        <span className="button-plus__line" />
        <span className="button-plus__line" />
      </button>
    </div>
  );
}
