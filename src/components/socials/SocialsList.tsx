import GoogleIcon from '../icons/GoogleIcon';
import VkIcon from '../icons/VkIcon';

export default function SocialsList() {
  return (
    <div className="socials">
      <ul className="socials__list">
        <li className="socials__item"><VkIcon /></li>
        <li className="socials__item"><GoogleIcon /></li>
      </ul>
    </div>
  );
}
