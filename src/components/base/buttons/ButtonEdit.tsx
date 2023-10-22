import EditIcon from '../../icons/EditIcon';
import ButtonBase from '../ButtonBase';

type ButtonEditPropsType = {
  classAdditional?: string;
  onClickFunction: () => void;
  text?: string;
};

export default function ButtonEdit(props:ButtonEditPropsType) {
  // TODO перевести
  const { text = 'Редактировать' } = props;
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
