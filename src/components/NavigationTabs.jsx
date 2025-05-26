import { Heart, Search } from 'lucide-react'
import React from 'react'

const NavigationTabs = ({setActiveTab ,activeTab }) => {
  return (
    <div>
       <div className="flex justify-center mb-6">
          <div className="bg-white/20 backdrop-blur-md rounded-lg p-1 flex space-x-1">
            <button
              onClick={() => setActiveTab("search")}
              className={`px-6 py-2 rounded-md font-medium transition-all duration-200 ${
                activeTab === "search"
                  ? "bg-white text-blue-600 shadow-lg"
                  : "text-white hover:bg-white/10"
              }`}
            >
              <Search className="inline w-4 h-4 mr-2" />
              Search Weather
            </button>
            <button
              onClick={() => setActiveTab("favorites")}
              className={`px-6 py-2 rounded-md font-medium transition-all duration-200 relative ${
                activeTab === "favorites"
                  ? "bg-white text-blue-600 shadow-lg"
                  : "text-white hover:bg-white/10"
              }`}
            >
              <Heart className="inline w-4 h-4 mr-2" />
              Favorites
             
            </button>
          </div>
        </div>
    </div>
  )
}

export default NavigationTabs
