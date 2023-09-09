/* eslint-disable @typescript-eslint/naming-convention */

import { useState } from 'react';
import { useStaticMessage } from '../components/context-provider/context-hooks';
import CardUniversal from '../components/cards/CardUniversal';
import BigButton from '../components/BigButton/BigButton';

export default function NewCardPage() {
  const { setIsShow, setText } = useStaticMessage();
  const [isNewPairWordSaved, _setIsNewPairWordSaved] = useState(false);

  const cardAnimationClass = () => (isNewPairWordSaved ? 'hide' : '');

  const setIsNewPairWordSaved = (isSaved: boolean) => {
    _setIsNewPairWordSaved(isSaved);
    setIsShow(true);
    setText('Новую карточку бережно сохранили');
  };

  return (
    <div className="page-content-wrapper page-content-wrapper--new-card-page">
      <div className={`page-content-wrapper_item ${cardAnimationClass()}`}>
        <CardUniversal
          isModeEdit
          setIsNewPairWordSaved={setIsNewPairWordSaved}
        />
      </div>
      <BigButton />
    </div>
  );
}
