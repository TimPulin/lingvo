import { Form, Input, Select } from 'antd';
import type { DefaultOptionType } from 'antd/es/select';
import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { useCurrentLangPack } from '../../store/selectors';
import { CollectionFormType } from '../../utils/types';

export type CollectionFormPropsType = {
  languagesList:DefaultOptionType[];
  formState?: CollectionFormType;
  modeEditCollection?: boolean;
  onSubmitFunction: (collectionData:CollectionFormType) => void;
  onResetFunction: () => void;
};

const formInitialState:CollectionFormType = {
  name: '',
  description: '',
  languageId: 2,
  translationLanguageId: 3,
};

export default function CollectionForm(props:CollectionFormPropsType) {
  const { CANCEL, SAVE } = useCurrentLangPack();
  const {
    languagesList, formState = formInitialState, onSubmitFunction, onResetFunction, modeEditCollection = false,
  } = props;
  const [localNativeLanguageList, setLocalNativeLanguageList] = useState(languagesList);
  const [localForeignLanguageList, setLocalForeignLanguageList] = useState(languagesList);
  const {
    NATIVE_LANGUAGE_COLLECTION, FOREIGN_LANGUAGE_COLLECTION, COLLECTION_NAME, COLLECTION_DESCRIPTION,
  } = useCurrentLangPack();

  const disableLanguageSelect = () => (modeEditCollection);

  const formik = useFormik({
    initialValues: formState,
    onSubmit(values) {
      onSubmitFunction(values);
    },
    onReset() {
      onResetFunction();
    },
  });

  useEffect(() => {
    if (formState) {
      formik.setValues(formState);
    }
  }, [formState]);

  const filterLanguageList = (value:string) => {
    const list = languagesList.filter((item) => {
      let result = false;
      if (item.label) {
        if (typeof item.label === 'string') {
          if (item.label.toLowerCase().includes(value.toLowerCase())) {
            result = true;
          }
        }
      }
      return result;
    });
    return list;
  };

  const bouncer = (
    incomingFunction: React.Dispatch<React.SetStateAction<DefaultOptionType[]>>,
    value: string,
  ) => {
    let searchTimer:NodeJS.Timeout | null = null;
    if (searchTimer) clearTimeout(searchTimer);
    if (value) {
      searchTimer = setTimeout(() => {
        incomingFunction(filterLanguageList(value));
      }, 300);
    } else {
      incomingFunction(languagesList);
    }
  };

  const onSearchSelectNativeLanguage = (value: string) => {
    bouncer(setLocalNativeLanguageList, value);
  };

  const onSearchSelectForeignLanguage = (value: string) => {
    bouncer(setLocalForeignLanguageList, value);
  };

  return (
    <div>
      <Form
        className="form collection-form"
        onSubmitCapture={formik.handleSubmit}
      >
        <div className="collection-form__languages-list-wrap">
          <label className="collection-form__label label">
            <span>{NATIVE_LANGUAGE_COLLECTION}</span>
            <Form.Item>
              <Select
                className="collection-form__select"
                options={localNativeLanguageList}
                filterOption={false}
                value={formik.values.languageId}
                onSearch={onSearchSelectNativeLanguage}
                onChange={(value) => { formik.handleChange({ target: { name: 'languageId', value } }); }}
                showSearch
                disabled={disableLanguageSelect()}
              />
            </Form.Item>
          </label>
          <label className="collection-form__label label">
            <span>{FOREIGN_LANGUAGE_COLLECTION}</span>
            <Form.Item>
              <Select
                aria-required
                className="collection-form__select"
                options={localForeignLanguageList}
                filterOption={false}
                value={formik.values.translationLanguageId}
                onSearch={onSearchSelectForeignLanguage}
                onChange={(value) => { formik.handleChange({ target: { name: 'translationLanguageId', value } }); }}
                showSearch
                disabled={disableLanguageSelect()}
              />
            </Form.Item>
          </label>
        </div>
        <label className="collection-form__label label">
          <span>{COLLECTION_NAME}</span>
          <Input
            required
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            maxLength={40}
          />
        </label>
        <label className="collection-form__label label">
          <span>{COLLECTION_DESCRIPTION}</span>
          <Input name="description" value={formik.values.description} onChange={formik.handleChange} maxLength={80} />
        </label>
        <div className="form__footer">
          <button type="button" className="button button--trans button--warning" onClick={formik.handleReset}>{CANCEL}</button>
          <button type="submit" className="button button--trans">{SAVE}</button>
        </div>
      </Form>
    </div>
  );
}

CollectionForm.defaultProps = {
  formState: formInitialState,
  modeEditCollection: false,
};
