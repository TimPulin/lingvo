import GoogleIcon from '../icons/GoogleIcon';
import VkIcon from '../icons/VkIcon';

export default function SocialsAuthorizationList() {
  return (
    <div className="socials socials--login-page">
      <ul className="socials__list">
        <li className="socials__item">
          {/* eslint-disable-next-line */}
          <a className="socials__link" href="https://oauth.vk.com/authorize?client_id=51758938&scope=email&v=5.131&redirect_uri=https%3A%2F%2Fapi.lingvocards.space%2Fauth%2Flogin%2Fvk&display=page&response_type=code">
            <VkIcon />
            <span className="socials__title">Войти через ВКонтакте</span>
          </a>
        </li>
        <li className="socials__item">
          {/* eslint-disable-next-line */}
          <a className="socials__link" href="https://accounts.google.com/o/oauth2/auth?redirect_uri=https%3A%2F%2Fapi.lingvocards.space%2Fauth%2Flogin%2Fgoogle&response_type=code&client_id=1007813443693-6f0m9hhjor7mheaj486u34dbov4lrsr7.apps.googleusercontent.com&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.profile">
            <GoogleIcon />
            <span className="socials__title">Войти через Google</span>
          </a>
        </li>
      </ul>
    </div>
  );
}

// export default function SocialsAuthorizationList() {
//   return (
//     <div className="socials">
//       <ul className="socials__list">
//         <li className="socials__item">
/* eslint-disable-next-line */
//           <a className="socials__link" href="https://oauth.vk.com/authorize?client_id=51758938&scope=email&v=5.131&redirect_uri=https%3A%2F%2Fapi.lingvocards.space%2Fauth%2Flogin%2Fvk&display=page&response_type=code">
//             <VkIcon />
//           </a>
//         </li>
//         <li className="socials__item">
/* eslint-disable-next-line */
//           <a className="socials__link" href="https://accounts.google.com/o/oauth2/auth?redirect_uri=https%3A%2F%2Fapi.lingvocards.space%2Fauth%2Flogin%2Fgoogle&response_type=code&client_id=1007813443693-6f0m9hhjor7mheaj486u34dbov4lrsr7.apps.googleusercontent.com&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.profile">
//             <GoogleIcon />
//           </a>
//         </li>
//       </ul>
//     </div>
//   );
// }
