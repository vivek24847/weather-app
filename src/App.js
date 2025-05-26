import React, { useState } from "react";
import { Sun, Cloud, CloudRain, CloudSnow, Zap } from "lucide-react";
import { toast, Toaster } from "sonner";
import SearchForm from "./components/SearchForm";
import WeatherDislay from "./components/WeatherDislay";
import FavouriteTab from "./components/FavouriteTab";
import NavigationTabs from "./components/NavigationTabs";

const App = () => {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("search");

  const API_KEY = "ed98fce7e2909c44281cb6a2db9a29de";
  const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";


  const getWeatherIcon = (weatherMain, size = 48) => {
    switch (weatherMain?.toLowerCase()) {
      case "clear":
        return <Sun size={size} className="text-yellow-500" />;
      case "clouds":
        return <Cloud size={size} className="text-gray-500" />;
      case "rain":
      case "drizzle":
        return <CloudRain size={size} className="text-blue-600" />;
      case "snow":
        return <CloudSnow size={size} className="text-blue-200" />;
      case "thunderstorm":
        return <Zap size={size} className="text-purple-600" />;
      default:
        return <Sun size={size} className="text-blue-500" />;
    }
  };

  const fetchWeatherData = async (cityName) => {
    setLoading(true);

    try {
      const response = await fetch(
        `${BASE_URL}?q=${cityName}&appid=${API_KEY}&units=metric`
      );
      const data = await response.json();
      console.log(data, "dataaaaaaa");
      if (data?.cod === "404" || data?.cod === "500") {
        toast.error(data?.message);
      } else {
        setWeatherData(data);
      }
    } catch (err) {
      toast.error(err.message || "Something went wrong");
      setWeatherData(null);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetchWeatherData(city.trim());
  };

  const addToFavorites = () => {
    if (
      weatherData &&
      !favorites.some(
        (fav) => fav.name.toLowerCase() === weatherData.name.toLowerCase()
      )
    ) {
      const favoriteCity = {
        id: Date.now(),
        name: weatherData.name,
        country: weatherData.sys.country,
        temp: weatherData.main.temp,
        description: weatherData.weather[0].description,
        main: weatherData.weather[0].main,
      };
      setFavorites([...favorites, favoriteCity]);
    }
  };

  const removeFromFavorites = (cityId) => {
    setFavorites(favorites?.filter((fav) => fav.id !== cityId));
  };

  const isInFavorites =
    weatherData &&
    favorites?.some(
      (fav) => fav.name.toLowerCase() === weatherData.name.toLowerCase()
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
            Weather Dashboard
          </h1>
          <p className="text-blue-100 text-lg">
            Get current weather information for any city
          </p>
        </div>

        <NavigationTabs
          setActiveTab={setActiveTab}
          activeTab={activeTab}
          favorites={favorites}
        />

        {activeTab === "search" && (
          <div className="space-y-6">
            <SearchForm
              setCity={setCity}
              city={city}
              loading={loading}
              handleSubmit={handleSubmit}
            />

            {weatherData && (
              <WeatherDislay
                isInFavorites={isInFavorites}
                getWeatherIcon={getWeatherIcon}
                weatherData={weatherData}
                addToFavorites={addToFavorites}
              />
            )}
          </div>
        )}

        {activeTab === "favorites" && (
          <FavouriteTab
            removeFromFavorites={removeFromFavorites}
            favorites={favorites}
            getWeatherIcon={getWeatherIcon}
          />
        )}
      </div>
      <Toaster richColors position="top-right" />
    </div>
  );
};

export default App;
