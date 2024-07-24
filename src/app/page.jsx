"use client";

import { useEffect, useState } from 'react';

export default function App() {
  const [makeData, setMakeData] = useState(null);

  const fetchMakeData = async () => {
    try {
      const response = await fetch("/api/listing/make");
      const data = await response.json();
      setMakeData(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  useEffect(() => {
    fetchMakeData();
  }, []);

  return (
    <div>
      <h1>Fetched Data:</h1>
      {makeData ? (
        <pre>{JSON.stringify(makeData, null, 2)}</pre>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
