import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Form, Input } from 'antd';
import LanguageSelect from '../components/form/LanguageSelect';
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
        <Form>
          <Input />
          <LanguageSelect options={languagesList} />
        </Form>
      </div>
    </div>
  );
}
