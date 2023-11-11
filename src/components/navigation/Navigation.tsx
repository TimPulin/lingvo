import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCurrentLangPack } from '../../store/selectors';
import { removeLocalStorageUserToken } from '../../connect/local-storage-connections';
import UserBlock from '../user/UserBlock';
import { PWA_READY_UPDATE } from '../../utils/constants';

type NavigationPropsType = {
  isMenuOpen:boolean
};

export default function Navigation(props:NavigationPropsType) {
  const { COLLECTIONS_PAGE, SETTINGS } = useCurrentLangPack();
  const navigate = useNavigate();

  const [isButtonUpdatePWAShow, setIsButtonUpdatePWAShow] = useState(false);
  const [updatePWAEvent, setUpdatePWAEvent] = useState<null | ServiceWorkerRegistration>(null);

  const navPanelOperateClass = () => (props.isMenuOpen ? 'nav__panel--open' : '');

  const closeMenu = () => {
    document.dispatchEvent(new CustomEvent('overlay-clicked', { bubbles: true }));
  };

  const onLogout = () => {
    removeLocalStorageUserToken();
    closeMenu();
    navigate('/login');
  };

  const buttonStyle = {
    display: 'none',
  };

  useEffect(() => {
    document.addEventListener(PWA_READY_UPDATE, (event:CustomEventInit) => {
      setIsButtonUpdatePWAShow(true);
      setUpdatePWAEvent(event.detail.registration);
    });
  }, []);

  useEffect(() => {
    if (isButtonUpdatePWAShow) buttonStyle.display = 'inline-block';
  }, [isButtonUpdatePWAShow]);

  const updatePWA = () => {
    window.location.reload();
    if (updatePWAEvent !== null && updatePWAEvent?.waiting !== null) {
      updatePWAEvent.waiting.postMessage({ type: 'SKIP_WAITING' });
    }
  };

  return (
    <nav className="nav">
      <div className={`nav__panel ${navPanelOperateClass()}`}>
        <div className="nav__panel-card nav__panel-card--top">
          <UserBlock onLogout={onLogout} />
        </div>

        <div className="nav__panel-card nav__panel-card--navigation ">
          <ul className="nav__list">
            {isButtonUpdatePWAShow === true
                && (
                  <li className="nav__item">
                    <button
                      type="button"
                      className="button button--trans button--pwa-update"
                      onClick={updatePWA}
                    >
                      Обновить приложение
                    </button>
                  </li>
                )}

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
