import ButtonBase from '../ButtonBase';
import SettingsIcon from '../../icons/SettingsIcon';

type ButtonSettingsType = {
  classAdditional?: string;
  onClickFunction: () => void;
  text?: '';
};

export default function ButtonSettings(props:ButtonSettingsType) {
  const { classAdditional, onClickFunction, text } = props;

  return (
    <ButtonBase
      classAdditional={classAdditional}
      onClickFunction={onClickFunction}
      ElementJSX={<SettingsIcon />}
      text={text}
    />
  );
}

ButtonSettings.defaultProps = {
  classAdditional: '',
  text: '',
};
