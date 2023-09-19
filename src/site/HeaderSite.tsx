import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useCurrentLangPack } from '../store/selectors';
import ArrowLeftIcon from '../components/icons/ArrowLeftIcon';

interface IHeaderSiteProps {
  changeIsModalOpen(isOpen:boolean): void;
}

export default function HeaderSite(props: IHeaderSiteProps) {
  const navigate = useNavigate();
  const { changeIsModalOpen } = props;
  const { SETTINGS, MAIN } = useCurrentLangPack();

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
              <li className="nav__item">
                <Link
                  className="nav__link"
                  to="/"
                  onClick={() => closeMenu()}
                >
                  {MAIN}
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
      </div>
    </header>
  );
}
