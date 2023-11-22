import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCurrentLangPack } from '../../store/selectors';
import { removeLocalStorageUserToken } from '../../connect/local-storage-connections';
import UserBlock from '../user/UserBlock';
import { PWA_READY_UPDATE } from '../../utils/constants';
import MailIcon from '../icons/MailIcon';

type NavigationPropsType = {
  isMenuOpen:boolean
};

const NAV_PANEL_CLOSE = 'nav__panel--close';

export default function Navigation(props:NavigationPropsType) {
  const { COLLECTIONS_PAGE, SETTINGS, FEEDBACK } = useCurrentLangPack();
  const navigate = useNavigate();

  const [isButtonUpdatePWAShow, setIsButtonUpdatePWAShow] = useState(false);
  const [updatePWAEvent, setUpdatePWAEvent] = useState<null | ServiceWorkerRegistration>(null);
  const [isPageFirstRender, setIsPageFirstRender] = useState(false);
  const [navPanelCloseClass, setNavPanelCloseClass] = useState<string | null>(null);

  const navPanelOperateClass = () => (props.isMenuOpen ? 'nav__panel--open' : '');

  const closeMenu = () => {
    document.dispatchEvent(new CustomEvent('overlay-clicked', { bubbles: true }));
  };

  const onLogout = () => {
    removeLocalStorageUserToken();
    closeMenu();
    navigate('/login');
  };

  useEffect(() => {
    setTimeout(() => {
      setIsPageFirstRender(true);
    }, 100);
  }, []);

  useEffect(() => {
    if (isPageFirstRender && props.isMenuOpen) {
      setNavPanelCloseClass(NAV_PANEL_CLOSE);
      setIsPageFirstRender(false);
    }
  }, [props.isMenuOpen]);

  useEffect(() => {
    document.addEventListener(PWA_READY_UPDATE, (event:CustomEventInit) => {
      setIsButtonUpdatePWAShow(true);
      setUpdatePWAEvent(event.detail.registration);
    });

    window.addEventListener('beforeinstallprompt', () => {
      document.addEventListener(PWA_READY_UPDATE, () => {
        setIsButtonUpdatePWAShow(false);
      });
    });
  }, []);

  const updatePWA = () => {
    window.location.reload();
    if (updatePWAEvent !== null && updatePWAEvent?.waiting !== null) {
      updatePWAEvent.waiting.postMessage({ type: 'SKIP_WAITING' });
    }
  };

  return (
    <nav className="nav">
      <div className={`nav__panel ${navPanelOperateClass()} ${navPanelCloseClass}`}>
        <div className="nav__panel-card nav__panel-card--top">
          <UserBlock onLogout={onLogout} />
        </div>

        <div className="nav__panel-card nav__panel-card--navigation ">
          <ul className="nav__list">
            {isButtonUpdatePWAShow
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
            <li className="nav__item">
              <a
                className="nav__link nav__link--mail"
                href="mailto:lingvocards.feedback@gmail.com"
              >
                <MailIcon />
                {' '}
                {FEEDBACK}
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
