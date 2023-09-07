import Input from '../form/Input';

type WordType = {
  newWord: string;
  updateFunction(value: string | number): void;
  placeholderText: string;
  key: number;
}[];

export type CardFormPropsType = {
  newWordsList: WordType;
  primaryButtonName?: string;
  onSubmit(event: React.FormEvent):void;
  onCancel():void;
};

export default function CardForm(props: CardFormPropsType) {
  const {
    newWordsList, onSubmit, onCancel, primaryButtonName,
  } = props;

  return (
    <form className="form" onSubmit={onSubmit}>
      <div className="form__body">
        {
          newWordsList.map((item) => (
            <Input
              placeholderText={item.placeholderText}
              value={item.newWord}
              updateFunction={item.updateFunction}
              key={item.key}
            />
          ))
        }
      </div>
      <div className="form__footer">
        <button type="button" className="button" onClick={onCancel}>Cancel</button>
        <button type="button" className="button" onClick={onSubmit}>{primaryButtonName}</button>
      </div>

    </form>
  );
}

CardForm.defaultProps = {
  primaryButtonName: 'Save',
};
