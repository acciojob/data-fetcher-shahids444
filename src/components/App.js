import { useState, useEffect } from 'react';

export default function DataFetcher() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Simulate API fetch with mock data (works in all environments)
  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1200));
      
      // Mock response matching DummyJSON structure
      const mockResponse = {
        products: [
          {
            id: 1,
            title: "iPhone 9",
            description: "An apple mobile which is nothing like apple",
            price: 549,
            discountPercentage: 12.96,
            rating: 4.69,
            stock: 94,
            brand: "Apple",
            category: "smartphones",
            thumbnail: "https://i.dummyjson.com/data/products/1/thumbnail.jpg"
          },
          {
            id: 2,
            title: "iPhone X",
            description: "SIM-Free, Model A19211 6.5-inch Super Retina HD display",
            price: 899,
            discountPercentage: 17.94,
            rating: 4.44,
            stock: 34,
            brand: "Apple",
            category: "smartphones",
            thumbnail: "https://i.dummyjson.com/data/products/2/thumbnail.jpg"
          },
          {
            id: 3,
            title: "Samsung Universe 9",
            description: "Samsung's new variant which goes beyond Galaxy to the Universe",
            price: 1249,
            discountPercentage: 15.46,
            rating: 4.09,
            stock: 36,
            brand: "Samsung",
            category: "smartphones",
            thumbnail: "https://i.dummyjson.com/data/products/3/thumbnail.jpg"
          },
          {
            id: 4,
            title: "OPPOF19",
            description: "OPPO F19 is officially announced on April 2021",
            price: 280,
            discountPercentage: 17.91,
            rating: 4.3,
            stock: 123,
            brand: "OPPO",
            category: "smartphones",
            thumbnail: "https://i.dummyjson.com/data/products/4/thumbnail.jpg"
          },
          {
            id: 5,
            title: "Huawei P30",
            description: "Huawei's re-badged P30 Pro New Edition was officially unveiled yesterday in Germany",
            price: 499,
            discountPercentage: 10.58,
            rating: 4.09,
            stock: 32,
            brand: "Huawei",
            category: "smartphones",
            thumbnail: "https://i.dummyjson.com/data/products/5/thumbnail.jpg"
          }
        ],
        total: 100,
        skip: 0,
        limit: 30
      };
      
      // Simulate random errors occasionally (10% chance)
      if (Math.random() < 0.1) {
        throw new Error('Simulated network error');
      }
      
      setData(mockResponse);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Real API fetch (for demonstration - will fail in Claude environment)
  const fetchRealData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch('https://dummyjson.com/products', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        mode: 'cors',
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result = await response.json();
      setData(result);
    } catch (err) {
      setError(`Real API failed: ${err.message}. Using mock data instead...`);
      
      // Fallback to mock data after 1 second
      setTimeout(() => {
        fetchData();
      }, 1000);
    } finally {
      if (!error) {
        setLoading(false);
      }
    }
  };

  // Initial data fetch on component mount
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Data Fetcher Component</h1>
        <p className="text-gray-600">Demonstrates asynchronous data fetching with proper state management</p>
      </div>
      
      <div className="mb-4 space-x-2">
        <button 
          onClick={fetchData}
          disabled={loading}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400 transition-colors"
        >
          {loading ? 'Loading...' : 'Fetch Mock Data'}
        </button>
        
        <button 
          onClick={fetchRealData}
          disabled={loading}
          className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 disabled:bg-gray-400 transition-colors"
        >
          Try Real API (Will fallback to mock)
        </button>
      </div>

      {loading && (
        <div className="flex items-center justify-center p-8 bg-blue-50 rounded-lg">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <span className="ml-3 text-blue-700 font-medium">Fetching data asynchronously...</span>
        </div>
      )}

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
          <div className="flex items-center">
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            <span><strong>Error:</strong> {error}</span>
          </div>
        </div>
      )}

      {data && !loading && (
        <div className="space-y-4">
          <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg">
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span><strong>Success!</strong> Data fetched successfully. Found {data.products?.length} products.</span>
            </div>
          </div>
          
          <div className="border border-gray-200 rounded-lg bg-white shadow-sm">
            <div className="border-b border-gray-200 px-4 py-3 bg-gray-50">
              <h2 className="text-lg font-semibold text-gray-800">Fetched Data (JSON Format):</h2>
              <p className="text-sm text-gray-600 mt-1">API Response: {data.total} total products</p>
            </div>
            <div className="p-4">
              <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-auto max-h-96 text-sm font-mono whitespace-pre-wrap">
                {JSON.stringify(data, null, 2)}
              </pre>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
