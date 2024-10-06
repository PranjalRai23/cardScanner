import React from 'react';
import { Button } from "@/components/ui/button";
import { Link, Navigate } from 'react-router-dom';

const Home = () => {
  return (
    <div className="bg-gray-100 rounded-lg shadow-md flex items-center justify-center bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
        <h1 className="text-3xl font-bold text-center mb-6">Welcome to <span className='text-white'>My</span><span className='text-[#D7B56D]'>Air</span><span className='text-white'>Deal</span></h1>
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