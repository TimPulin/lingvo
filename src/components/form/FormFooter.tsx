import { useCurrentLangPack } from '../../store/selectors';

type FormFooterPropsType = {
  onCancel: (event: any | undefined) => void;
};
export default function FormFooter(props: FormFooterPropsType) {
  const { CANCEL, SAVE } = useCurrentLangPack();
  return (
    <div className="form__footer">
      <button type="button" className="button button--trans button--warning" onClick={props.onCancel}>{CANCEL}</button>
      <button type="submit" className="button button--trans">{SAVE}</button>
    </div>
  );
}
