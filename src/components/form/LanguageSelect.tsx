import { Select } from 'antd';
import type { DefaultOptionType } from 'antd/es/select';

export type LanguageSelectPropsType = {
  options:DefaultOptionType[];
};

export default function LanguageSelect(props: LanguageSelectPropsType) {
  return (
    <Select
      style={{ width: '100%' }}
      options={props.options}
    />
  );
}
