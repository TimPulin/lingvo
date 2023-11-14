import { useEffect } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { updateCurrentPageName } from '../store/slicers/current-page-slice';
import { useCurrentLangPack, useUserToken } from '../store/selectors';

import { useStaticMessage } from '../components/global-context-provider/message-context';
import { useDataLoading } from '../components/global-context-provider/loading-context-hook';
import { useCurrentCollectionId, useCardModeNewCard } from '../components/collection-page-context-provider/card-context-hooks';

import { addCard } from '../connect/server-connections';

import CardUniversal from '../components/cards/CardUniversal';
import ButtonBase from '../components/base/ButtonBase';

import { OnSaveCardArgumentsType } from '../utils/types';
import { GetCardsCollectionLocalType } from './CollectionPage';

export default function NewCardPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const getCardsCollectionLocal:GetCardsCollectionLocalType = useOutletContext();

  const userToken = useUserToken();
  const langPack = useCurrentLangPack();
  const { setIsCardModeNewCard } = useCardModeNewCard();
  const { setText, setIsShow: setIsMessageShow } = useStaticMessage();

  const { NEW_CARD_PAGE } = useCurrentLangPack();
  const { currentCollectionId } = useCurrentCollectionId();
  const { setIsDataLoading } = useDataLoading();

  const { CANT_CHANGE_NEW_CARD } = useCurrentLangPack();

  function showMessage(textMessage:string) {
    setText(textMessage);
    setIsMessageShow(true);
  }

  const onSaveCard = async ({ newWord }:OnSaveCardArgumentsType) => {
    if (userToken && currentCollectionId && newWord) {
      try {
        setIsDataLoading(true);
        await addCard(userToken, currentCollectionId, newWord);
        showMessage(langPack.CARD_SAVED);
      } catch (error) {
        console.log(error);
        showMessage(CANT_CHANGE_NEW_CARD);
      } finally {
        setIsDataLoading(false);
      }
    }
  };

  useEffect(() => {
    dispatch(updateCurrentPageName(NEW_CARD_PAGE));
  }, [NEW_CARD_PAGE]);

  useEffect(() => {
    setIsCardModeNewCard(true);
  }, []);

  const gotoCollectionPage = () => {
    navigate(`/collection/${currentCollectionId}`);
    if (userToken && currentCollectionId) getCardsCollectionLocal(userToken, currentCollectionId);
  };

  return (
    <div className="content__list content__list--new-card-page">
      <div className="content__item">
        <CardUniversal onSaveCard={onSaveCard} />
      </div>
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
