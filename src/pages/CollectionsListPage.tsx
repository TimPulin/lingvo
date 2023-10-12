import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { getCollectionsList } from '../connect/server-connections';
import { useCurrentLangPack, useUserToken } from '../store/selectors';
import { updateCurrentPageName } from '../store/slicers/current-page-slice';
import { updateUserToken } from '../store/slicers/user-token-slice';
import { CollectionsListType, CollectionType } from '../utils/types';
import CardCollection from '../components/cards/CardCollection';
import { setLocalStorageUserToken } from '../connect/local-storage-connections';
import ButtonPlus from '../components/button-plus/ButtonPlus';

export default function CollectionsListPage() {
  const [collectionsList, setCollectionsList] = useState<CollectionsListType>([]);
  const userToken = useUserToken();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { COLLECTIONS_PAGE } = useCurrentLangPack();

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
    navigate('/create-new-collection');
  };

  if (collectionsList.length === 0) {
    return (
      <div className="content__list">
        <div className="content__item collections">
          <p>
            Мы не нашли у вас коллекции карточек. Давайте создадим вашу первую коллекцию
          </p>
          <ButtonPlus classAdditional="collections__button-new" onClickFunction={gotoCreateCollectionPage} />
        </div>
      </div>
    );
  }

  return (
    <div className="content__list">
      <div className="content__item collections">
        <ButtonPlus classAdditional="collections__button-new" onClickFunction={gotoCreateCollectionPage} />

        <ul className="collections__list">
          {
            collectionsList.map((item:CollectionType) => (
              <li className="collections__item" key={item.id}>
                <CardCollection collection={item} />
              </li>
            ))
          }
        </ul>
      </div>
    </div>
  );
}
