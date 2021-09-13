import { useState, useEffect } from "react";
import { usePosition } from "use-position";

const App = () => {
  const [weather, setWeather] = useState("");
  const { latitude, longitude } = usePosition();

  const toUpperCaseFirstLetterOfAllWords = (sentence) => {
    const words = sentence.split(" ");
    for (let i = 0; i < words.length; i++) {
      words[i] = words[i][0].toUpperCase() + words[i].substr(1) + " ";
    }
    return words;
  };

  const getWeatherData = (lat, lon) => {
    let apiKey = process.env.REACT_APP_OPEN_WEATHER_API_KEY;
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&lang=tr`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => setWeather(data))
      .catch((e) => alert(e.message));
  };

  useEffect(
    () => latitude && longitude && getWeatherData(latitude, longitude),
    [latitude, longitude]
  );

  useEffect(() => console.log(weather), [weather]);

  return (
    <div>
      {weather && (
        <>
          <h1>Hava Durumu</h1>
          <h3>{weather.name}</h3>
          <h3>{Math.ceil(weather.main.temp - 273.15)}°</h3>
          <h3>
            {weather.weather.map((data) =>
              toUpperCaseFirstLetterOfAllWords(data.description)
            )}
          </h3>
        </>
      )}
    </div>
  );
};

export default App;
