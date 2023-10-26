import { useEffect, useRef } from 'react';
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
  const hideClassRef = useRef('');

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

  // СТАРТ блокировка отрисовки
  // чтобы анимация закрытия блока кнопок не срабатывала при первой отрисовки
  const componentRenderedRef = useRef(false);

  useEffect(() => {
    setTimeout(() => {
      componentRenderedRef.current = true;
    }, 1000);
  }, []);

  useEffect(() => {
    if (componentRenderedRef.current) hideClassRef.current = HIDE_CLASS;
  }, [isShow]);
  // ФИНИШ блокировка отрисовки

  const activeClass = () => (isShow ? ACTIVE_CLASS : hideClassRef.current);
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
