import { useNavigate } from 'react-router-dom';
import { CollectionType } from '../../utils/types';
import { useNeedCurrentCollectionUpdate } from '../global-context-provider/update-collection';

type CardCollectionPropsType = {
  collection: CollectionType;
};

export default function CardCollection(props:CardCollectionPropsType) {
  const { collection } = props;
  const navigate = useNavigate();
  const { setIsNeedCurrentCollectionUpdate } = useNeedCurrentCollectionUpdate();

  const goToCollectionPage = () => {
    setIsNeedCurrentCollectionUpdate(true);
    navigate(`/collections/${collection.id}`);
  };
  return (
    <article className="card card--collection">
      <div className="card__body card__body--native">
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
