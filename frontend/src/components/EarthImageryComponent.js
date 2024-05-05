import React, { useState, useEffect } from "react";

const EarthImageryComponent = () => {
  const [earthImageryData, setEarthImageryData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEarthImagery = async () => {
      try {
        const response = await fetch(
          "https://api.nasa.gov/planetary/earth/imagery?lon=100.75&lat=1.5&date=2014-02-01&dim=0.1&api_key=2odf3ygbkwsz31zHnC5ctNFFwyTi8FgRsoKtc1lD"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch Earth imagery");
        }

        const blob = await response.blob(); // Fetch the response as a Blob (binary data)
        const url = URL.createObjectURL(blob); // Create a URL for the Blob

        setEarthImageryData(url);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching Earth imagery:", error);
        setLoading(false);
      }
    };

    fetchEarthImagery();
  }, []);

  return (
    <div>
      <h2>Earth Imagery</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <img src={earthImageryData} alt="Earth Imagery" />
          <p>No imagery available</p>
        </div>
      )}
    </div>
  );
};

export default EarthImageryComponent;
