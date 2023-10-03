import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getCollectionsList } from '../connect/server-connections';
import { useCurrentLangPack, useUserToken } from '../store/selectors';
import { updateCurrentPageName } from '../store/slicers/current-page-slice';
import { CollectionsListType } from '../utils/types';

export default function CollectionsListPage() {
  const [collectionsList, setCollectionsList] = useState<CollectionsListType>([]);
  const userToken = useUserToken();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { COLLECTIONS_PAGE } = useCurrentLangPack();

  const classHide = () => (collectionsList.length > 0 ? 'hide' : '');

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
    navigate('/create-collection');
  };

  return (
    <div className="content__list">
      <div className={`content__item ${classHide()}`}>
        <p>
          Мы не нашли у вас коллекции карточек. Давайте создадим вашу первую коллекцию
        </p>
        <button className="button" type="button" onClick={gotoCreateCollectionPage}>Создать коллекцию</button>
      </div>
      {/* TODO сделать через ul */}
      <div className="content__item">
        {
          collectionsList.map((item:any) => (
            <div key={item.id}>
              {item.name}
            </div>
          ))
        }
      </div>
    </div>
  );
}
