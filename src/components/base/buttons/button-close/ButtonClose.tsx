import CloseIcon from '../../../icons/CloseIcon';
import ButtonBase from '../../ButtonBase';

type ButtonClosePropsType = {
  onClose: () => void;
};
export default function ButtonClose(props:ButtonClosePropsType) {
  return (
    <ButtonBase
      onClickFunction={props.onClose}
      ElementJSX={<CloseIcon />}
      classAdditional="button-close"
    />
  );
}
