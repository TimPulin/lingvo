import { useMemo, useState } from 'react';
import CardContentItem from '../components/cards/CardContentItem';
import Swiper from '../components/swiper/Swiper';
import { isCardModeEditContext, isNewPairWordSavedContext } from '../components/cards/card-context-hooks/card-context-hooks';

export default function CardsPage() {
  const isCardModeEdit = false;
  const [isNewPairWordSaved, setIsNewPairWordSaved] = useState(false);

  const newPairWordSaved = useMemo(() => ({
    isNewPairWordSaved, setIsNewPairWordSaved,
  }), [isNewPairWordSaved]);

  return (
    <isCardModeEditContext.Provider value={isCardModeEdit}>
      <isNewPairWordSavedContext.Provider value={newPairWordSaved}>
        <div className="content__list content__list--cards-list-page">
          <CardContentItem ElementJSX={<Swiper />} />
        </div>
      </isNewPairWordSavedContext.Provider>
    </isCardModeEditContext.Provider>
  );
}
