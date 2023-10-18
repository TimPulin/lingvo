import { useEffect, useState } from 'react';
import { getUserAvatar } from '../../connect/server-connections';
import { useUserToken } from '../../store/selectors';

export default function UserBlock() {
  const userToken = useUserToken();
  const [userName, setUserName] = useState('');

  useEffect(() => {
    if (userToken) {
      getUserAvatar(userToken)
        .then((response) => {
          setUserName(response.data.username);
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [userToken]);

  return (
    <div className="user">
      <div className="user__icon-block">
        <img className="user__img" src="/images/icons/icon-user-default.png" alt="" />
      </div>
      <div>{userName}</div>
    </div>
  );
}
