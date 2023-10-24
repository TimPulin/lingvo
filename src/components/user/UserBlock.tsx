import { useEffect, useState } from 'react';

import { getUserData } from '../../connect/server-connections';
import { useUserToken } from '../../store/selectors';
import ButtonBase from '../base/ButtonBase';
import ExitIcon from '../icons/ExitIcon';

const IMG_PATH_DEFAULT = '/images/icons/icon-user-default.png';

type UserBlockPropsType = {
  onLogout: () => void;
};

export default function UserBlock(props:UserBlockPropsType) {
  const userToken = useUserToken();
  const [userName, setUserName] = useState('');
  const [userAvatar, setUserAvatar] = useState(IMG_PATH_DEFAULT);

  useEffect(() => {
    if (userToken) {
      getUserData(userToken)
        .then((response) => {
          setUserName(response.data.username);
          setUserAvatar(response.data.avatar);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [userToken]);

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
