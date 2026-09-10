 /* SOS FUNCTION */

const handleSOS = () => {
  // Check whether the browser supports location
  if (!navigator.geolocation) {
    alert("Location is not supported by this device/browser.");
    return;
  }

  // Ask the user for their current location
  navigator.geolocation.getCurrentPosition(
    async (position) => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;

      console.log("SOS Location:", latitude, longitude);

      try {
        // Send location to Python backend
        const response = await fetch(
          "http://localhost:8000/api/sos",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              latitude: latitude,
              longitude: longitude,
              user_id: loginId,
            }),
          }
        );

        const data = await response.json();

        if (response.ok) {
          alert("🚨 SOS alert sent successfully!");
          console.log("SOS response:", data);
        } else {
          alert(data.detail || "Failed to send SOS.");
        }

      } catch (error) {
        console.error("SOS error:", error);
        alert(
          "Could not connect to the SOS server. Please try again."
        );
      }
    },

    (error) => {
      console.error("Location error:", error);

      if (error.code === error.PERMISSION_DENIED) {
        alert(
          "Location permission is required to send an SOS."
        );
      } else {
        alert("Could not get your location.");
      }
    }
  );
};
