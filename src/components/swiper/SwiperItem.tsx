import Card from '../cards/Card';

export default function SwiperItem() {
  function moveItem() {
    console.log('norm');
  }

  return (
    <div
      className="swiper__item"
      onMouseDown={moveItem}
      role="button"
      tabIndex={0}
    >
      <Card />
    </div>
  );
}
