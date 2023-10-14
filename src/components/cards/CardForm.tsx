import Input from '../form/Input';
import { useCurrentLangPack } from '../../store/selectors';

type WordType = {
  newWord: string;
  updateFunction(value: string | number): void;
  placeholderText: string;
}[];

export type CardFormPropsType = {
  newWordsList: WordType;
  primaryButtonName?: string;
  onSubmit(event: React.FormEvent):void;
  onCancel(event: React.FormEvent):void;
};

export default function CardForm(props: CardFormPropsType) {
  const {
    newWordsList, onSubmit, onCancel, primaryButtonName,
  } = props;
  const { CANCEL } = useCurrentLangPack();

  function onBodyClick(event: React.TouchEvent | React.MouseEvent) {
    event.stopPropagation();
  }

  return (
    <form className="form form--card" onSubmit={onSubmit}>
      {/* eslint-disable-next-line */}
      <div className="form__body" onClick={onBodyClick}>
        {
          newWordsList.map((item) => (
            <Input
              placeholderText={item.placeholderText}
              value={item.newWord}
              updateFunction={item.updateFunction}
              key={item.placeholderText}

            />
          ))
        }
      </div>
      <div className="form__footer">
        <button type="button" className="button button--trans" onClick={onCancel}>{CANCEL}</button>
        <button type="button" className="button button--trans" onClick={onSubmit}>{primaryButtonName}</button>
      </div>

    </form>
  );
}

CardForm.defaultProps = {
  primaryButtonName: 'Save',
};
