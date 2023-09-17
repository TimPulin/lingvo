import { useSelector, connect } from 'react-redux';
import RadioBlock from '../components/radio/RadioBlock';
import { RootStateType } from '../store';
import { updateCurrentLang } from '../store/current-lang-slice';
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
  const currentLang = useSelector((store: RootStateType) => store.currentLang.value);
  const getSelectedLang = (itemValue: string | number) => {
    props.updateCurrentLang(itemValue);
  };

  const { LANGUAGE } = useCurrentLangPack();

  return (
    <div>
      <h2>{LANGUAGE}</h2>
      <RadioBlock
        componentClass="options-flat"
        list={radioPropertiesList}
        currentLang={currentLang}
        onChange={getSelectedLang}
      />
    </div>
  );
}

export default connect(null, { updateCurrentLang })(SettingsPage);
