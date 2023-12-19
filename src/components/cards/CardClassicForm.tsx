import { Form, Input } from 'antd';

import { useCurrentLangPack } from '../../store/selectors';
import FormFooter from '../form/FormFooter';

type CardClassicFormPropsType = {
  phrase: string;
  translationPhrase: string;
  pronunciation: string;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  updateFunction: (event: React.ChangeEvent) => void;
  onCancel: (event: any) => void;
};

export default function CardClassicForm(props: CardClassicFormPropsType) {
  const {
    phrase, translationPhrase, pronunciation, onSubmit, updateFunction, onCancel,
  } = props;
  const { NATIVE, FOREIGN, TRANSCRIPTION } = useCurrentLangPack();

  return (
    <Form className="form form--classic form--page" onSubmitCapture={onSubmit}>
      <Form.Item>
        <label className="form__label">
          <span>{NATIVE}</span>
          <Input name="phrase" value={phrase} onChange={updateFunction} />
        </label>
      </Form.Item>
      <Form.Item>
        <label className="form__label">
          <span>{FOREIGN}</span>
          <Input name="translationPhrase" value={translationPhrase} onChange={updateFunction} />
        </label>
      </Form.Item>
      <Form.Item>
        <label className="form__label">
          <span>{TRANSCRIPTION}</span>
          <Input name="pronunciation" value={pronunciation} onChange={updateFunction} />
        </label>
      </Form.Item>
      <FormFooter onCancel={onCancel} />
    </Form>
  );
}
