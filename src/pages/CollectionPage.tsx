import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { useParams, Outlet } from 'react-router-dom';
import { updateCurrentPageName } from '../store/slicers/current-page-slice';
import { updateCurrentCardsCollection } from '../store/slicers/current-cards-collection-slice';
import {
  currentCollectionIdContext,
  CurrentCollectionIdType,
} from '../components/cards/card-context-hooks/card-context-hooks';
import { getCardsCollection } from '../connect/server-connections';
import { useUserToken } from '../store/selectors';
import { useStaticMessage } from '../components/global-context-provider/context-hooks';
import { useNeedCurrentCollectionUpdate } from '../components/global-context-provider/update-collection';
import { useDataLoading } from '../components/global-context-provider/loading-context-hook';

export default function CollectionPage() {
  const [currentCollectionId, setCurrentCollectionId] = useState<CurrentCollectionIdType>(null);
  const params = useParams();
  const dispatch = useDispatch();
  const userToken = useUserToken();
  const { setText, setIsShow: setIsStaticMessageShow } = useStaticMessage();
  const { isNeedCurrentCollectionUpdate, setIsNeedCurrentCollectionUpdate } = useNeedCurrentCollectionUpdate();
  const { setIsDataLoading } = useDataLoading();

  const getCardsCollectionLocal = async (token:string, id:number) => {
    try {
      setIsDataLoading(true);
      const response = await getCardsCollection(token, id);
      dispatch(updateCurrentPageName(response.data.name));
      dispatch(updateCurrentCardsCollection(response.data));
    } catch (error) {
      // TODO поставить обработку, показать сообщение
      console.log(error);
    } finally {
      setIsDataLoading(false);
    }
  };

  useEffect(() => {
    const { id } = params;
    setCurrentCollectionId(Number(id));
    setIsStaticMessageShow(false);
    if (userToken) {
      getCardsCollectionLocal(userToken, Number(id));
      setIsNeedCurrentCollectionUpdate(false);
    } else {
      setText('Пожалуйста, авторизуйтесь');
      setIsStaticMessageShow(true);
    }
  }, [isNeedCurrentCollectionUpdate, userToken]);

  return (
    <currentCollectionIdContext.Provider value={currentCollectionId}>
      <Outlet />
    </currentCollectionIdContext.Provider>
  );
}
