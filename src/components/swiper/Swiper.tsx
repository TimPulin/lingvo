import { v4 as getUniqId } from 'uuid';
import SwiperItem from './SwiperItem';

const cardList = [
  { key: getUniqId() },
  { key: getUniqId() },
  { key: getUniqId() },
  { key: getUniqId() },
  { key: getUniqId() },
  { key: getUniqId() },
];

export default function Swiper() {
  return (
    <div className="swiper">
      <div className="swiper__window">
        {
          cardList.map((item) => (
            <SwiperItem key={item.key} />
          ))
        }
      </div>
    </div>
  );
}
