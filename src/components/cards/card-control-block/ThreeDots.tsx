export type ThreeDotsPropsType = {
  onClick: (event: React.MouseEvent) => void;
};

export default function ThreeDots(props: ThreeDotsPropsType) {
  const { onClick } = props;
  return (
    <div className="three-dots">
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
