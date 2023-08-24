import { useSelector, connect } from 'react-redux';
import RadioBlock from '../components/radio/RadioBlock';
import { RootStateType } from '../store';
import { updateCurrentLang } from '../store/current-lang-slice';

const radioPropertiesList = [
  {
    name: 'lang',
    label: 'Русский',
    value: 'ru',
  },
  {
    name: 'lang',
    label: 'English',
    value: 'en',
  },
  {
    name: 'lang',
    label: 'Español',
    value: 'esl',
  },
  {
    name: 'lang',
    label: 'עברית',
    value: 'hebrew',
  },
];

function SettingsPage(props: any) {
  const currentLang = useSelector((store: RootStateType) => store.currentLang.value);
  const getSelectedLang = (itemValue: string | number) => {
    props.updateCurrentLang(itemValue);
  };

  return (
    <div>
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
