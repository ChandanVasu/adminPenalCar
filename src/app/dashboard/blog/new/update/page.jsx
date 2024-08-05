"use client"
import dynamic from 'next/dynamic';

const UpdateBlog = dynamic(() => import('@/components/block/updateBlog'), {
  ssr: false 
});

export default function App() {
  return (
    <div className="">
      <UpdateBlog></UpdateBlog>
    </div>
  );
}