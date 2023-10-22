import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CollectionForm from '../components/collection/CollectionForm';
import { useCurrentLangPack, useLanguagesList, useUserToken } from '../store/selectors';
import { useStaticMessage, staticMessagePromise } from '../components/global-context-provider/context-hooks';
import { updateCurrentPageName } from '../store/slicers/current-page-slice';
import { CollectionFormType } from '../utils/types';
import { addCollection } from '../connect/server-connections';

export default function CreateCollectionPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { NEW_COLLECTION_PAGE } = useCurrentLangPack();
  const languagesList = useLanguagesList();
  const userToken = useUserToken();
  const { setIsShow: setIsShowMessage, setText: setTextMessage } = useStaticMessage();

  useEffect(() => {
    dispatch(updateCurrentPageName(NEW_COLLECTION_PAGE));
  }, [NEW_COLLECTION_PAGE]);

  const addNewCollection = async (collectionData:CollectionFormType) => {
    if (userToken) {
      try {
        const response = await addCollection(userToken, collectionData);
        // TODO перевести
        setTextMessage('Новая коллекция сохранена');
        staticMessagePromise(setIsShowMessage, true)
          .then(() => navigate(`/collections/${response.data.id}`));
      } catch (error) {
        console.log(error);
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
