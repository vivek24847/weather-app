import { Droplets, Eye, Heart, Star, Thermometer, Wind } from "lucide-react";

const WeatherDislay = ({getWeatherIcon , weatherData, addToFavorites , isInFavorites}) => {
  console.log(weatherData , "wjfkwe")
    return (
    <div>
      <div className="bg-white/10  rounded-2xl p-6 shadow-xl">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-6">
          <div className="flex items-center mb-4 lg:mb-0">
            <div className="mr-4">
              {getWeatherIcon(weatherData?.weather[0]?.main, 80)}
            </div>
            <div>
              <h2 className="text-3xl font-bold text-white mb-1">
                {weatherData.name}
                {weatherData.sys.country && (
                  <span className="text-xl text-blue-100 ml-2">
                    {weatherData.sys.country}
                  </span>
                )}
              </h2>
              <p className="text-blue-100 capitalize text-lg">
                {weatherData.weather[0].description}
              </p>
            </div>
          </div>

          <button
            onClick={addToFavorites}
            disabled={isInFavorites}
            className={`flex items-center px-4 py-2 rounded-lg font-medium  ${
              isInFavorites
                ? "bg-green-500/20 text-green-100 cursor-not-allowed"
                : "bg-white/20 hover:bg-white/30 text-white "
            }`}
          >
            {isInFavorites ? (
              <>
                <Star className="w-4 h-4 mr-2 fill-current" />
                Added to Favorites
              </>
            ) : (
              <>
                <Heart className="w-4 h-4 mr-2" />
                Add to Favorites
              </>
            )}
          </button>
        </div>

        <div className="text-center mb-6">
          <div className="text-6xl md:text-7xl font-bold text-white mb-2">
            {Math.round(weatherData.main.temp)}°C
          </div>
          <div className="text-blue-100 text-lg">
            Feels like {Math.round(weatherData.main.feels_like)}°C
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 text-center">
            <Droplets className="w-8 h-8 text-blue-200 mx-auto mb-2" />
            <div className="text-2xl font-bold text-white">
              {weatherData.main.humidity}%
            </div>
            <div className="text-blue-100 text-sm">Humidity</div>
          </div>

          <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 text-center">
            <Wind className="w-8 h-8 text-blue-200 mx-auto mb-2" />
            <div className="text-2xl font-bold text-white">
              {weatherData.wind.speed} m/s
            </div>
            <div className="text-blue-100 text-sm">Wind Speed</div>
          </div>

          <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 text-center">
            <Eye className="w-8 h-8 text-blue-200 mx-auto mb-2" />
            <div className="text-2xl font-bold text-white">
              {(weatherData.visibility / 1000).toFixed(1)} km
            </div>
            <div className="text-blue-100 text-sm">Visibility</div>
          </div>

          <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 text-center">
            <Thermometer className="w-8 h-8 text-blue-200 mx-auto mb-2" />
            <div className="text-2xl font-bold text-white">
              {Math.round(weatherData.main.feels_like)}°C
            </div>
            <div className="text-blue-100 text-sm">Feels Like</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherDislay;
