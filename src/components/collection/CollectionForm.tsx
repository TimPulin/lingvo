import { Form, Input, Select } from 'antd';
import type { DefaultOptionType } from 'antd/es/select';
import { useCurrentLangPack } from '../../store/selectors';

export type CollectionFormPropsType = {
  languagesList:DefaultOptionType[];
};

export default function CollectionForm(props:CollectionFormPropsType) {
  const { CANCEL, SAVE } = useCurrentLangPack();
  const { languagesList } = props;

  function onCancel() {
    console.log('cancel');
  }

  function onSubmit() {
    console.log('submit');
  }

  /* TODO языковые переменные */
  return (
    <div>
      <Form className="form form-cards-collection">
        <div className="form-cards-collection__languages-list-wrap">
          <label className="form-cards-collection__label label">
            <span>Родной язык коллекции</span>
            <Select
              className="form-cards-collection__select"
              options={languagesList}
            />
          </label>
          <label className="form-cards-collection__label label">
            <span>Иностранный язык коллекции</span>
            <Select
              className="form-cards-collection__select"
              options={languagesList}
            />
          </label>
        </div>
        <label className="form-cards-collection__label label">
          <span>Название коллекции</span>
          <Input />
        </label>
        <label className="form-cards-collection__label label">
          <span>Описание коллекции</span>
          <Input />
        </label>
        <div className="form__footer">
          <button type="button" className="button button--trans button--warning" onClick={onCancel}>{CANCEL}</button>
          <button type="button" className="button button--trans button--trans" onClick={onSubmit}>{SAVE}</button>
        </div>
      </Form>
    </div>
  );
}
