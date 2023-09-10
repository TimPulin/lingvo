import { useState, useEffect } from 'react';
import { useStaticMessage } from '../global-context-provider/context-hooks';
import { useNewPairWordSaved } from './card-context-hooks/card-context-hooks';

import { CONTENT_ITEM_HIDE, ANIMATION_SHOW_MESSAGE_DURATION, MESSAGE_SHOW_DURATION } from '../../utils/constants';

type CardPageBaseProps = {
  ElementJSX: any;
};

export default function CardContentItem(props: CardPageBaseProps) {
  const { ElementJSX } = props;

  const { isNewPairWordSaved, setIsNewPairWordSaved } = useNewPairWordSaved();

  const { setIsShow: setIsMessageShow, setText } = useStaticMessage();
  const [isCardShow, setIsCardShow] = useState(true);

  const cardAnimationClass = () => (isCardShow ? '' : CONTENT_ITEM_HIDE);

  function onNewPairWordSaved() {
    setIsCardShow(false);
    setTimeout(() => {
      setIsMessageShow(true);
      setText('Новую карточку бережно сохранили');
    }, 300);
    setTimeout(() => {
      setIsCardShow(true);
      setIsNewPairWordSaved(false);
    }, ANIMATION_SHOW_MESSAGE_DURATION * 2 + MESSAGE_SHOW_DURATION);
  }

  useEffect(() => {
    if (isNewPairWordSaved) onNewPairWordSaved();
  }, [isNewPairWordSaved]);

  return (

    <div className={`content__item ${cardAnimationClass()}`}>

      {ElementJSX}

    </div>
  );
}
