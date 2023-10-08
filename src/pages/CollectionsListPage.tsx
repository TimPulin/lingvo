import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getCollectionsList } from '../connect/server-connections';
import { useCurrentLangPack, useUserToken } from '../store/selectors';
import { updateCurrentPageName } from '../store/slicers/current-page-slice';
import { CollectionsListType, CollectionType } from '../utils/types';
import CardCollection from '../components/cards/CardCollection';

export default function CollectionsListPage() {
  const [collectionsList, setCollectionsList] = useState<CollectionsListType>([]);
  const userToken = useUserToken();
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
    dispatch(updateCurrentPageName(COLLECTIONS_PAGE));
  }, [COLLECTIONS_PAGE]);

  useEffect(() => {
    getCollectionsListLocal();
  }, []);

  const gotoCreateCollectionPage = () => {
    navigate('/create-new-collection');
  };

  if (collectionsList.length === 0) {
    return (
      <div className="content__list">
        <div className="content__item collections">
          <button className="button collections__button-new " type="button" onClick={gotoCreateCollectionPage}>Создать коллекцию</button>
          <p>
            Мы не нашли у вас коллекции карточек. Давайте создадим вашу первую коллекцию
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="content__list">
      <div className="content__item collections">
        <button className="button collections__button-new " type="button" onClick={gotoCreateCollectionPage}>Создать коллекцию</button>

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
