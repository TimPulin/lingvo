import { Link } from 'react-router-dom';

export default function HeaderSite() {
  return (
    <header>
      <nav className="nav">

        <div className="nav__panel">
          <ul className="nav__list">
            <li className="nav__item">
              <Link className="nav__link" to="/settings">Настройки</Link>
            </li>
          </ul>
        </div>

        <div className="burger">
          <button
            type="button"
            className="burger__btn"
            aria-label="открыть навигацию"
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
