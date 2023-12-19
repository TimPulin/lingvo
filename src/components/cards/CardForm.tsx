/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
// import Input from '../form/Input';
import { ChangeEventHandler, useEffect } from 'react';
import { useCurrentLangPack } from '../../store/selectors';
import InputCustom from '../form/input-custom-temp/InputCustom';

type WordType = {
  newWord: string;
  updateFunction: ChangeEventHandler<HTMLInputElement>;
  placeholderText: string;
  inputName: string;
}[];

export type CardFormPropsType = {
  newWordsList: WordType;
  primaryButtonName?: string;
  onSubmit: ((event: React.FormEvent<HTMLFormElement>) => void) | null;
  onCancel: (event: React.FormEvent) => void;
  onClickNext?: ((event: React.FormEvent) => void) | null;
};

export default function CardForm(props: CardFormPropsType) {
  const {
    primaryButtonName, newWordsList, onSubmit, onCancel, onClickNext = null,
  } = props;
  const { CANCEL } = useCurrentLangPack();

  function onBodyClick(event: React.TouchEvent | React.MouseEvent) {
    event.stopPropagation();
  }

  const onSubmitLocal = (event: any) => {
    event.stopPropagation();
    event.preventDefault();
    if (onSubmit !== null) onSubmit(event);
  };

  useEffect(() => {
    if (onClickNext) console.log(onClickNext);
  }, [onClickNext]);

  return (
    <form
      className="form form--card"
      onSubmit={onSubmitLocal}
      // onClick={(event) => event.preventDefault()}
    >
      <div className="form__body" onClick={onBodyClick}>
        {
          newWordsList.map((item) => (
            <InputCustom
              placeholderText={item.placeholderText}
              name={item.inputName}
              value={item.newWord}
              maxLength={70}
              updateFunction={item.updateFunction}
              key={item.placeholderText}

            />
          ))
        }
      </div>
      <div className="form__footer">
        <button type="button" className="button button--trans" onClick={onCancel}>{CANCEL}</button>
        {
          onClickNext
          && (
            <button type="button" className="button button--trans" onClick={onClickNext}>
              {primaryButtonName}
            </button>
          )
        }
        {
          onClickNext === null
          && (
            <button type="submit" className="button button--trans" onClick={(event) => event.stopPropagation()}>
              {primaryButtonName}
            </button>
          )
        }
      </div>

    </form>
  );
}

CardForm.defaultProps = {
  primaryButtonName: 'Save',
  onClickNext: null,
};
