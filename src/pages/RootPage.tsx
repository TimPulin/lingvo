import { Outlet, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import HeaderSite from '../components/header/HeaderSite';
import Message from '../components/message/Message';
import { getLocalStorageUserToken } from '../connect/local-storage-connections';
import { updateUserToken } from '../store/slicers/user-token-slice';

export default function RootPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPageLogin, setIsPageLogin] = useState(false);
  const classModalOpened = () => (isModalOpen ? 'modal-opened' : '');

  const changeIsModalOpen = (isOpen:boolean) => {
    setIsModalOpen(isOpen);
  };

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
      <div
        className={`overlay ${classModalOpened()}`}
        onClick={dispatchOverlayClicked}
        aria-hidden="true"
      />
      <div className={`header-wrapper ${classModalOpened()} ${headerHideClass()}`}>
        <HeaderSite
          changeIsModalOpen={changeIsModalOpen}
        />
      </div>
      <Message />

      <div className={`content ${classModalOpened()} ${loginPageClass()}`}>
        <Outlet />
      </div>
    </div>
  );
}
