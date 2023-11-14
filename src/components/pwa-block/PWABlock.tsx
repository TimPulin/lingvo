import { useEffect, useState } from 'react';
import { useCurrentLangPack } from '../../store/selectors';

type PWABlockPropsType = {
  onClickFunction: () => void;
};

export default function PWABlock(props:PWABlockPropsType) {
  const [isShow, setIsShow] = useState(false);
  const { INSTALL_APP } = useCurrentLangPack();

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
            <button
              type="button"
              className="button pwa-block__button"
              onClick={onClick}
            >
              {INSTALL_APP}
            </button>
          </div>
        </div>
      </div>
    );
  }
  return null;
}
