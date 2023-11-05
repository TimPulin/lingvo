import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useParams, Outlet } from 'react-router-dom';

import { updateCurrentPageName } from '../store/slicers/current-page-slice';
import { updateCurrentCardsCollection } from '../store/slicers/current-cards-collection-slice';

import { getCardsCollection } from '../connect/server-connections';
import { useUserToken } from '../store/selectors';

import { useStaticMessage } from '../components/global-context-provider/message-context';
import { IsDataLoading, useDataLoading } from '../components/global-context-provider/loading-context-hook';

import { useCurrentCollectionId } from '../components/collection-page-context-provider/card-context-hooks';

export type GetCardsCollectionLocalType = (
  userToken:string, collectionId:number, textOnResponse?: string
) => void;

export default function CollectionPage() {
  const params = useParams();
  const dispatch = useDispatch();
  const userToken = useUserToken();

  const { setText, setIsShow: setIsMessageShow } = useStaticMessage();
  const { setIsDataLoading } = useDataLoading();

  const { setCurrentCollectionId } = useCurrentCollectionId();

  function showMessage(textMessage:string) {
    setText(textMessage);
    setIsMessageShow(true);
  }

  const getCardsCollectionLocal:GetCardsCollectionLocalType = async (token, id, textOnResponse) => {
    try {
      setIsDataLoading(true);
      const response = await getCardsCollection(token, id);
      dispatch(updateCurrentPageName(response.data.name));
      dispatch(updateCurrentCardsCollection(response.data));

      if (textOnResponse) showMessage(textOnResponse);
    } catch (error) {
      // TODO поставить обработку, показать сообщение
      console.log(error);
    } finally {
      setIsDataLoading(false);
    }
  };

  useEffect(() => {
    const { id } = params;

    if (Number(id)) {
      setCurrentCollectionId(Number(id));
    } else if (!IsDataLoading) {
    // TODO перевести
      showMessage('Что-то пошло не так. Пожалуйста, вернитесь на страницу Коллекций');
    }

    if (userToken && Number(id)) {
      getCardsCollectionLocal(userToken, Number(id));
    } else if (!IsDataLoading) {
      // TODO перевести
      showMessage('Пожалуйста, авторизуйтесь');
    }
  }, [userToken]);

  return (
    <Outlet context={getCardsCollectionLocal} />
  );
}
