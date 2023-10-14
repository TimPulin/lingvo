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

export default function CollectionPage() {
  const [currentCollectionId, setCurrentCollectionId] = useState<CurrentCollectionIdType>(null);
  const params = useParams();
  const dispatch = useDispatch();
  const userToken = useUserToken();
  const { setText, setIsShow: setIsStaticMessageShow } = useStaticMessage();
  const { isNeedCurrentCollectionUpdate, setIsNeedCurrentCollectionUpdate } = useNeedCurrentCollectionUpdate();

  useEffect(() => {
    console.log(isNeedCurrentCollectionUpdate);

    const { id } = params;
    setCurrentCollectionId(Number(id));
    if (userToken) {
      getCardsCollection(userToken, Number(id))
        .then((response) => {
          dispatch(updateCurrentPageName(response.data.name));
          dispatch(updateCurrentCardsCollection(response.data));
          setIsNeedCurrentCollectionUpdate(false);
        })
        .catch((error) => {
          // TODO поставить обработку, показать сообщение
          console.log(error);
        });
    } else {
      setText('Пожалуйста, авторизуйтесь');
      setIsStaticMessageShow(true);
    }
  }, [isNeedCurrentCollectionUpdate]);

  return (
    <currentCollectionIdContext.Provider value={currentCollectionId}>
      <Outlet />
    </currentCollectionIdContext.Provider>
  );
}
