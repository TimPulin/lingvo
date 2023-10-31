import { useEffect, useRef } from 'react';
import { useStaticMessage, messageShowDuration } from '../global-context-provider/context-hooks';

const MESSAGE_SHOW = 'message--show';
const MESSAGE_HIDE = 'message--hide';

export default function Message() {
  const { text, isShow, setIsShow } = useStaticMessage();
  const classHideRef = useRef('');

  const classShow = () => (isShow ? MESSAGE_SHOW : classHideRef.current);

  function startTimerToHideMessage() {
    setTimeout(() => {
      setIsShow(false);
    }, messageShowDuration);
  }

  // СТАРТ блокировка отрисовки
  // чтобы анимация закрытия блока кнопок не срабатывала при первой отрисовки
  const componentRenderedRef = useRef(false);

  useEffect(() => {
    setTimeout(() => {
      componentRenderedRef.current = true;
    }, 1000);
  }, []);

  useEffect(() => {
    if (isShow) startTimerToHideMessage();
    if (componentRenderedRef.current) {
      classHideRef.current = MESSAGE_HIDE;
      componentRenderedRef.current = false;
    }
  }, [isShow]);

  return (
    <div className={`message ${classShow()}`}>
      <div className="message__body">
        <div className="message__text">
          {text}
          {' '}
          Тестовый текст
        </div>
      </div>
    </div>
  );
}

// ${MESSAGE_SHOW}
