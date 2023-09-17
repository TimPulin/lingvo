const ACTIVE_CLASS = 'control-block--active';
const HIDE_CLASS = 'control-block--hide';

type CardControlBlockPropsType = {
  isShow: boolean;
  setIsShow:React.Dispatch<React.SetStateAction<boolean>>;
  onEdit:React.Dispatch<React.SetStateAction<boolean>>;
};

export default function CardControlBlock(props:CardControlBlockPropsType) {
  const { isShow, setIsShow, onEdit } = props;

  function closeControlBlock(event: React.TouchEvent | React.MouseEvent) {
    event.stopPropagation();
    setIsShow(false);
  }

  function onClickEdit(event:React.TouchEvent | React.MouseEvent) {
    event.stopPropagation();
    onEdit(true);
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
          Edit
        </button>
        <button className="control-block__button" type="button">Delete</button>
      </div>
    </div>
  );
}
