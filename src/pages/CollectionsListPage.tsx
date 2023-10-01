import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getCollectionsList } from '../connect/server-connections';
import { useCurrentLangPack } from '../store/selectors';
import { updateCurrentPageName } from '../store/current-page-slice';
import { CollectionsListType } from '../utils/types';

/* eslint-disable-next-line */
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsInVzZXJuYW1lIjoi0KLQtdC50LzRg9GA0LDQtyDQn9GD0LvQuNC9IiwiZW1haWwiOiJ0aW1wdXZrY29tQGdtYWlsLmNvbSIsImlhdCI6MTY5NjE5NTk1MywiZXhwIjoxNjk2MjgyMzUzfQ.JtwGhaPdjzLU77aSzDy5SbMPIuobaJLmzvOoX-NNLDQ';

export default function CollectionsListPage() {
  const [collectionsList, setCollectionsList] = useState<CollectionsListType>([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { COLLECTIONS_PAGE } = useCurrentLangPack();

  const classHide = () => (collectionsList.length > 0 ? 'hide' : '');

  function getCollectionsListLocal() {
    getCollectionsList(token)
      .then((response) => {
        setCollectionsList(response.data.data);
      })
      .catch((error) => {
        console.log(error); /* TODO обработать ошибку */
      });
  }

  useEffect(() => {
    dispatch(updateCurrentPageName(COLLECTIONS_PAGE));
  }, [COLLECTIONS_PAGE]);

  useEffect(() => {
    getCollectionsListLocal();
  });

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
