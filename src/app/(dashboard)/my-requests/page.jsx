import ReqestCard from '@/components/ReqestCard';
import React from 'react';

const MyRequestsPage = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER}/request`, {
    cache: 'no-store',
  });
  const clientRequest = await res.json();

  return (
    <div>
      <ReqestCard clientRequest={clientRequest} />
    </div>
  );
};

export default MyRequestsPage;
