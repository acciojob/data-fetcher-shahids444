import React, { useState, useEffect } from 'react';

export default function DataFetcher() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    fetch('https://dummyjson.com/products')
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((result) => {
        setData(result);
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div className="p-6 max-w-full">
      <h1 className="text-2xl font-bold mb-4">Data Fetcher</h1>

      {loading && (
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <span className="ml-3 text-gray-600">Fetching data...</span>
        </div>
      )}

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          <strong>Error:</strong> {error}
        </div>
      )}

      {!loading && !error && (
        <div>
          {data ? (
            <div>
              <p className="mb-4 text-gray-700">
                Data fetched successfully from:{' '}
                <code className="bg-gray-100 px-2 py-1 rounded">
                  https://dummyjson.com/products
                </code>
              </p>
              <pre className="bg-gray-50 border rounded-lg p-4 overflow-auto text-sm max-h-96 whitespace-pre-wrap">
                {JSON.stringify(data, null, 2)}
              </pre>
            </div>
          ) : (
            <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded">
              No data found
            </div>
          )}
        </div>
      )}
    </div>
  );
}
