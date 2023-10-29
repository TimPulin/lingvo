import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';
import { getLocalStorageUserToken } from '../connect/local-storage-connections';
import { updateUserToken } from '../store/slicers/user-token-slice';

import HeaderSite from '../components/header/HeaderSite';
import Message from '../components/message/Message';
import CollectionActionsBar from '../components/collection/CollectionActionsBar';
import Navigation from '../components/navigation/Navigation';

export default function RootPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isPageLogin, setIsPageLogin] = useState(false);

  const classModalOpened = () => (isModalOpen ? 'modal-opened' : '');

  const changeIsModalOpen = (isOpen:boolean) => {
    setIsModalOpen(isOpen);
  };

  useEffect(() => {
    /* eslint-disable-next-line */
    const bodyApp = document.getElementById('body');
    if (isModalOpen) {
      bodyApp?.classList.add('modal-opened');
    } else {
      bodyApp?.classList.remove('modal-opened');
    }
  }, [isModalOpen]);

  const headerHideClass = () => (isPageLogin ? 'hide' : '');
  const loginPageClass = () => (isPageLogin ? 'content--login-page' : '');

  function dispatchOverlayClicked() {
    document.dispatchEvent(new CustomEvent('overlay-clicked', { bubbles: true }));
  }

  useEffect(() => {
    const token = getLocalStorageUserToken();
    if (token === null) {
      navigate('/login');
    } else {
      dispatch(updateUserToken(token));
    }
  }, []);

  useEffect(() => {
    const path = window.location.pathname;
    setIsPageLogin(path === '/login');
  });

  return (
    <div className="container ">
      <CollectionActionsBar />
      <Navigation
        isMenuOpen={isMenuOpen}
      />
      <div
        className={`overlay ${classModalOpened()}`}
        onClick={dispatchOverlayClicked}
        aria-hidden="true"
      />
      <div className={`header-wrapper ${classModalOpened()} ${headerHideClass()}`}>
        <HeaderSite
          changeIsModalOpen={changeIsModalOpen}
          setIsMenuOpen={setIsMenuOpen}
        />
      </div>
      <Message />

      <div className={`content ${classModalOpened()} ${loginPageClass()}`}>
        <Outlet />
      </div>
    </div>
  );
}
