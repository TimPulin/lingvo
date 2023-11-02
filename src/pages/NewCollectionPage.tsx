import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useCurrentLangPack, useLanguagesList, useUserToken } from '../store/selectors';
import { useStaticMessage, staticMessagePromise } from '../components/global-context-provider/message-context';
import { updateCurrentPageName } from '../store/slicers/current-page-slice';
import { addCollection } from '../connect/server-connections';
import { useDataLoading } from '../components/global-context-provider/loading-context-hook';

import { CollectionFormType } from '../utils/types';
import CollectionForm from '../components/collection/CollectionForm';

export default function CreateCollectionPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { NEW_COLLECTION_PAGE } = useCurrentLangPack();
  const languagesList = useLanguagesList();
  const userToken = useUserToken();
  const { setIsShow: setIsShowMessage, setText: setTextMessage } = useStaticMessage();
  const { setIsDataLoading } = useDataLoading();

  useEffect(() => {
    dispatch(updateCurrentPageName(NEW_COLLECTION_PAGE));
  }, [NEW_COLLECTION_PAGE]);

  const addNewCollection = async (collectionData:CollectionFormType) => {
    if (userToken) {
      try {
        setIsDataLoading(true);
        const response = await addCollection(userToken, collectionData);
        // TODO перевести
        setTextMessage('Новая коллекция сохранена');
        staticMessagePromise(setIsShowMessage, true)
          .then(() => navigate(`/collections/${response.data.id}`));
      } catch (error) {
        console.log(error);
      } finally {
        setIsDataLoading(false);
      }
    }
  };

  return (
    <div className="content__list content__list--single-top">
      <div className="content__item">
        <CollectionForm
          onSubmitFunction={addNewCollection}
          languagesList={languagesList}
        />
      </div>
    </div>
  );
}
