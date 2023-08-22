import RadioBlock from '../components/radio/RadioBlock';

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

export default function SettingsPage() {
  return (
    <div>
      <RadioBlock componentClass="options-flat" list={radioPropertiesList} />
    </div>
  );
}
