import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useCurrentLangPack } from '../store/selectors';
import { updateCurrentPageName } from '../store/current-page-slice';

export default function CreateCollectionPage() {
  const dispatch = useDispatch();
  const { NEW_COLLECTION_PAGE } = useCurrentLangPack();

  useEffect(() => {
    dispatch(updateCurrentPageName(NEW_COLLECTION_PAGE));
  }, [NEW_COLLECTION_PAGE]);

  return (
    <div>
      new collection
    </div>
  );
}
