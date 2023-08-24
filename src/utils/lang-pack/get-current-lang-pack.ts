import { dataLangs, Languages } from './lang-pack-basic';

interface IGetCurrentLangPackProps {
  langCode: Languages;
}

export function getCurrentLangPack(params: IGetCurrentLangPackProps) {
  const { langCode } = params;

  return dataLangs[langCode];
}
