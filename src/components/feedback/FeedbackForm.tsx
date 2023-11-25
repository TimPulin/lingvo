import { Form, Input } from 'antd';
import { useFormik } from 'formik';
import { useEffect } from 'react';
import { useCurrentLangPack, useUserData } from '../../store/selectors';

type FeedbackFormPropsType = {
  onSubmitFunction: (values: any) => void;
  onResetFunction: () => void;

};

export type FeedbackFormType = {
  userName: string,
  messageObject: string,
  messageText: string,
};

export default function FeedbackForm(props:FeedbackFormPropsType) {
  const { onSubmitFunction, onResetFunction } = props;
  const { CANCEL, SAVE } = useCurrentLangPack();
  const { TextArea } = Input;
  const { userName } = useUserData();

  const formik = useFormik({
    initialValues: {
      userName,
      messageSubject: '',
      messageText: '',
    },
    onSubmit(values) {
      onSubmitFunction(values);
    },
    onReset() {
      onResetFunction();
    },
  });

  useEffect(() => {
    formik.initialValues.userName = userName;
  }, [userName]);

  return (

    <Form
      className="form form--page"
      onSubmitCapture={formik.handleSubmit}
    >
      <Form.Item>
        <label className="collection-form__label label">
          <span>Отправитель</span>
          <Input
            required
            name="userName"
            maxLength={40}
            value={formik.values.userName}
            onChange={formik.handleChange}
          />
        </label>
      </Form.Item>
      <Form.Item>
        <label className="collection-form__label label">
          <span>Тема</span>
          <Input
            required
            name="messageSubject"
            maxLength={80}
            value={formik.values.messageSubject}
            onChange={formik.handleChange}
          />
        </label>
      </Form.Item>
      <Form.Item>
        <label className="collection-form__label label">
          <span>Сообщение</span>
          <TextArea
            required
            name="messageText"
            rows={4}
            value={formik.values.messageText}
            onChange={formik.handleChange}
          />
        </label>
      </Form.Item>
      <div className="form__footer">
        <button type="button" className="button button--trans button--warning" onClick={formik.handleReset}>{CANCEL}</button>
        <button type="submit" className="button button--trans">{SAVE}</button>
      </div>
    </Form>
  );
}
