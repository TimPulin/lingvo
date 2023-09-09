import { useState, useEffect } from 'react';
import { useStaticMessage } from '../context-provider/context-hooks';

const MESSAGE_SHOW = 'message--show';

export default function Message() {
  const { text, isShow } = useStaticMessage();

  const [localIsShow, setLocalIsShow] = useState(false);

  const classShow = () => (localIsShow ? MESSAGE_SHOW : '');

  function startTimerToHideMessage() {
    setTimeout(() => {
      setLocalIsShow(false);
    }, 3000);
  }

  useEffect(() => {
    setLocalIsShow(isShow);
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
