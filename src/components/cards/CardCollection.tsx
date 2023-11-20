import { useNavigate } from 'react-router-dom';
import { CollectionType } from '../../utils/types';
import { useNeedCurrentCollectionUpdate } from '../global-context-provider/update-collection';
import CardControlBlock from './card-control-block/CardControlBlock';
import ButtonAddCard from '../base/buttons/ButtonAddCard';

type CardCollectionPropsType = {
  collection: CollectionType;
  onCollectionDelete: (collectionId:number) => void;
};

export default function CardCollection(props:CardCollectionPropsType) {
  const { collection, onCollectionDelete } = props;
  const navigate = useNavigate();
  const { setIsNeedCurrentCollectionUpdate } = useNeedCurrentCollectionUpdate();

  const goToCollectionPage = () => {
    setIsNeedCurrentCollectionUpdate(true);
    navigate(`/collection/${collection.id}`);
  };

  const onCollectionEdit = () => {
    navigate(`/collection/${collection.id}/edit-collection`);
  };

  const onClickAddCard = () => {
    navigate(`/collection/${collection.id}/create-new-card`);
  };

  return (
    <article className="card card--collection">
      <div className="card__body">

        <CardControlBlock
          onEdit={onCollectionEdit}
          onDelete={() => onCollectionDelete(collection.id)}
          JSXList={[<ButtonAddCard onClickAddCard={onClickAddCard} />]}
        />
        <div className="card__content">
          <h2 className="card__title">
            {collection.name}

          </h2>
          <p className="card__description">{collection.description}</p>
          <span className="card__additional-info">
            <span className="card__langs">
              {collection.language.iso}
              {' '}
              -
              {' '}
              {collection.translationLanguage.iso}
            </span>
          </span>
        </div>
      </div>
      {/* eslint-disable-next-line */}
      <div
        className="card__link"
        onClick={goToCollectionPage}
      />
    </article>
  );
}
