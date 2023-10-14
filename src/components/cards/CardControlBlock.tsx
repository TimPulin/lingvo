import { useCurrentLangPack } from '../../store/selectors';

const ACTIVE_CLASS = 'control-block--active';
const HIDE_CLASS = 'control-block--hide';

type CardControlBlockPropsType = {
  isShow: boolean;
  setIsShow:React.Dispatch<React.SetStateAction<boolean>>;
  onEdit:React.Dispatch<React.SetStateAction<boolean>>;
  onCardDelete:() => void;
};

export default function CardControlBlock(props:CardControlBlockPropsType) {
  const {
    isShow, setIsShow, onEdit, onCardDelete,
  } = props;
  const { EDIT, DELETE } = useCurrentLangPack();

  function closeControlBlock(event: React.TouchEvent | React.MouseEvent) {
    event.stopPropagation();
    setIsShow(false);
  }

  function onClickEdit(event:React.TouchEvent | React.MouseEvent) {
    event.stopPropagation();
    onEdit(true);
    setIsShow(false);
  }

  function onClickDelete(event:React.TouchEvent | React.MouseEvent) {
    event.stopPropagation();
    onCardDelete();
    setIsShow(false);
  }

  const activeClass = () => (isShow ? ACTIVE_CLASS : HIDE_CLASS);
  return (
  /* eslint-disable-next-line */
    <div
      className={`card__control-block control-block ${activeClass()}`}
      onClick={closeControlBlock}
    >
      <div className="control-block__body">
        <button
          className="control-block__button"
          type="button"
          onClick={onClickEdit}
        >
          {EDIT}
        </button>
        <button className="control-block__button" type="button" onClick={onClickDelete}>{DELETE}</button>
      </div>
    </div>
  );
}
