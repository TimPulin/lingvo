import EditIcon from '../../icons/EditIcon';
import ButtonBase from '../ButtonBase';
import { useCurrentLangPack } from '../../../store/selectors';

type ButtonEditPropsType = {
  classAdditional?: string;
  onClickFunction: () => void;
  text?: string;
};

export default function ButtonEdit(props:ButtonEditPropsType) {
  const { EDIT } = useCurrentLangPack();
  const { text = EDIT } = props;
  return (
    <ButtonBase
      classAdditional={props.classAdditional}
      onClickFunction={props.onClickFunction}
      ElementJSX={<EditIcon />}
      text={text}
    />
  );
}

ButtonEdit.defaultProps = {
  classAdditional: '',
  text: 'Редактировать',
};
