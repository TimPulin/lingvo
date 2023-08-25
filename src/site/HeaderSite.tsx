import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { RootStateType } from '../store';
import { getCurrentLangPack } from '../utils/lang-pack/get-current-lang-pack';

export default function HeaderSite() {
  const currentLang = useSelector((store: RootStateType) => store.currentLang.value);
  const { SETTINGS } = getCurrentLangPack({ langCode: currentLang });

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isBurgerTransform, setIsBurgerTransform] = useState(false);

  function handleBurgerClick() {
    setIsBurgerTransform(true);
    setTimeout(() => {
      setIsMenuOpen(true);
    }, 500);
  }

  const burgerAnimationClasses = () => (isBurgerTransform ? 'burger--vertical-line' : '');
  const navOperateClass = () => (isMenuOpen ? 'nav__panel--open' : '');

  return (
    <header>
      <nav className="nav">
        <div className={`nav__panel ${navOperateClass()}`}>
          <ul className="nav__list">
            <li className="nav__item">
              <Link className="nav__link" to="/settings">{SETTINGS}</Link>
            </li>
          </ul>
        </div>

        <div className="burger">
          <button
            type="button"
            className={`burger__btn ${burgerAnimationClasses()}`}
            aria-label="open-navigation"
            onClick={() => handleBurgerClick()}
          >
            <span className="burger__line" />
            <span className="burger__line" />
            <span className="burger__line" />
          </button>
        </div>
      </nav>
    </header>
  );
}
