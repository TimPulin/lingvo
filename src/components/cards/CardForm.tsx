import Input from '../form/Input';
import { useCurrentLangPack } from '../../store/selectors';
import InputCustom from '../form/input-custom-temp/InputCustom';

type WordType = {
  newWord: string;
  updateFunction(value: string | number): void;
  placeholderText: string;
}[];

export type CardFormPropsType = {
  newWordsList: WordType;
  primaryButtonName?: string;
  onSubmit: ((event: React.FormEvent) => void) | null;
  onCancel: (event: React.FormEvent) => void;
  onClickNext?: ((event: React.FormEvent) => void) | null
};

export default function CardForm(props: CardFormPropsType) {
  const {
    newWordsList, onSubmit, onCancel, onClickNext = null, primaryButtonName,
  } = props;
  const { CANCEL } = useCurrentLangPack();
  // console.log(newWordsList);

  function onBodyClick(event: React.TouchEvent | React.MouseEvent) {
    event.stopPropagation();
  }

  const onSubmitLocal = (event: any) => {
    if (onSubmit !== null) onSubmit(event);
  };

  const updateFunctionTemp = () => {
    console.log('norm');
  };

  return (
    <form className="form form--card" onSubmit={onSubmitLocal}>
      {/* eslint-disable-next-line */}
      <div className="form__body" onClick={onBodyClick}>
        {
          newWordsList.map((item) => (
            <Input
              placeholderText={item.placeholderText}
              value={item.newWord}
              maxLength={70}
              updateFunction={item.updateFunction}
              key={item.placeholderText}
            />
          ))
        }
        <InputCustom value="" placeholderText="test" updateFunction={updateFunctionTemp} name="temp" />
      </div>
      <div className="form__footer">
        <button type="button" className="button button--trans" onClick={onCancel}>{CANCEL}</button>
        {
          onClickNext
          && <button type="button" className="button button--trans" onClick={onClickNext}>{primaryButtonName}</button>
        }
        {
          onClickNext === null
          && <button type="submit" className="button button--trans">{primaryButtonName}</button>
        }
      </div>

    </form>
  );
}

CardForm.defaultProps = {
  primaryButtonName: 'Save',
  onClickNext: null,
};
