import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootStateType } from '../store';
// import HeaderSite from '../site/HeaderSite';
import { getCurrentLangPack } from '../utils/lang-pack/get-current-lang-pack';

export default function HomePage() {
  const currentLang = useSelector((store: RootStateType) => store.currentLang.value);
  const { CARDS, CREATE_NEW_CARD } = getCurrentLangPack({ langCode: currentLang });

  return (
    <div className="main-screen">
      <Link className="button button--outline" to="/create-new-card">{CREATE_NEW_CARD}</Link>
      <Link className="button button--outline" to="/cards">{CARDS}</Link>
    </div>
  );
}
