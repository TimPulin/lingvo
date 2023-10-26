import { useState } from 'react';
import ThreeDots from './ThreeDots';
import ControlBlockButtonsList from './ControlBlockButtonList';

type CardControlBlockType = {

  JSXList?: any[];
  onEdit:React.Dispatch<React.SetStateAction<boolean>> | (() => void) ;
  onDelete:() => void;
};

export default function CardControlBlock(props:CardControlBlockType) {
  const { JSXList = [], onEdit, onDelete } = props;

  const [isControlBlockShow, setIsControlBlockShow] = useState(false);

  const onCallControlBlock = (event: React.MouseEvent) => {
    event.stopPropagation();
    setIsControlBlockShow(true);
  };
  return (
    <>
      <ThreeDots
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
  JSXList: [],
};
