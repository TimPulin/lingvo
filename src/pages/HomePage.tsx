import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
// import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { updateCurrentPageName } from '../store/slicers/current-page-slice';
import { useCurrentLangPack } from '../store/selectors';

export default function HomePage() {
  const { MAIN_PAGE } = useCurrentLangPack();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    navigate('/collection');
  }, []);

  useEffect(() => {
    dispatch(updateCurrentPageName(MAIN_PAGE));
  }, [MAIN_PAGE]);

  return (
    <div className="main-screen">
      {/* <Link className="button button--outline" to="/create-new-card">{CREATE_NEW_CARD}</Link>
      <Link className="button button--outline" to="/cards">{CARDS}</Link> */}
    </div>
  );
}
