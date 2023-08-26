import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { RootStateType } from '../store';
import { getCurrentLangPack } from '../utils/lang-pack/get-current-lang-pack';

interface IHeaderSiteProps {
  changeIsModalOpen(isOpen:boolean): void;
}

export default function HeaderSite(props: IHeaderSiteProps) {
  const { changeIsModalOpen } = props;
  const currentLang = useSelector((store: RootStateType) => store.currentLang.value);
  const { SETTINGS } = getCurrentLangPack({ langCode: currentLang });

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isBurgerTransform, setIsBurgerTransform] = useState(false);

  const burgerAnimationClasses = () => (isBurgerTransform ? 'burger--vertical-line' : '');
  const navPanelOperateClass = () => (isMenuOpen ? 'nav__panel--open' : '');

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

  return (
    <header>
      <nav className="nav">
        <div className={`nav__panel ${navPanelOperateClass()}`}>
          <ul className="nav__list">
            <li className="nav__item">
              <Link
                className="nav__link"
                to="/settings"
                onClick={() => closeMenu()}
              >
                {SETTINGS}
              </Link>
            </li>
          </ul>
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
      </nav>
    </header>
  );
}
