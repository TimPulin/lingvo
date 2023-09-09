import { useStaticMessage } from '../context-provider/context-hooks';
import { HIDE } from '../../utils/constants';

type MessagePropsType = {
  text: string;
};

export default function Message(props:MessagePropsType) {
  const { isShow } = useStaticMessage();
  const classShow = () => (isShow ? '' : HIDE);

  return (
    <div className={`message ${classShow()}`}>
      <div className="message__body">
        <div className="message__text">
          {props.text}
        </div>
      </div>
    </div>
  );
}
