import SocialsAuthorizationList from '../../components/socials/SocialsAuthorizationList';
import { useCurrentLangPack } from '../../store/selectors';

export default function LoginPage() {
  const { WELCOME } = useCurrentLangPack();
  return (
    <div className="login-page">
      <div className="login-page__top">
        <div className="login-page__logo">
          <div className="login-page__column login-page__column--img" />
          <div className="login-page__column multicolor-text">
            <h1 className="login-page__logo-text">LINGVO</h1>
            <h1 className="login-page__logo-text">CARDS</h1>
          </div>
        </div>
      </div>
      <div className="login-page__main">
        <h1 className="login-page__title">{WELCOME}</h1>
        <SocialsAuthorizationList />
      </div>
    </div>
  );
}
