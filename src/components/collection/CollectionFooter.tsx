import { useNavigate } from 'react-router-dom';
import { useCurrentCollectionId } from '../collection-page-context-provider/card-context-hooks';
import ButtonSettings from '../base/buttons/ButtonSettings';
import ButtonPlus from '../base/buttons/button-plus/ButtonPlus';
import { useActionBar } from '../global-context-provider/action-bar-context-hook';

export default function CollectionFooter() {
  const navigate = useNavigate();
  const { currentCollectionId } = useCurrentCollectionId();
  const { setId: setCurrentCollectionId, setIsActionBarOpen } = useActionBar();

  const openCollectionActionsBar = () => {
    setCurrentCollectionId(currentCollectionId);
    setIsActionBarOpen(true);
  };

  const gotoCreateNewCardPage = () => {
    navigate(`/collections/${currentCollectionId}/create-new-card`);
  };

  return (
    <div className="collection-footer">
      <div className="collection-footer__body">
        <ButtonSettings
          onClickFunction={openCollectionActionsBar}
        />
        <ButtonPlus
          classAdditional="collections__button-new "
          onClickFunction={gotoCreateNewCardPage}
        />
      </div>
    </div>
  );
}

// TODO поставить max-width для футера - 991px или сколько там максимальная ширина контейнера
