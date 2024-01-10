import { useEffect, useState } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { RadioChangeEvent } from 'antd';
import { updateCurrentPageName } from '../store/slicers/current-page-slice';
import { useCurrentLangPack, useUserToken } from '../store/selectors';

import { useStaticMessage } from '../components/global-context-provider/message-context';
import { useDataLoading } from '../components/global-context-provider/loading-context-hook';
import { useCurrentCollectionId, useCardModeNewCard } from '../components/collection-page-context-provider/card-context-hooks';

import { addCard } from '../connect/server-connections';

import ButtonBase from '../components/base/ButtonBase';
import RadioAntGroup from '../components/radio/radio-ant-group/RadioAntGroup';

import { OnSaveCardArgumentsType } from '../utils/types';
import { GetCardsCollectionLocalType } from './CollectionPage';
import ArrowLeftIcon from '../components/icons/ArrowLeftIcon';
import NewCardPageForm from '../components/new-card-page-form/NewCardPageForm';

/* TODO перевести */
const formStyleOptions = [
  { label: 'Modern', value: 0 },
  { label: 'Classic', value: 1 },
];

export default function NewCardPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const getCardsCollectionLocal:GetCardsCollectionLocalType = useOutletContext();

  const userToken = useUserToken();
  const { setIsCardModeNewCard } = useCardModeNewCard();
  const { setText, setIsShow: setIsMessageShow } = useStaticMessage();

  const {
    NEW_CARD_PAGE, CARD_SAVED, CANT_SAVE_NEW_CARD, BACK_TO_COLLECTION,
    // NATIVE, FOREIGN, TRANSCRIPTION, FORWARD, SAVE,
  } = useCurrentLangPack();
  const { currentCollectionId } = useCurrentCollectionId();
  const { setIsDataLoading } = useDataLoading();

  const [formStyle, setFormStyle] = useState(0);

  function showMessage(textMessage:string) {
    setText(textMessage);
    setIsMessageShow(true);
  }

  const onSaveCard = async ({ newWord }:OnSaveCardArgumentsType) => {
    if (userToken && currentCollectionId && newWord) {
      try {
        setIsDataLoading(true);
        await addCard(userToken, currentCollectionId, newWord);
        showMessage(CARD_SAVED);
      } catch (error) {
        console.log(error);
        showMessage(CANT_SAVE_NEW_CARD);
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

  const onStyleFormOptionsChange = (event: RadioChangeEvent) => {
    setFormStyle(event.target.value);
  };

  return (
    <div className="content__list content__list--new-card-page">
      <div className="content__item">
        <div className="button-wrap">
          <RadioAntGroup
            optionsList={formStyleOptions}
            defaultValue={formStyle}
            onChange={onStyleFormOptionsChange}
          />
        </div>
      </div>
      <NewCardPageForm
        onSaveCard={onSaveCard}
        formStyle={formStyle}

      />
      <div className="content__item">
        <div className="button-wrap">
          <ButtonBase
            onClickFunction={gotoCollectionPage}
            text={BACK_TO_COLLECTION}
            classAdditional="button button--trans"
            ElementJSX={<ArrowLeftIcon />}
          />
        </div>
      </div>
    </div>
  );
}
