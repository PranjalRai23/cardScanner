import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import axios from 'axios';

const Users = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('/api/v1/cards')
    .then((result) => setData(result.data))
  }, [])

  // Check if data is undefined or empty
  if (!data || data.length === 0) {
    return (
      <div className="text-center py-4">
        <p>No user data available.</p>
      </div>
    );
  }

  // Calculate total pages
  const totalPages = Math.ceil(data.length / itemsPerPage);

  // Get current page data
  const getCurrentPageData = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return data.slice(startIndex, endIndex);
  };

  // Handle page change
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  // Handle items per page change
  const handleItemsPerPageChange = (value) => {
    setItemsPerPage(Number(value));
    setCurrentPage(1); // Reset to first page when changing items per page
  };

  return (
    <div className="flex flex-col h-screen bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
      <div className="flex justify-end mb-4 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
        <Select onValueChange={handleItemsPerPageChange} defaultValue={itemsPerPage.toString()}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Records per page" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="5">5 per page</SelectItem>
            <SelectItem value="10">10 per page</SelectItem>
            <SelectItem value="20">20 per page</SelectItem>
            <SelectItem value="50">50 per page</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex-grow overflow-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead className="bg-gray-100 sticky top-0">
            <tr>
              <th className="py-2 px-4 border-b text-left">Name</th>
              <th className="py-2 px-4 border-b text-left">Job Title</th>
              <th className="py-2 px-4 border-b text-left">Company</th>
              <th className="py-2 px-4 border-b text-left">Email</th>
              <th className="py-2 px-4 border-b text-left">Phone</th>
              <th className="py-2 px-4 border-b text-left">Address</th>
            </tr>
          </thead>
          <tbody>
            {getCurrentPageData().map((user, index) => (
              <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                <td className="py-2 px-4 border-b">{user.name}</td>
                <td className="py-2 px-4 border-b">{user.jobTitle}</td>
                <td className="py-2 px-4 border-b">{user.company}</td>
                <td className="py-2 px-4 border-b">{user.email}</td>
                <td className="py-2 px-4 border-b">{user.phoneNumber}</td>
                <td className="py-2 px-4 border-b">{user.address}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex items-center justify-between mt-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <ChevronLeft className="h-4 w-4 mr-2" />
          Previous
        </Button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <Button
          variant="outline"
          size="sm"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
          <ChevronRight className="h-4 w-4 ml-2" />
        </Button>
      </div>
    </div>
  );
};

export default Users;
