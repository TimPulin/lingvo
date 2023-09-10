import { useEffect } from 'react';
import { useStaticMessage } from '../global-context-provider/context-hooks';

const MESSAGE_SHOW = 'message--show';

export default function Message() {
  const { text, isShow, setIsShow } = useStaticMessage();

  const classShow = () => (isShow ? MESSAGE_SHOW : '');

  function startTimerToHideMessage() {
    setTimeout(() => {
      setIsShow(false);
    }, 3000);
  }

  useEffect(() => {
    if (isShow) startTimerToHideMessage();
  }, [isShow]);

  return (
    <div className={`message ${classShow()}`}>
      <div className="message__body">
        <div className="message__text">
          {text}
        </div>
      </div>
    </div>
  );
}