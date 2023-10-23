import { Form, Input, Select } from 'antd';
import type { DefaultOptionType } from 'antd/es/select';
import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { useCurrentLangPack } from '../../store/selectors';
import { CollectionFormType } from '../../utils/types';

export type CollectionFormPropsType = {
  languagesList:DefaultOptionType[];
  formState?: CollectionFormType;
  onSubmitFunction: (collectionData:CollectionFormType) => void;
};

const formInitialState:CollectionFormType = {
  name: '',
  description: '',
  languageId: 2,
  translationLanguageId: 3,
};

export default function CollectionForm(props:CollectionFormPropsType) {
  const { CANCEL, SAVE } = useCurrentLangPack();
  const { languagesList, formState = formInitialState, onSubmitFunction } = props;
  const [localNativeLanguageList, setLocalNativeLanguageList] = useState(languagesList);
  const [localForeignLanguageList, setLocalForeignLanguageList] = useState(languagesList);

  const formik = useFormik({
    initialValues: formState,
    onSubmit(values) {
      onSubmitFunction(values);
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
            {/* TODO перевести */}
            <span>Родной язык&nbsp;коллекции</span>
            <Form.Item>
              <Select
                className="collection-form__select"
                options={localNativeLanguageList}
                filterOption={false}
                value={formik.values.languageId}
                onSearch={onSearchSelectNativeLanguage}
                onChange={(value) => { formik.handleChange({ target: { name: 'languageId', value } }); }}
                showSearch
              />
            </Form.Item>
          </label>
          <label className="collection-form__label label">
            {/* TODO перевести */}
            <span>Иностранный язык&nbsp;коллекции</span>
            <Form.Item>
              <Select
                aria-required
                className="collection-form__select"
                options={localForeignLanguageList}
                value={formik.values.translationLanguageId}
                onSearch={onSearchSelectForeignLanguage}
                onChange={(value) => { formik.handleChange({ target: { name: 'translationLanguageId', value } }); }}
                showSearch
              />
            </Form.Item>
          </label>
        </div>
        <label className="collection-form__label label">
          {/* TODO перевести */}
          <span>Название коллекции</span>
          <Input required name="name" value={formik.values.name} onChange={formik.handleChange} />
        </label>
        <label className="collection-form__label label">
          {/* TODO перевести */}
          <span>Описание коллекции</span>
          <Input name="description" value={formik.values.description} onChange={formik.handleChange} />
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
};
