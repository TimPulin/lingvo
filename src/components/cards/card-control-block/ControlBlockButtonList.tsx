import { useCurrentLangPack } from '../../../store/selectors';
import ControlBlockButton from './ControlBlockButton';

const ACTIVE_CLASS = 'control-block--active';
const HIDE_CLASS = 'control-block--hide';

type ControlBlockButtonsListPropsType = {
  isShow: boolean;
  setIsShow:React.Dispatch<React.SetStateAction<boolean>>;
  onEdit:React.Dispatch<React.SetStateAction<boolean>>;
  onDelete:() => void;
  JSXList: any[];
};

export default function ControlBlockButtonsList(props:ControlBlockButtonsListPropsType) {
  const {
    isShow, setIsShow, onEdit, onDelete, JSXList,
  } = props;
  const { EDIT, DELETE } = useCurrentLangPack();

  const closeControlBlock = (event: React.TouchEvent | React.MouseEvent) => {
    event.stopPropagation();
    setIsShow(false);
  };

  const onClickEdit = (event:React.TouchEvent | React.MouseEvent) => {
    event.stopPropagation();
    onEdit(true);
    setIsShow(false);
  };

  const onClickDelete = (event:React.TouchEvent | React.MouseEvent) => {
    event.stopPropagation();
    onDelete();
    setIsShow(false);
  };

  const activeClass = () => (isShow ? ACTIVE_CLASS : HIDE_CLASS);
  return (
  /* eslint-disable-next-line */
    <div
      className={`card__control-block control-block ${activeClass()}`}
      onClick={closeControlBlock}
    >
      <div className="control-block__body">
        <ControlBlockButton
          onClick={onClickEdit}
          buttonsText={EDIT}
        />
        <ControlBlockButton
          onClick={onClickDelete}
          buttonsText={DELETE}
        />

        {
          JSXList.map((JSXItem) => (
            JSXItem()
          ))
        }
      </div>
    </div>
  );
}
