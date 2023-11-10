import { useEffect, useState } from 'react';

// const PWA_SHOW = 'pwa-block--show';

type PWABlockPropsType = {
  onClickFunction: () => void;
  // isPWABlockShow: boolean;
};

export default function PWABlock(props:PWABlockPropsType) {
  const [isShow, setIsShow] = useState(false);
  // const isShow = () => (props.isPWABlockShow ? PWA_SHOW : '');

  useEffect(() => {
    window.addEventListener('beforeinstallprompt', (event:any) => {
      event.preventDefault();
      setIsShow(true);
    });
  }, []);

  const onClick = () => {
    props.onClickFunction();
    setIsShow(false);
  };

  if (isShow) {
    return (
      <div className="pwa-block">
        {/* TODO перевести */}
        <button
          type="button"
          className="button pwa-block__button"
          onClick={onClick}
        >
          Установить приложение
        </button>
      </div>
    );
  }
  return null;
}
