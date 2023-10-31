import { useEffect, useState } from 'react';
import { useStaticMessage, messageShowDuration } from '../global-context-provider/context-hooks';

const MESSAGE_SHOW = 'message--show';
const MESSAGE_HIDE = 'message--hide';

export default function Message() {
  const { text, isShow, setIsShow } = useStaticMessage();
  const [classHide, setClassHide] = useState('');

  const classShow = () => (isShow ? MESSAGE_SHOW : '');

  function resetClassHide() {
    setTimeout(() => {
      setIsShow(false);
      setClassHide('');
    }, 500);
  }

  function startTimerToHideMessage() {
    setTimeout(() => {
      setClassHide(MESSAGE_HIDE);
      resetClassHide();
    }, messageShowDuration);
  }

  useEffect(() => {
    if (isShow) {
      setIsShow(true);
      startTimerToHideMessage();
    }
  }, [isShow]);

  return (
    <div className={`message ${classShow()} ${classHide}`}>
      <div className="message__body">
        <div className="message__text">
          {text}
          {' '}
        </div>
      </div>
    </div>
  );
}

// ${MESSAGE_SHOW}
