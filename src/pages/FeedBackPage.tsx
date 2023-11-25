import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import FeedbackForm, { FeedbackFormType } from '../components/feedback/FeedbackForm';
import { sendFeedback } from '../connect/server-connections';
import { useCurrentLangPack, useUserToken } from '../store/selectors';
import { updateCurrentPageName } from '../store/slicers/current-page-slice';

export default function FeedbackPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userToken = useUserToken();
  const { FEEDBACK_PAGE } = useCurrentLangPack();

  const sendFeedBackLocal = (message:FeedbackFormType) => {
    if (userToken) sendFeedback(userToken, message);
  };

  const onResetMessageForm = () => {
    navigate(-1);
  };

  useEffect(() => {
    dispatch(updateCurrentPageName(FEEDBACK_PAGE));
  }, [FEEDBACK_PAGE]);
  return (
    <div className="content__list  content__list--single-top">

      <div className="content__item">

        <FeedbackForm
          onSubmitFunction={sendFeedBackLocal}
          onResetFunction={onResetMessageForm}
        />
      </div>
    </div>
  );
}

// TODO когда заработает - удалить
// href="mailto:lingvocards.feedback@gmail.com"
