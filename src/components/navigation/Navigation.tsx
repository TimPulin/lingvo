import { Link, useNavigate } from 'react-router-dom';
import { useCurrentLangPack } from '../../store/selectors';
import { removeLocalStorageUserToken } from '../../connect/local-storage-connections';
import UserBlock from '../user/UserBlock';

type NavigationPropsType = {
  isMenuOpen:boolean
};

export default function Navigation(props:NavigationPropsType) {
  const { COLLECTIONS_PAGE, SETTINGS } = useCurrentLangPack();
  const navigate = useNavigate();

  const navPanelOperateClass = () => (props.isMenuOpen ? 'nav__panel--open' : '');

  const closeMenu = () => {
    document.dispatchEvent(new CustomEvent('overlay-clicked', { bubbles: true }));
  };

  const onLogout = () => {
    removeLocalStorageUserToken();
    closeMenu();
    navigate('/login');
  };

  return (
    <nav className="nav">
      <div className={`nav__panel ${navPanelOperateClass()}`}>
        <div className="nav__panel-card nav__panel-card--top">
          <UserBlock onLogout={onLogout} />
        </div>

        <div className="nav__panel-card nav__panel-card--navigation ">
          <ul className="nav__list">
            <li className="nav__item">
              <Link
                className="nav__link"
                to="/collections"
                onClick={() => closeMenu()}
              >
                {COLLECTIONS_PAGE}
              </Link>
            </li>
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
      </div>
    </nav>
  );
}
