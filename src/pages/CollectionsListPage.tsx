import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { getCollectionsList, deleteCollection } from '../connect/server-connections';
import { useCurrentLangPack, useUserToken } from '../store/selectors';
import { updateCurrentPageName } from '../store/slicers/current-page-slice';
import { updateUserToken } from '../store/slicers/user-token-slice';
import { CollectionsListType, CollectionType } from '../utils/types';
import CardCollection from '../components/cards/CardCollection';
import { setLocalStorageUserToken } from '../connect/local-storage-connections';
import ButtonPlus from '../components/base/buttons/button-plus/ButtonPlus';
import MessageOnPage from '../components/message/MessageOnPage';
import { useStaticMessage } from '../components/global-context-provider/context-hooks';

export default function CollectionsListPage() {
  const [collectionsList, setCollectionsList] = useState<CollectionsListType>([]);
  const userToken = useUserToken();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { COLLECTIONS_PAGE } = useCurrentLangPack();
  const { setText, setIsShow: setIsMessageShow } = useStaticMessage();

  function getCollectionsListLocal() {
    if (userToken) {
      getCollectionsList(userToken)
        .then((response) => {
          setCollectionsList(response.data.data);
        })
        .catch((error) => {
          console.log(error); /* TODO обработать ошибку */
        });
    }
  }

  const onCollectionDelete = async (collectionId:number) => {
    if (userToken) {
      try {
        await deleteCollection(userToken, collectionId);
        // TODO перевести
        setText('Коллекция аккуратно удалена');
        setIsMessageShow(true);
        getCollectionsListLocal();
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    const { search } = location;
    const token = new URLSearchParams(search).get('access_token');
    if (token) {
      dispatch(updateUserToken(token));
      setLocalStorageUserToken(token);
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

  if (collectionsList.length === 0) {
    return (
      <MessageOnPage
        messageText="Мы не нашли у вас коллекции карточек. Давайте создадим вашу первую коллекцию"
        ElementJSX={<ButtonPlus classAdditional="collections__button-new" onClickFunction={gotoCreateCollectionPage} />}
      />
    );
  }

  return (

    <div className="content__list">
      <div className="content__item collections">
        {/* TODO увеличить index в collections__button-new--fixed */}
        <ButtonPlus classAdditional="collections__button-new--fixed" onClickFunction={gotoCreateCollectionPage} />

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
