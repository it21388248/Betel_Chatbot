// MarsRoverPhotos.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import Header from "../components/Background/Header";
import Footer from "../components/Background/Footer";
import { saveImageToProfile } from "../apiService"; // Import the API service

const MarsRoverPhotos = () => {
  const [photos, setPhotos] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // Add loading state

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const response = await axios.get(
          "https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=2odf3ygbkwsz31zHnC5ctNFFwyTi8FgRsoKtc1lD"
        );
        setPhotos(response.data.photos);
      } catch (error) {
        console.error("Error fetching photos:", error);
      }
    };

    fetchPhotos();
  }, []);

  const images = photos.map((photo) => ({
    original: photo.img_src,
    thumbnail: photo.img_src,
    description: `Mars Rover Photo ${photo.id}`,
  }));

  const handleSaveImage = async () => {
    // Ensure a selected image exists
    if (!selectedImage) {
      console.warn("No image selected to save.");
      return;
    }

    setIsLoading(true); // Set loading state to true

    try {
      const userId = localStorage.getItem("userId");
      const imageUrl = selectedImage.original;

      console.log("userId:", userId);
      console.log("imageUrl:", imageUrl);

      // Retrieve existing saved image URLs for the user from local storage
      let savedImageUrls = JSON.parse(localStorage.getItem(userId)) || [];
      // Add new image URL to the array
      savedImageUrls.push(imageUrl);
      // Save updated array back to local storage
      localStorage.setItem(userId, JSON.stringify(savedImageUrls));

      // Call the API endpoint to save the image to the user's profile
      await saveImageToProfile(userId, imageUrl); // Call the saveImageToProfile function
      console.log("Image saved to profile successfully!");
      // Optionally, you can show a success message to the user
    } catch (error) {
      console.error("Error saving image to profile:", error);
      // Optionally, you can show an error message to the user
    } finally {
      setIsLoading(false); // Set loading state back to false
    }
  };

  return (
    <div>
      <Header />
      <div className="max-w-xl mx-auto mt-8 relative">
        <h2 className="text-2xl font-bold mb-4">Mars Rover Photos</h2>
        {photos.length > 0 ? (
          <>
            <ImageGallery
              items={images}
              showPlayButton={false}
              onSlide={(index) => setSelectedImage(images[index])}
            />
            <button
              onClick={handleSaveImage}
              disabled={!selectedImage || isLoading} // Disable button when no image is selected or while loading
              className={`absolute top-0 right-0 mt-2 mr-6 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
                isLoading && "opacity-50 cursor-not-allowed" // Apply styles for loading state
              } pb-2 mb-3`} // Add padding-bottom and margin-bottom utility classes
            >
              {isLoading ? "Saving..." : "Save Image"}
            </button>
          </>
        ) : (
          <p className="text-gray-600">No photos available</p>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default MarsRoverPhotos;
