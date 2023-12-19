import CardForm, { CardFormPropsType } from './CardForm';

type CardEditorBlockPropsType = {
  form: CardFormPropsType;
};

export default function CardEditorBlock(props: CardEditorBlockPropsType) {
  const { form } = props;
  return (
    <div
      className="card__input"
      onMouseUp={(event) => {
        event.stopPropagation(); event.preventDefault();
      }}
      role="button"
      tabIndex={-1}
    >
      <CardForm
        newWordsList={form.newWordsList}
        primaryButtonName={form.primaryButtonName}
        onSubmit={form.onSubmit}
        onCancel={form.onCancel}
        onClickNext={form.onClickNext}
      />
    </div>
  );
}
