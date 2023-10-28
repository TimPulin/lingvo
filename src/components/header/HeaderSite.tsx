import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useCurrentPageName } from '../../store/selectors';

import ArrowLeftIcon from '../icons/ArrowLeftIcon';

interface IHeaderSiteProps {
  changeIsModalOpen(isOpen:boolean): void;
  setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export default function HeaderSite(props: IHeaderSiteProps) {
  const navigate = useNavigate();
  const { changeIsModalOpen, setIsMenuOpen } = props;

  const pageName = useCurrentPageName();

  const [isBurgerTransform, setIsBurgerTransform] = useState(false);

  const burgerAnimationClasses = () => (isBurgerTransform ? 'burger--vertical-line' : '');

  function closeMenu() {
    setIsBurgerTransform(false);
    setIsMenuOpen(false);
    changeIsModalOpen(false);
  }

  function setOverlayClickedListener() {
    document.addEventListener('overlay-clicked', () => {
      closeMenu();
    }, { once: true });
  }

  function handleBurgerClick() {
    setIsBurgerTransform(true);
    setOverlayClickedListener();
    setTimeout(() => {
      setIsMenuOpen(true);
      changeIsModalOpen(true);
    }, 500);
  }

  function goBack() {
    navigate(-1);
  }

  return (
    <header className="header">
      <div className="header__wrap">

        <div className="header__compass compass">
          <button type="button" className="compass__button" onClick={goBack}>
            <ArrowLeftIcon />
          </button>
        </div>

        <div>
          <h1 className="header__page-title multicolor-text">{pageName}</h1>
        </div>

        <div className="burger">
          <button
            type="button"
            className={`burger__btn ${burgerAnimationClasses()}`}
            aria-label="open-navigation"
            onClick={handleBurgerClick}
          >
            <span key={1} className="burger__line" />
            <span key={2} className="burger__line" />
            <span key={3} className="burger__line" />
          </button>
        </div>
      </div>
    </header>
  );
}
