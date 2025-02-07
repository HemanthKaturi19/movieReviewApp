import React, { useState, useEffect } from "react";
import axios from "axios";

const UpdateAnime = ({ animeId }) => {
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

  useEffect(() => {
    // Fetch the anime details by ID
    const fetchAnimeDetails = async () => {
      try {
        const res = await axios.get(`http://localhost:8080/api/anime/${animeId}`);
        setFormData(res.data);
      } catch (error) {
        console.error("Error fetching anime details:", error);
      }
    };

    fetchAnimeDetails();
  }, [animeId]);

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
      const response = await axios.put(`http://localhost:8080/api/anime/${animeId}`, formData);
      console.log("Anime updated successfully:", response.data);
    } catch (error) {
      console.error("Error updating anime:", error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-[#ac380c] shadow-md rounded-lg opacity-9">
      <h1 className="text-2xl font-bold text-black mb-6 text-center">Update Anime Details</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Fields like ID, Name, Review, Description, etc. */}
        {[
          { label: "ID", name: "id", type: "text", disabled: true },
          { label: "Name", name: "name", type: "text" },
          { label: "Review", name: "review", type: "number", step: "0.1" },
          { label: "Description", name: "description", type: "textarea" },
          { label: "Episodes", name: "episodes", type: "number" },
          { label: "Genre", name: "genre", type: "text" },
        ].map((field, idx) => (
          <div key={idx}>
            <label className="block text-black font-medium mb-2">{field.label}</label>
            {field.type === "textarea" ? (
              <textarea
                name={field.name}
                value={formData[field.name]}
                onChange={handleInputChange}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                rows="4"
                placeholder={`Enter ${field.label}`}
                required
              />
            ) : (
              <input
                type={field.type}
                name={field.name}
                value={formData[field.name]}
                onChange={handleInputChange}
                className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                  field.disabled ? "bg-gray-200 cursor-not-allowed" : ""
                }`}
                placeholder={`Enter ${field.label}`}
                step={field.step}
                disabled={field.disabled}
                required
              />
            )}
          </div>
        ))}

        {/* Dynamic Fields: Cast */}
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

        {/* Image Upload */}
        <div>
          <label className="block text-black font-medium mb-2">Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          {formData.imgName && <p className="mt-2 text-sm text-black">Current Image: {formData.imgName}</p>}
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full p-3 bg-red-950 text-white font-medium rounded-lg hover:bg-red-900"
        >
          Update Anime
        </button>
      </form>
    </div>
  );
};

export default UpdateAnime;
