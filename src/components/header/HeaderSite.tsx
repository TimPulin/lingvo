import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useCurrentLangPack, useCurrentPageName } from '../../store/selectors';
import ArrowLeftIcon from '../icons/ArrowLeftIcon';
import UserBlock from '../user/UserBlock';

interface IHeaderSiteProps {
  changeIsModalOpen(isOpen:boolean): void;
}

export default function HeaderSite(props: IHeaderSiteProps) {
  const navigate = useNavigate();
  const { changeIsModalOpen } = props;
  const { SETTINGS, MAIN, COLLECTIONS_PAGE } = useCurrentLangPack();
  const pageName = useCurrentPageName();

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

        <div>
          <h1 className="header__page-title multicolor-text">{pageName}</h1>
        </div>

        <nav className="nav">
          <div className={`nav__panel ${navPanelOperateClass()}`}>

            <div className="nav__panel-card nav__panel-card--top">
              <UserBlock />
            </div>

            <div className="nav__panel-card nav__panel-card--navigation ">
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
                <li className="nav__item">
                  <Link
                    className="nav__link"
                    to="/collections"
                    onClick={() => closeMenu()}
                  >
                    {COLLECTIONS_PAGE}
                  </Link>
                </li>
              </ul>
            </div>
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
