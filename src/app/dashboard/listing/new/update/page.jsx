"use client"
import dynamic from 'next/dynamic';

const AddListing = dynamic(() => import('@/components/block/updateList'), {
  ssr: false 
});

export default function App() {
  return (
    <div className="">
      <h3 className='font-bold ml-4'>Add New Listing </h3>
      <AddListing></AddListing>
    </div>
  );
}