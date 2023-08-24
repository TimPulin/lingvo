import { Outlet } from 'react-router-dom';
import HeaderSite from '../site/HeaderSite';

export default function RootPage() {
  return (
    <>
      <div className="container">
        <HeaderSite />
      </div>
      <div className="container">
        <Outlet />
      </div>
    </>
  );
}
