import DeleteIcon from '../../icons/DeleteIcon';
import ButtonBase from '../ButtonBase';

type ButtonDeletePropsType = {
  classAdditional?: string;
  onClickFunction: () => void;
  text?: string;
};

export default function ButtonDelete(props:ButtonDeletePropsType) {
  const { text = 'Удалить' } = props;

  return (
    <ButtonBase
      classAdditional={props.classAdditional}
      onClickFunction={props.onClickFunction}
      ElementJSX={<DeleteIcon />}
      text={text}
    />
  );
}

ButtonDelete.defaultProps = {
  classAdditional: '',
  text: 'Удалить',
};
