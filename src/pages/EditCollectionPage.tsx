import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCardsCollection, useLanguagesList, useUserToken } from '../store/selectors';
import { editCollection } from '../connect/server-connections';
import { useStaticMessage, staticMessagePromise } from '../components/global-context-provider/message-context';
import { CollectionFormType } from '../utils/types';
import CollectionForm from '../components/collection/CollectionForm';

export default function EditCollectionPage() {
  const navigate = useNavigate();
  const languagesList = useLanguagesList();
  const currentCollection = useCardsCollection();
  const userToken = useUserToken();
  const { setText: setTextMessage, setIsShow: setIsShowMessage } = useStaticMessage();
  const [collectionFormState, setCollectionFormState] = useState<CollectionFormType | undefined>(undefined);

  useEffect(() => {
    if (currentCollection) {
      setCollectionFormState({
        name: currentCollection.name,
        description: currentCollection.description,
        languageId: currentCollection.languageId,
        translationLanguageId: currentCollection.translationLanguageId,
      });
    }
  }, [currentCollection]);

  const editCurrentCollection = async (collectionData: CollectionFormType) => {
    if (userToken && currentCollection) {
      try {
        await editCollection(userToken, currentCollection.id, collectionData);
        // TODO перевести
        setTextMessage('Изменения сохранены');
        staticMessagePromise(setIsShowMessage, true)
          // .then(() => navigate(`/collection/${response.data.id}`));
          .then(() => {
            navigate('/collections');
          });
      } catch (error) {
        console.log(error);
      }
    }
  };

  const onResetCollectionForm = () => {
    navigate('/collections');
  };

  return (
    <div className="content__list content__list--single-top">
      <div className="content__item">
        <CollectionForm
          languagesList={languagesList}
          formState={collectionFormState}
          onSubmitFunction={editCurrentCollection}
          onResetFunction={onResetCollectionForm}
          modeEditCollection
        />
      </div>
    </div>
  );
}
