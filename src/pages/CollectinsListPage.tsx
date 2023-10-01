import { useEffect } from 'react';
import { getCollectionsList } from '../connect/server-connections';
/* eslint-disable-next-line */
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjMsInVzZXJuYW1lIjoi0KLQtdC50LzRg9GA0LDQtyDQn9GD0LvQuNC9IiwiZW1haWwiOiJ0aW1wdXZrY29tQGdtYWlsLmNvbSIsImlhdCI6MTY5NjEwODQ4NywiZXhwIjoxNjk2MTk0ODg3fQ.o4qgqoZ7q_ZK6Jv6qjDUrG6P8_mn9vf7c0f8Wu38sho';

export default function CollectionsListPage() {
  useEffect(() => {
    getCollectionsList(token);
  });
  return (
    <div>
      collections
    </div>
  );
}
