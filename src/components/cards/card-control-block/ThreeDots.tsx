export type ThreeDotsPropsType = {
  classHide: () => string;
  onClick: (event: React.MouseEvent) => void;
  // isCardStartTurn?: boolean;
};

export default function ThreeDots(props: ThreeDotsPropsType) {
  const { classHide, onClick } = props;
  return (
    <div className={`three-dots ${classHide()}`}>
      <button
        type="button"
        className="three-dots__btn"
        onClick={onClick}
      >
        <span className="three-dots__line" />
        <span className="three-dots__line" />
        <span className="three-dots__line" />
      </button>
    </div>
  );
}
