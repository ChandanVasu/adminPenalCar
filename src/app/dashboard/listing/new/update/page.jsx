"use client";
import dynamic from 'next/dynamic';

const AddListing = dynamic(() => import('@/components/block/updateList'), {
  ssr: false 
});

export default function App(context) {
  // const listingId = "66a67dcccf3274deeb27f03f"; 

  const params = context.searchParams

  return (
    <div className="">
      <AddListing listingId={params.id} />
    </div>
  );
}
