import { useEffect, useState } from 'react';
import ThreeDots from './ThreeDots';
import ControlBlockButtonsList from './ControlBlockButtonList';

type CardControlBlockType = {
  isCardStartTurn?: boolean;
  JSXList?: any[];
  onEdit:React.Dispatch<React.SetStateAction<boolean>> | (() => void) ;
  onDelete:() => void;
};
const THREE_DOTS_HIDE = 'three-dots--hide';

export default function CardControlBlock(props:CardControlBlockType) {
  const {
    isCardStartTurn = false, JSXList = [], onEdit, onDelete,
  } = props;

  const [isControlBlockShow, setIsControlBlockShow] = useState(false);
  const [isThreeDotsHide, setIsThreeDotsHide] = useState(false);

  const threeDotsHide = () => (isThreeDotsHide ? THREE_DOTS_HIDE : 'false');

  useEffect(() => {
    // console.log(isControlBlockShow, isCardStartTurn, threeDotsHide());

    if (isCardStartTurn) {
      setIsThreeDotsHide(true);
      console.log(isCardStartTurn, threeDotsHide());

      setTimeout(() => {
        setIsThreeDotsHide(false);
      }, 500);
    }
  }, [isCardStartTurn]);

  const onCallControlBlock = (event: React.MouseEvent) => {
    event.stopPropagation();
    setIsControlBlockShow(true);
  };
  return (
    <>
      <ThreeDots
        classHide={threeDotsHide}
        onClick={onCallControlBlock}
      />
      <ControlBlockButtonsList
        isShow={isControlBlockShow}
        setIsShow={setIsControlBlockShow}
        onEdit={onEdit}
        onDelete={onDelete}
        JSXList={JSXList}
      />
    </>
  );
}

CardControlBlock.defaultProps = {
  isCardStartTurn: false,
  JSXList: [],
};
