import CardUniversal from '../cards/CardUniversal';

type SwiperItemPropsType = {
  onInteraction: (event:React.TouchEvent | React.MouseEvent) => void;
};

export default function SwiperItem(props: SwiperItemPropsType) {
  const { onInteraction } = props;
  return (
    <li
      role="presentation"
      tabIndex={0}
      className="swiper__item"
      onMouseDown={(event) => onInteraction(event)}
      onTouchStart={(event) => onInteraction(event)}
    >
      <CardUniversal />
    </li>
  );
}
