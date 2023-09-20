import FacebookIcon from '../icons/FacebookIcon';
import GoogleIcon from '../icons/GoogleIcon';
import VkIcon from '../icons/VkIcon';
import YandexIcon from '../icons/YandexIcon';

export default function SocialsList() {
  return (
    <div className="socials">
      <ul className="socials__list">
        <li className="socials__item"><VkIcon /></li>
        <li className="socials__item"><FacebookIcon /></li>
        <li className="socials__item"><YandexIcon /></li>
        <li className="socials__item"><GoogleIcon /></li>
      </ul>
    </div>
  );
}
