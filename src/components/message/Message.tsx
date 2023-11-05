import { useEffect, useState } from 'react';
import { useStaticMessage, messageShowDuration } from '../global-context-provider/message-context';
import ButtonClose from '../base/buttons/button-close/ButtonClose';

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

  function hideMessage() {
    setClassHide(MESSAGE_HIDE);
    resetClassHide();
  }

  function startTimerToHideMessage() {
    setTimeout(() => {
      hideMessage();
    }, messageShowDuration);
  }

  useEffect(() => {
    if (isShow) {
      setIsShow(true);
      startTimerToHideMessage();
    }
  }, [isShow]);

  const onClose = () => {
    hideMessage();
  };

  return (
    <div className={`message ${classShow()} ${classHide}`}>
      <div className="message__body">
        <ButtonClose
          onClose={onClose}
        />
        <div className="message__text">
          {text}
        </div>
      </div>
    </div>
  );
}

// ${MESSAGE_SHOW}
