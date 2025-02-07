import React, { useState } from "react";
import axios from "axios";

const CreatingAnime = () => {
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    review: 0.0,
    description: "",
    episodes: 0,
    genre: "",
    cast: [""],
    reviews: [""],
    imgName: "",
    imgType: "",
    imgData: null, 
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setFormData({
          ...formData,
          imgName: file.name,
          imgType: file.type,
          imgData: reader.result.split(",")[1], // Base64 encoding
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleListChange = (e, index, field) => {
    const newList = [...formData[field]];
    newList[index] = e.target.value;
    setFormData({
      ...formData,
      [field]: newList,
    });
  };

  const addToList = (field) => {
    setFormData({
      ...formData,
      [field]: [...formData[field], ""],
    });
  };

  const removeFromList = (field, index) => {
    const newList = formData[field].filter((_, i) => i !== index);
    setFormData({
      ...formData,
      [field]: newList,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/api/anime", formData);
      console.log("Anime submitted successfully:", response.data);
    } catch (error) {
      console.error("Error submitting anime:", error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-[#ac380c] shadow-md rounded-lg opacity-9">
      <h1 className="text-2xl font-bold text-black mb-6 text-center">Anime Submission Form</h1>
      <form onSubmit={handleSubmit} className="space-y-6 ">
        {/* ID */}
        <div>
          <label className="block text-black font-medium mb-2">ID</label>
          <input
            type="text"
            name="id"
            value={formData.id}
            onChange={handleInputChange}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter Anime ID"
            required
          />
        </div>

        {/* Name */}
        <div>
          <label className="block text-black font-medium mb-2">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter Anime Name"
            required
          />
        </div>

        {/* Review */}
        <div>
          <label className="block text-black font-medium mb-2">Review</label>
          <input
            type="number"
            name="review"
            value={formData.review}
            onChange={handleInputChange}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            step="0.1"
            placeholder="Enter Review (e.g., 4.5)"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-black font-medium mb-2">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            rows="4"
            placeholder="Enter Anime Description"
            required
          />
        </div>

        {/* Episodes */}
        <div>
          <label className="block text-black font-medium mb-2">Episodes</label>
          <input
            type="number"
            name="episodes"
            value={formData.episodes}
            onChange={handleInputChange}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter Number of Episodes"
            required
          />
        </div>

        {/* Genre */}
        <div>
          <label className="block text-black font-medium mb-2">Genre</label>
          <input
            type="text"
            name="genre"
            value={formData.genre}
            onChange={handleInputChange}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter Genre (e.g., Action, Romance)"
            required
          />
        </div>

        {/* Cast */}
        <div>
          <label className="block text-black font-medium mb-2">Cast</label>
          {formData.cast.map((castMember, index) => (
            <div key={index} className="flex items-center gap-2 mb-2">
              <input
                type="text"
                value={castMember}
                onChange={(e) => handleListChange(e, index, "cast")}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder={`Enter Cast Member ${index + 1}`}
                required
              />
              <button
                type="button"
                className="p-2 bg-red-900 text-white rounded-lg"
                onClick={() => removeFromList("cast", index)}
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            className="px-4 py-2 bg-green-900 text-white rounded-lg"
            onClick={() => addToList("cast")}
          >
            Add Cast
          </button>
        </div>

        {/* Reviews */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">Reviews</label>
          {formData.reviews.map((review, index) => (
            <div key={index} className="flex items-center gap-2 mb-2">
              <input
                type="text"
                value={review}
                onChange={(e) => handleListChange(e, index, "reviews")}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder={`Enter Review ${index + 1}`}
              />
              <button
                type="button"
                className="p-2 bg-red-900 text-white rounded-lg"
                onClick={() => removeFromList("reviews", index)}
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            className="px-4 py-2 bg-green-900 text-white rounded-lg"
            onClick={() => addToList("reviews")}
          >
            Add Review
          </button>
        </div>

        {/* Image */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full p-3 bg-red-950 text-white font-medium rounded-lg hover:bg-red-900"
        >
          Submit Anime
        </button>
      </form>
    </div>
  );
};

export default CreatingAnime;

