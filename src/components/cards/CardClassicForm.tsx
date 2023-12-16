import { Form, Input } from 'antd';

import { useCurrentLangPack } from '../../store/selectors';

export default function CardClassicForm() {
  const { NATIVE, FOREIGN, TRANSCRIPTION } = useCurrentLangPack();
  return (
    <Form className="form form--classic form--page">
      <Form.Item>
        <label className="form__label">
          <span>{NATIVE}</span>
          <Input name="native" value={4} />
        </label>
      </Form.Item>
      <Form.Item>
        <label className="form__label">
          <span>{FOREIGN}</span>
          <Input name="native" value={4} />
        </label>
      </Form.Item>
      <Form.Item>
        <label className="form__label">
          <span>{TRANSCRIPTION}</span>
          <Input name="native" value={4} />
        </label>
      </Form.Item>
    </Form>
  );
}
