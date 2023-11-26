import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import FeedbackForm, { FeedbackFormType } from '../../components/feedback/FeedbackForm';
import { sendFeedback } from '../../connect/server-connections';
import { useCurrentLangPack, useUserToken } from '../../store/selectors';
import { updateCurrentPageName } from '../../store/slicers/current-page-slice';
import { useStaticMessage, staticMessagePromise } from '../../components/global-context-provider/message-context';
import ButtonBase from '../../components/base/ButtonBase';
import ArrowLeftIcon from '../../components/icons/ArrowLeftIcon';

export default function FeedbackPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userToken = useUserToken();
  const { setText, setIsShow: setIsMessageShow } = useStaticMessage();
  const {
    FEEDBACK_PAGE, FEEDBACKMESSAGE_MESSAGE_SEND, FEEDBACKMESSAGE_MESSAGE_DNT_SEND, BACK_TO_COLLECTIONS_LIST,
  } = useCurrentLangPack();

  function showMessage(textMessage:string) {
    setText(textMessage);
    setIsMessageShow(true);
  }

  const sendFeedBackLocal = async (message:FeedbackFormType) => {
    if (userToken) {
      try {
        await sendFeedback(userToken, message);
        showMessage(FEEDBACKMESSAGE_MESSAGE_SEND);
        setText(FEEDBACKMESSAGE_MESSAGE_SEND);
        staticMessagePromise(setIsMessageShow, true)
          .then(() => navigate(-1));
      } catch (error) {
        showMessage(FEEDBACKMESSAGE_MESSAGE_DNT_SEND);
        console.log(error);
      }
    }
  };

  const onResetMessageForm = () => {
    navigate(-1);
  };
  const gotoCollectionsPage = () => {
    navigate('/collections');
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
        <div className="content__item">
          <div className="button-wrap button-wrap--feedback-page">
            <ButtonBase
              onClickFunction={gotoCollectionsPage}
              text={BACK_TO_COLLECTIONS_LIST}
              classAdditional="button button--trans"
              ElementJSX={<ArrowLeftIcon />}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
