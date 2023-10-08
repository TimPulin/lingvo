import { Link } from 'react-router-dom';
import { CollectionType } from '../../utils/types';

type CardCollectionPropsType = {
  collection: CollectionType;
};

export default function CardCollection(props:CardCollectionPropsType) {
  const { collection } = props;
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
      <Link className="card__link" to={`/collections/${collection.id}`}> </Link>
    </article>
  );
}
