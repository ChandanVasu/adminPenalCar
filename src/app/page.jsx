"use client"
import Link from 'next/link';

export default function Home() {
  const data = "chandanbabu";

  return (
    <div>
      <Link
        href={{
          pathname: '/demo',
          query: { name: "chanan"} 
        }}
      >
        Go to Demo Page
      </Link>
    </div>
  );
}
