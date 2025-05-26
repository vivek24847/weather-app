import { Heart } from "lucide-react";
import React from "react";

const FavouriteTab = ({
  favorites,
  getWeatherIcon,
  removeFromFavorites,
}) => {
  return (
    <div>
      <div className="space-y-6">
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 shadow-xl">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
            <Heart className="w-6 h-6 mr-3 fill-current" />
            Favorite Cities ({favorites.length})
          </h2>

          {favorites.length === 0 ? (
            <div className="text-center py-12">
              <Heart className="w-16 h-16 text-blue-200 mx-auto mb-4 opacity-50" />
              <p className="text-blue-100 text-lg mb-2">
                No favorite cities yet
              </p>
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {favorites.map((favorite) => (
                <div
                  key={favorite.id}
                  className="bg-white/20 backdrop-blur-sm rounded-xl p-4 hover:bg-white/25 transition-all duration-200 group"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="text-xl font-semibold text-white">
                        {favorite.name}
                      </h3>
                      <p className="text-blue-100 text-sm capitalize">
                        {favorite.description}
                      </p>
                    </div>
                    <button
                      onClick={() => removeFromFavorites(favorite.id)}
                      className="text-red-300 hover:text-red-200 opacity-0 group-hover:opacity-100 transition-all duration-200 p-1"
                      title="Remove from favorites"
                    >
                      <Heart className="w-4 h-4 fill-current" />
                    </button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      {getWeatherIcon(favorite.main, 32)}
                      <span className="text-2xl font-bold text-white ml-3">
                        {Math.round(favorite.temp)}°C
                      </span>
                    </div>

                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FavouriteTab;
