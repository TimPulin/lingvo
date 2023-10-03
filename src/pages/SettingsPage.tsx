import { useDispatch, useSelector, connect } from 'react-redux';
import { useEffect } from 'react';
import { updateCurrentPageName } from '../store/slicers/current-page-slice';
import RadioBlock from '../components/radio/RadioBlock';
import { RootStateType } from '../store';
import { updateCurrentLang } from '../store/slicers/current-lang-slice';
import { Languages } from '../utils/lang-pack/lang-pack-types';
import { useCurrentLangPack } from '../store/selectors';

const radioPropertiesList = [
  {
    name: 'lang',
    label: 'Русский',
    value: Languages.RU,
  },
  {
    name: 'lang',
    label: 'English',
    value: Languages.EN,
  },
  {
    name: 'lang',
    label: 'Español',
    value: Languages.ESL,
  },
  {
    name: 'lang',
    label: 'עברית',
    value: Languages.HBW,
  },
];

function SettingsPage(props: any) {
  // TODO разобраться, почему не использовал useCurrentLangPack()
  const currentLang = useSelector((store: RootStateType) => store.currentLang.value);

  const getSelectedLang = (itemValue: string | number) => {
    props.updateCurrentLang(itemValue);
  };
  const dispatch = useDispatch();

  const { LANGUAGE, SETTING_PAGE } = useCurrentLangPack();

  useEffect(() => {
    dispatch(updateCurrentPageName(SETTING_PAGE));
  }, [SETTING_PAGE]);

  return (
    <div className="content__list content__list--settings-page">
      <div className="content__item">
        <h5>{LANGUAGE}</h5>
        <RadioBlock
          componentClass="options-flat"
          list={radioPropertiesList}
          currentLang={currentLang}
          onChange={getSelectedLang}
        />
      </div>
    </div>
  );
}

export default connect(null, { updateCurrentLang })(SettingsPage);
