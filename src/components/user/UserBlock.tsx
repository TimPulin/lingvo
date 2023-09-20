import SocialsList from '../socials/SocialsList';

export default function UserBlock() {
  return (
    <div className="user">
      <div className="user__icon-block">
        <img className="user__img" src="./images/icons/icon-user-default.png" alt="" />
      </div>
      <div className="user__login">
        <SocialsList />
      </div>
    </div>
  );
}
