import { Outlet } from 'react-router-dom';
import { useState } from 'react';
import HeaderSite from '../components/header/HeaderSite';
import Message from '../components/message/Message';

export default function RootPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const classModalOpened = () => (isModalOpen ? 'modal-opened' : '');

  const changeIsModalOpen = (isOpen:boolean) => {
    setIsModalOpen(isOpen);
  };

  function dispatchOverlayClicked() {
    document.dispatchEvent(new CustomEvent('overlay-clicked', { bubbles: true }));
  }

  return (
    <div className="container">
      <div
        className={`overlay ${classModalOpened()}`}
        onClick={dispatchOverlayClicked}
        aria-hidden="true"
      />
      <div className={`${classModalOpened()}`}>
        <HeaderSite
          changeIsModalOpen={changeIsModalOpen}
        />
      </div>
      <Message />

      <div className={`content ${classModalOpened()}`}>
        <Outlet />
      </div>
    </div>
  );
}
