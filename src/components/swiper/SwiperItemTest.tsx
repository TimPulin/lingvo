import Card from '../cards/Card';

type PropsType = {
  itemNumber: number;
};

export default function SwiperItemTest(props:PropsType) {
  const { itemNumber } = props;

  return (
    <li className="swiper__item">
      {itemNumber}
      <Card />
    </li>
  );
}
