import React, { useState, useEffect } from 'react';

const AddPodcast = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [categoryName, setCategoryName] = useState('');
  const [frontImage, setFrontImage] = useState(null);
  const [audioFile, setAudioFile] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch('http://localhost:3000/api/get-categories')
      .then(response => response.json())
      .then(data => setCategories(data))
      .catch(error => {
        console.error('Error fetching categories:', error);
        setError('Failed to load categories');
      });
  }, []);

  const handleChange = (setter) => (event) => setter(event.target.value);
  const handleFileChange = (setter) => (event) => setter(event.target.files[0]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    if (!title || !description || !categoryName || !frontImage || !audioFile) {
      setError('Please fill in all fields and upload both files.');
      setLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('categoryName', categoryName);
    formData.append('frontImage', frontImage); 
    formData.append('audioFile', audioFile); 

    try {
      const response = await fetch('http://localhost:3000/api/add-podcast', {
        method: 'POST',
        body: formData,
        credentials: 'include',
        headers: {
          // Not sending Content-Type header, FormData will set it correctly
        }
      });

      if (response.ok) {
        setSuccess('Podcast added successfully!');
        setTitle('');
        setDescription('');
        setCategoryName('');
        setFrontImage(null);
        setAudioFile(null);
      } else {
        const result = await response.json();
        setError(result.message || 'Failed to add podcast');
      }
    } catch (error) {
      setError('Failed to add podcast. ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4 pt-6 md:p-6 lg:p-12">
      <h1 className="text-3xl font-bold mb-4">Add Podcast</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <label className="flex flex-col">
          Title:
          <input
            type="text"
            value={title}
            onChange={handleChange(setTitle)}
            required
            className="p-2 border border-gray-300 rounded"
          />
        </label>
        <label className="flex flex-col">
          Description:
          <textarea
            value={description}
            onChange={handleChange(setDescription)}
            required
            className="p-2 border border-gray-300 rounded"
          />
        </label>
        <label className="flex flex-col">
          Category:
          <select
            value={categoryName}
            onChange={handleChange(setCategoryName)}
            required
            className="p-2 border border-gray-300 rounded"
          >
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category._id} value={category.categoryName}>
                {category.categoryName}
              </option>
            ))}
          </select>
        </label>
        <label className="flex flex-col">
          Front Image:
          <input
            type="file"
            onChange={handleFileChange(setFrontImage)}
            accept="image/*"
            required
            className="p-2 border border-gray-300 rounded"
          />
        </label>
        <label className="flex flex-col">
          Audio File:
          <input
            type="file"
            onChange={handleFileChange(setAudioFile)}
            accept="audio/*"
            required
            className="p-2 border border-gray-300 rounded"
          />
        </label>
        <button
          type="submit"
          disabled={loading}
          className={`bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded ${loading ? 'cursor-not-allowed' : ''}`}
        >
          {loading ? 'Uploading...' : 'Add Podcast'}
        </button>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        {success && <p className="text-green-500 text-sm">{success}</p>}
      </form>
    </div>
  );
};

export default AddPodcast;
