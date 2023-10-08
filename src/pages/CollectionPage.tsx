// import { useDispatch } from 'react-redux';
// import { updateCurrentPageName } from '../store/slicers/current-page-slice';
import { useEffect, useState } from 'react';
import { Outlet, useParams } from 'react-router-dom';
import {
  currentCollectionIdContext,
  CurrentCollectionIdType,
} from '../components/cards/card-context-hooks/card-context-hooks';
// import {
//   Outlet, useLoaderData, LoaderFunction, LoaderFunctionArgs,
// } from 'react-router-dom';

// export const cardsCollectionLoader = (async ({ params }: LoaderFunctionArgs):Promise<CardsCollectionType> => {
//   let cardsCollection;
//   if (params.id) {
//     cardsCollection = await getCardsCollection(params.id);
//   }
//   return cardsCollection;
// });

export default function CollectionPage() {
  const [currentCollectionId, setCurrentCollectionId] = useState<CurrentCollectionIdType>(null);
  const params = useParams();
  // const dispatch = useDispatch();

  useEffect(() => {
    const { id } = params;
    setCurrentCollectionId(Number(id));
  }, []);

  return (
    <currentCollectionIdContext.Provider value={currentCollectionId}>
      <Outlet />
    </currentCollectionIdContext.Provider>
  );
}
