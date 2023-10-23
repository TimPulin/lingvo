type ControlBlockButtonType = {
  onClick: (event:React.TouchEvent | React.MouseEvent) => void;
  buttonsText: string;
};

export default function ControlBlockButton(props:ControlBlockButtonType) {
  return (
    <button
      className="control-block__button"
      type="button"
      onClick={props.onClick}
    >
      {props.buttonsText}
    </button>
  );
}
