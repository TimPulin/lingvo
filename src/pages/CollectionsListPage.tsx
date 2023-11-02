import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { useCurrentLangPack, useUserToken } from '../store/selectors';
import { useStaticMessage } from '../components/global-context-provider/message-context';
import { useDataLoading } from '../components/global-context-provider/loading-context-hook';

import { getCollectionsList, deleteCollection } from '../connect/server-connections';
import { updateCurrentPageName } from '../store/slicers/current-page-slice';
import { updateUserToken } from '../store/slicers/user-token-slice';
import { setLocalStorageUserToken } from '../connect/local-storage-connections';
import { CollectionsListType, CollectionType } from '../utils/types';

import ButtonPlus from '../components/base/buttons/button-plus/ButtonPlus';
import MessageOnPage from '../components/message/MessageOnPage';
import CardCollection from '../components/cards/CardCollection';

export default function CollectionsListPage() {
  const [collectionsList, setCollectionsList] = useState<CollectionsListType>([]);
  const userToken = useUserToken();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { COLLECTIONS_PAGE } = useCurrentLangPack();

  const { setText, setIsShow: setIsMessageShow } = useStaticMessage();
  const { isDataLoading, setIsDataLoading } = useDataLoading();

  const getCollectionsListLocal = async () => {
    if (userToken) {
      try {
        setIsDataLoading(true);
        const response = await getCollectionsList(userToken);
        setCollectionsList(response.data.data);
      } catch (error) {
        console.log(error); /* TODO обработать ошибку */
      } finally {
        setIsDataLoading(false);
      }
    }
  };

  const onCollectionDelete = async (collectionId:number) => {
    if (userToken) {
      try {
        setIsDataLoading(true);
        await deleteCollection(userToken, collectionId);
        // TODO перевести
        setText('Коллекция аккуратно удалена');
        setIsMessageShow(true);
        getCollectionsListLocal();
      } catch (error) {
        console.log(error);
      } finally {
        setIsDataLoading(false);
      }
    }
  };

  useEffect(() => {
    const { search } = location;
    const token = new URLSearchParams(search).get('access_token');
    if (token) {
      dispatch(updateUserToken(token));
      setLocalStorageUserToken(token);
      navigate('/collections');
    }
  }, []);

  useEffect(() => {
    dispatch(updateCurrentPageName(COLLECTIONS_PAGE));
  }, [COLLECTIONS_PAGE]);

  useEffect(() => {
    getCollectionsListLocal();
  }, [userToken]);

  const gotoCreateCollectionPage = () => {
    navigate('/collections/create-new-collection');
  };

  if (collectionsList.length === 0 && !isDataLoading) {
    return (
      <MessageOnPage
        messageText="Мы не нашли у вас коллекции карточек. Давайте создадим вашу первую коллекцию"
        ElementJSX={<ButtonPlus classAdditional="collections__button-new" onClickFunction={gotoCreateCollectionPage} />}
      />
    );
  }

  return (
    <div className="content__list">
      <div className="wrapper-position-fixed">
        <ButtonPlus classAdditional="button-plus--add-new" onClickFunction={gotoCreateCollectionPage} />
      </div>
      <div className="content__item collections">
        <ul className="collections__list">
          {
            collectionsList.map((item:CollectionType) => (
              <li className="collections__item" key={item.id}>
                <CardCollection
                  collection={item}
                  onCollectionDelete={onCollectionDelete}
                />
              </li>
            ))
          }
        </ul>
      </div>
    </div>

  );
}
