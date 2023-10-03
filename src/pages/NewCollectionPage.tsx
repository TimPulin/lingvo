import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import CollectionForm from '../components/collection/CollectionForm';
import { useCurrentLangPack, useLanguagesList } from '../store/selectors';
import { updateCurrentPageName } from '../store/slicers/current-page-slice';

export default function CreateCollectionPage() {
  const dispatch = useDispatch();
  const { NEW_COLLECTION_PAGE } = useCurrentLangPack();
  const languagesList = useLanguagesList();

  useEffect(() => {
    dispatch(updateCurrentPageName(NEW_COLLECTION_PAGE));
  }, [NEW_COLLECTION_PAGE]);

  return (
    <div className="content__list">
      <div className="content__item">
        <CollectionForm languagesList={languagesList} />
      </div>
    </div>
  );
}
