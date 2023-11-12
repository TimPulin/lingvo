import { useEffect, useState } from 'react';

type PWABlockPropsType = {
  onClickFunction: () => void;
  // isPWABlockShow: boolean;
};

export default function PWABlock(props:PWABlockPropsType) {
  const [isShow, setIsShow] = useState(false);

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
      <div className="content__list">
        <div className="content__item">
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
        </div>
      </div>
    );
  }
  return null;
}
