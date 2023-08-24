import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootStateType } from '../store';
import { getCurrentLangPack } from '../utils/lang-pack/get-current-lang-pack';

export default function HeaderSite() {
  const currentLang = useSelector((store: RootStateType) => store.currentLang.value);
  const { SETTINGS } = getCurrentLangPack({ langCode: currentLang });
  return (
    <header>
      <nav className="nav">

        <div className="nav__panel">
          <ul className="nav__list">
            <li className="nav__item">
              <Link className="nav__link" to="/settings">{SETTINGS}</Link>
            </li>
          </ul>
        </div>

        <div className="burger">
          <button
            type="button"
            className="burger__btn"
            aria-label="open-navigation"
          >
            <span className="burger__line" />
            <span className="burger__line" />
            <span className="burger__line" />
            <span className="burger__line" />
          </button>
        </div>
      </nav>
    </header>
  );
}
