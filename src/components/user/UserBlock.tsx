import { useUserData } from '../../store/selectors';
import ButtonBase from '../base/ButtonBase';
import ExitIcon from '../icons/ExitIcon';

type UserBlockPropsType = {
  onLogout: () => void;
};

export default function UserBlock(props:UserBlockPropsType) {
  const { userName, userAvatar } = useUserData();

  return (
    <div className="user">
      <span className="user__logout-block">
        <ButtonBase
          onClickFunction={props.onLogout}
          ElementJSX={<ExitIcon />}
        />
      </span>
      <div className="user__icon-block">
        <img className="user__img" src={userAvatar} alt="user avatar" />
      </div>
      <div>{userName}</div>
    </div>
  );
}
