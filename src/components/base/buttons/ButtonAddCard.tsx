import { useCurrentLangPack } from '../../../store/selectors';
import ControlBlockButton from '../../cards/card-control-block/ControlBlockButton';

type ButtonAddCardPropsType = {
  onClickAddCard: ()=> void;
};

export default function ButtonAddCard(props:ButtonAddCardPropsType) {
  const { ADD_CARD } = useCurrentLangPack();
  return (
    <ControlBlockButton
      onClick={props.onClickAddCard}
      buttonsText={ADD_CARD}
      key="add_card"
    />
  );
}
