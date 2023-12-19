import { Radio, RadioChangeEvent } from 'antd';

type RadioOptionsType = {
  label: string;
  value: string | number;
};

type RadioAntGroupPropsType = {
  optionsList: RadioOptionsType[];
  onChange: (event: RadioChangeEvent) => void;
  defaultValue: string | number;
};

export default function RadioAntGroup(props: RadioAntGroupPropsType) {
  const { optionsList, onChange, defaultValue } = props;
  return (
    <Radio.Group defaultValue={defaultValue} buttonStyle="solid" onChange={onChange}>
      {
        optionsList.map((item) => (
          <Radio.Button key={item.label} className="radio-button-group-solid" value={item.value}>{item.label}</Radio.Button>
        ))
      }
    </Radio.Group>
  );
}
