/* eslint-disable @typescript-eslint/naming-convention */

import { useState } from 'react';
import CardUniversal from '../components/cards/CardUniversal';
import { useStaticMessage } from '../components/context-provider/context-hooks';
import Message from '../components/message/Message';

export default function NewCardPage() {
  const { setIsShow } = useStaticMessage();
  const [isNewPairWordSaved, _setIsNewPairWordSaved] = useState(false);

  const cardAnimationClass = () => (isNewPairWordSaved ? 'hide' : '');

  const setIsNewPairWordSaved = (isSaved: boolean) => {
    _setIsNewPairWordSaved(isSaved);
    setIsShow(true);
  };

  return (
    <div className="page-content-wrapper page-content-wrapper--new-card-page">
      <div className={`page-content-wrapper_item ${cardAnimationClass()}`}>
        <CardUniversal
          isModeEdit
          setIsNewPairWordSaved={setIsNewPairWordSaved}
        />
      </div>
      <Message text="Новую карточку бережно сохранили" />

    </div>
  );
}
