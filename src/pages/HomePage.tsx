import { Link } from 'react-router-dom';
import HeaderSite from '../site/HeaderSite';

export default function HomePage() {
  return (
    <>
      <HeaderSite />
      <div className="main-screen">
        <Link className="button button--outline" to="/create-new-card">Создать новую карточку</Link>
        <Link className="button button--outline" to="/cards">Карточки</Link>
      </div>
    </>
  );
}
