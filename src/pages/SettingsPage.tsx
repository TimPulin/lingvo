import { useDispatch, connect } from 'react-redux';

import { useEffect } from 'react';
import { updateCurrentPageName } from '../store/slicers/current-page-slice';
import RadioBlock from '../components/radio/RadioBlock';

import { updateCurrentLang } from '../store/slicers/current-lang-slice';
import { Languages, langToLangIdAdaptor } from '../utils/lang-pack/lang-pack-types';
import { useCurrentLang, useCurrentLangPack, useUserToken } from '../store/selectors';
import { updateUserLanguage } from '../connect/server-connections';

const radioPropertiesList = [
  {
    name: 'lang',
    label: 'Русский',
    value: Languages.RU,
    id: 82,
  },
  {
    name: 'lang',
    label: 'English',
    value: Languages.EN,
    id: 28,
  },
  {
    name: 'lang',
    label: 'Español',
    value: Languages.ESL,
    id: 115,
  },
  {
    name: 'lang',
    label: 'עברית',
    value: Languages.HBW,
    id: 38,
  },
];

function SettingsPage(props: any) {
  const currentLang = useCurrentLang();
  const userToken = useUserToken();

  const updateUserLang = (itemValue: Languages) => {
    const langId = langToLangIdAdaptor(itemValue);

    if (userToken !== null) {
      updateUserLanguage(userToken, langId)
        .then(() => {
          props.updateCurrentLang(itemValue);
        });
    }
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
          onChange={updateUserLang}
        />
      </div>
    </div>
  );
}

export default connect(null, { updateCurrentLang })(SettingsPage);
