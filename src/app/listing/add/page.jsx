"use client"
import dynamic from 'next/dynamic';

const AddListing = dynamic(() => import('@/components/block/addList'), {
  ssr: false // Disable server-side rendering
});

export default function App() {
  return (
    <div className="">
      <AddListing></AddListing>
    </div>
  );
}
