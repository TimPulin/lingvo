import Input from '../form/Input';

type WordType = {
  word: string;
  updateFunction(): void;
  key: number;
}[];

type CardFormPropsType = {
  words: WordType;
};

export default function CardForm(props: CardFormPropsType) {
  const { words } = props;
  return (
    <form className="form">
      <div className="form__body">
        {
          words.map((item) => (
            <Input value={item.word} updateFunction={item.updateFunction} key={item.key} />
          ))
        }
      </div>
      <button type="button" className="button">Save</button>
    </form>
  );
}
