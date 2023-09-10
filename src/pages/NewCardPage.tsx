/* eslint-disable @typescript-eslint/naming-convention */

import { useState, useEffect } from 'react';
import { useStaticMessage } from '../components/context-provider/context-hooks';
import CardUniversal from '../components/cards/CardUniversal';

import { CONTENT_ITEM_HIDE, ANIMATION_SHOW_MESSAGE_DURATION, MESSAGE_SHOW_DURATION } from '../utils/constants';

export default function NewCardPage() {
  const [isNewPairWordSaved, setIsNewPairWordSaved] = useState(false);
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
    <div className="content__list content__list--new-card-page">
      <div className={`content__item ${cardAnimationClass()}`}>
        <CardUniversal
          isModeEdit
          setIsNewPairWordSaved={setIsNewPairWordSaved}
        />
      </div>
    </div>
  );
}
