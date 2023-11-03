import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { updateCurrentPageName } from '../store/slicers/current-page-slice';
import { useCurrentLangPack } from '../store/selectors';

import { useCurrentCollectionId, useCardModeNewCard } from '../components/collection-page-context-provider/card-context-hooks';

import CardContentItem from '../components/cards/CardContentItem';
import CardUniversal from '../components/cards/CardUniversal';
import ButtonBase from '../components/base/ButtonBase';
import { useNeedCurrentCollectionUpdate } from '../components/global-context-provider/update-collection';

export default function NewCardPage() {
  const navigate = useNavigate();
  const { setIsCardModeNewCard } = useCardModeNewCard();
  const { setIsNeedCurrentCollectionUpdate } = useNeedCurrentCollectionUpdate();

  const dispatch = useDispatch();
  const { NEW_CARD_PAGE } = useCurrentLangPack();
  const collectionId = useCurrentCollectionId();

  useEffect(() => {
    dispatch(updateCurrentPageName(NEW_CARD_PAGE));
  }, [NEW_CARD_PAGE]);

  useEffect(() => {
    setIsCardModeNewCard(true);
  }, []);

  const gotoCollectionPage = () => {
    navigate(`/collections/${collectionId}`);
    setIsNeedCurrentCollectionUpdate(true);
  };

  return (
    <div className="content__list content__list--new-card-page">
      <CardContentItem ElementJSX={<CardUniversal />} />
      <div className="content__item">
        <div className="button-wrap">
          <ButtonBase
            onClickFunction={gotoCollectionPage}
            text="Вернуться к коллекции"
            classAdditional="button button--trans"
          />
        </div>
      </div>
    </div>
  );
}
