import React, { useState, useRef } from 'react';
import { Loader2 } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import axios from 'axios';
import { Link } from 'react-router-dom';

const VisitingCardOCR = () => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isDragActive, setIsDragActive] = useState(false);
  const [uploaded, setUploaded] = useState(false);
  const fileInputRef = useRef(null);
  const [cardData, setCardData] = useState({
    name: '',
    jobTitle: '',
    companyName: '',
    email: '',
    phone: '',
    address: '',
  });

  const handleFile = (selectedFile) => {
    if (selectedFile && selectedFile.type.startsWith('image/')) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
      setError(null);
    } else {
      setError('Please upload a valid image file.');
    }
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);
    const droppedFile = e.dataTransfer.files[0];
    handleFile(droppedFile);
  };

  const handleFileInput = (e) => {
    const selectedFile = e.target.files[0];
    handleFile(selectedFile);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setError('Please upload an image first.');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      
      const formData = new FormData();
      formData.append('card', file);
      const result = await axios.post("/api/v1/upload", formData);
      const client = result.data;

      setCardData({
        name: client.name || "null",
        jobTitle: client.jobTitle || "null",
        companyName: client.company || "null",
        email: client.email || "null",
        phone: client.phoneNumber || "null",
        address: client.address || "null",
      });

      setUploaded(true);

    } catch (error) {
      setError('OCR process failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-xl bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
      <h1 className="text-2xl font-bold mb-6">Visiting Card Upload</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div
          className={`border-2 border-dashed rounded-lg p-4 text-center cursor-pointer ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
            }`}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current.click()}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileInput}
            className="hidden"
          />
          {preview ? (
            <img src={preview} alt="Preview" className="mx-auto max-h-40 mb-2" />
          ) : (
            <p>Drag & drop an image here, or click to select one</p>
          )}
        </div>

        {Object.entries(cardData).map(([key, value]) => (
          <Input
            key={key}
            type="text"
            placeholder={key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}
            value={value}
            onChange={(e) => setCardData({ ...cardData, [key]: e.target.value })}
          />
        ))}

        {uploaded &&
          <div>
            <h4>Uploaded!</h4>
            <Link to='/'>
              <Button className="w-full">HOME</Button>
            </Link>
          </div>}

        <Button type="submit" disabled={isLoading} className="w-full">
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Processing...
            </>
          ) : (
            'Process Image'
          )}
        </Button>
      </form>

      {error && (
        <Alert variant="destructive" className="mt-4">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
    </div>
  );
};

export default VisitingCardOCR;