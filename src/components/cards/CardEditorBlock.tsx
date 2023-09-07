import CardForm, { CardFormPropsType } from './CardForm';

type CardEditorBlockPropsType = {
  form: CardFormPropsType;
  inputHide: () => string;
};

export default function CardEditorBlock(props: CardEditorBlockPropsType) {
  const { form, inputHide } = props;
  return (
    <div
      className={`card__input ${inputHide()}`}
      onMouseUp={(event) => event.stopPropagation()}
      role="button"
      tabIndex={-1}
    >
      {/* {Native Card} */}
      <CardForm
        newWordsList={form.newWordsList}
        primaryButtonName="Forward"
        onSubmit={form.onSubmit}
        onCancel={form.onCancel}
      />
    </div>
  );
}
