import Card from '../cards/Card';

type PropsType = {
  itemNumber: number;
};

export default function SwiperItemTest(props:PropsType) {
  const { itemNumber } = props;
  console.log(itemNumber);

  return (
    <li className="swiper__item">
      <Card />
    </li>
  );
}
