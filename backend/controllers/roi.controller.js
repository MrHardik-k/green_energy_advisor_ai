import axios from "axios";

export const getRoi = async (req, res) => {
  try {
    let { pincode, data } = req.body;
    const latlong = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${pincode}&key=AIzaSyAYQK8WkkYqOCvOpJJUMTi3d2SPw60voqM`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const lat = latlong.data.results[0].geometry.location.lat;
    const long = latlong.data.results[0].geometry.location.lng;
    const weatherData = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=ee481756e38276e751dbd815ef44c4cc`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const weather = weatherData.data;
    let sD = {};

    let altitude = weather.main.grnd_level;
    let humidity = weather.main.humidity;
    let temp = weather.main.temp;
    let wind = weather.wind.speed;
    let visibility = weather.visibility / 1000;
    let pressure = weather.main.pressure;
    sD["features"] = [];
    sD["features"].push(lat);
    sD["features"].push(long);
    sD["features"].push(altitude);
    sD["features"].push(humidity);
    sD["features"].push(temp);
    sD["features"].push(wind);
    sD["features"].push(visibility);
    sD["features"].push(pressure);
    sD["features"].push(0);
    sD["features"].push(0);
    sD["features"].push(0);
    sD["features"].push(1);
    console.log(sD);

    const solarData = await axios.post(
      `https://solar-potential-prediction-model.onrender.com/predict`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(sD),
      }
    );
    const solar = solarData.data;
    res.status(200).json({ lat, long, solar });
  } catch (error) {
    console.error("Error verifying token:", error);
    res.status(401).json({ message: "Invalid token" });
  }
};
