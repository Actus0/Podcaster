import React from 'react';
import { Link } from 'react-router-dom';

const NoPage = () => {
  return (
    <div className="h-screen w-screen flex justify-center items-center bg-gray-800 text-gray-300">
      <div className="text-center">
        <h1 className="text-6xl font-bold mb-4">404</h1>
        <h2 className="text-3xl font-medium mb-4">Page Not Found</h2>
        <p className="text-lg mb-8">Sorry, the page you're looking for doesn't exist.</p>
        <div className="flex justify-center">
          <p className="text-lg mr-2">Go To</p>
          <Link to="/" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NoPage;