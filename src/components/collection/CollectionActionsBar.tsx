import { useNavigate } from 'react-router-dom';

import ButtonDelete from '../base/buttons/ButtonDelete';
import ButtonEdit from '../base/buttons/ButtonEdit';

import { deleteCollection } from '../../connect/server-connections';
import { useUserToken, useCurrentLangPack } from '../../store/selectors';

import { useActionBar } from '../global-context-provider/action-bar-context-hook';

export default function CollectionActionsBar() {
  const navigate = useNavigate();
  const userToken = useUserToken();
  const { COLLECTION } = useCurrentLangPack();
  const { isActionBarOpen, id: currentCollectionId } = useActionBar();

  const classActionBarOpened = () => (isActionBarOpen ? 'action-bar--opened' : '');

  const onClickEdit = () => {
    navigate(`collections/${currentCollectionId}/edit-collection`);
  };

  const onClickDelete = () => {
    console.log('click', currentCollectionId);

    if (userToken && currentCollectionId) {
      deleteCollection(userToken, currentCollectionId)
        .then((response) => {
          console.log(response);
        });
    }
  };

  return (
    <aside className={`actions-bar ${classActionBarOpened()}`}>
      <div className="actions-bar__body">

        <h5 className="actions-bar__title">
          {COLLECTION}
        </h5>
        <div className="actions-bar__options options-flat">
          <ul className="options-flat__list">
            <li>
              <ButtonEdit
                onClickFunction={onClickEdit}
              />
            </li>
            <li>
              <ButtonDelete
                onClickFunction={onClickDelete}
              />
            </li>
          </ul>
        </div>
      </div>
    </aside>
  );
}

CollectionActionsBar.defaultProps = {
  classAdditional: '',
};
