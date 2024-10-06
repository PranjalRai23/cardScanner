import React from 'react';
import { Button } from "@/components/ui/button";
import { Link, Navigate } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-h-screen w-full bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-6">Welcome to OCR App</h1>
        <div className="space-y-4">
          <div>
          <Link to='/upload'>
            <Button
              className="w-full flex items-center justify-center"
            >
              <span className="mr-2">📷</span>
              Visiting Card Upload
            </Button>
          </Link>
        </div>
        <div>
          <Link to='/users'>
            <Button
              className="w-full flex items-center justify-center"
            >
              <span className="mr-2">👥</span>
              View Users
            </Button>
          </Link>
        </div>
      </div>
    </div>
    </div >
  );
};

export default Home;