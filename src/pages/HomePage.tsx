import { Link } from 'react-router-dom';
import { useCurrentLangPack } from '../store/selectors';

export default function HomePage() {
  const { CARDS, CREATE_NEW_CARD } = useCurrentLangPack();

  return (
    <div className="main-screen">
      <Link className="button button--outline" to="/create-new-card">{CREATE_NEW_CARD}</Link>
      <Link className="button button--outline" to="/cards">{CARDS}</Link>
    </div>
  );
}
