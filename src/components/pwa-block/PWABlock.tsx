const PWA_SHOW = 'pwa-block--show';

type PWABlockPropsType = {
  onClickFunction: () => void;
  isPWABlockShow: boolean;
};

export default function PWABlock(props:PWABlockPropsType) {
  const isShow = () => (props.isPWABlockShow ? PWA_SHOW : '');

  return (
    <div className={`pwa-block ${isShow}`}>
      {/* TODO перевести */}
      <button type="button" className="button pwa-block__button" onClick={props.onClickFunction}>Установить приложение</button>
    </div>
  );
}
