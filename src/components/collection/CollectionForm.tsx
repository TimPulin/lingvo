import { Form, Input, Select } from 'antd';
import type { DefaultOptionType } from 'antd/es/select';
import { useFormik } from 'formik';
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
  const formik = useFormik({
    initialValues: formState,
    onSubmit(values) {
      onSubmitFunction(values);
    },
  });

  /* TODO языковые переменные */
  /* TODO понять как работает search */
  return (
    <div>
      <Form
        className="form form-cards-collection"
        onSubmitCapture={formik.handleSubmit}
        initialValues={{
          languageId: formik.values.languageId,
          translationLanguageId: formik.values.translationLanguageId,
        }}
      >
        <div className="form-cards-collection__languages-list-wrap">
          <label className="form-cards-collection__label label">
            <span>Родной язык&nbsp;коллекции</span>
            <Form.Item name="language">
              <Select
                className="form-cards-collection__select"
                options={languagesList}
                showSearch
                onChange={(value) => { formik.handleChange({ target: { name: 'languageId', value } }); }}
              />
            </Form.Item>
          </label>
          <label className="form-cards-collection__label label">
            <span>Иностранный язык&nbsp;коллекции</span>
            <Form.Item name="translationLanguage">
              <Select
                className="form-cards-collection__select"
                options={languagesList}
                onChange={(value) => { formik.handleChange({ target: { name: 'translationLanguageId', value } }); }}
              />
            </Form.Item>
          </label>
        </div>
        <label className="form-cards-collection__label label">
          <span>Название коллекции</span>
          <Input required name="name" value={formik.values.name} onChange={formik.handleChange} />
        </label>
        <label className="form-cards-collection__label label">
          <span>Описание коллекции</span>
          <Input required name="description" value={formik.values.description} onChange={formik.handleChange} />
        </label>
        <div className="form__footer">
          <button type="button" className="button button--trans button--warning" onClick={formik.handleReset}>{CANCEL}</button>
          <button type="submit" className="button button--trans button--trans">{SAVE}</button>
        </div>
      </Form>
    </div>
  );
}

CollectionForm.defaultProps = {
  formState: formInitialState,
};
