import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import Header from "../../components/Header";
import Hero from "../../components/Hero";
import StatsCards from "../../components/StatsCards";
import {
  FaLeaf,
  FaCloudSun,
  FaChartLine,
  FaRobot,
  FaSignOutAlt,
  FaTint,
  FaWater,
  FaStore,
  FaSeedling,
  FaBoxOpen,
  FaCalendarAlt,
} from "react-icons/fa";

const STATE_DISTRICT_MAP = {
  Telangana: [
    "Hyderabad",
    "Warangal",
    "Karimnagar",
    "Nizamabad",
    "Khammam",
    "Mahabubnagar",
    "Siddipet",
    "Nalgonda",
  ],
  "Tamil Nadu": [
    "Chennai",
    "Coimbatore",
    "Madurai",
    "Salem",
    "Erode",
    "Trichy",
    "Tirunelveli",
  ],
  Karnataka: ["Bengaluru", "Mysuru", "Hubli", "Mangalore", "Belagavi"],
  Kerala: ["Kochi", "Thrissur", "Kozhikode", "Kannur"],
  "Andhra Pradesh": [
    "Vijayawada",
    "Guntur",
    "Nellore",
    "Visakhapatnam",
    "Tirupati",
  ],
};

const CROPS = [
  "Rice",
  "Wheat",
  "Cotton",
  "Maize",
  "Tomato",
  "Onion",
  "Potato",
  "Chilli",
  "Turmeric",
  "Groundnut",
  "Banana",
];

const LANGUAGES = ["English", "Tamil", "Hindi", "Telugu"];

function FarmerDashboard() {
  const [formData, setFormData] = useState({
    state: "",
    district: "",
    crop: "",
    storage: "No",
    language: "English",
  });

  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const [advisory, setAdvisory] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "state") {
      setFormData((prev) => ({
        ...prev,
        state: value,
        district: "",
      }));
      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const response = await api.post("/advisory", formData);

      setAdvisory(response.data);

      console.log(response.data);
    } catch (error) {
      console.error(error);
      alert("Failed to fetch advisory");
    }
  };

  const availableDistricts = formData.state
    ? STATE_DISTRICT_MAP[formData.state]
    : [];

  return (
    <div className="min-h-screen bg-green-50">
      <Header handleLogout={handleLogout} />

      <div className="max-w-7xl mx-auto p-6 md:p-8">
        <Hero />
        <StatsCards />

        {/* Main Layout */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left: Farmer Details (40%) */}
          <div className="lg:w-2/5 w-full">
            <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 border-t-4 border-green-700 sticky top-24">
              <div className="mb-6">
                <div className="flex items-center gap-3">
                  <div className="bg-green-100 p-3 rounded-xl">
                    <FaSeedling className="text-green-700 text-2xl" />
                  </div>

                  <div>
                    <h3 className="text-2xl font-bold text-gray-800">
                      Farmer Information
                    </h3>

                    <p className="text-gray-500 text-sm">
                      Fill in your crop details to receive an AI-powered recommendation.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-5">
                {/* State */}
                <div>
                  <label className="font-medium text-gray-700 text-sm">
                    State
                  </label>
                  <select
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg p-3 mt-2 focus:outline-none focus:ring-2 focus:ring-green-600 transition"
                  >
                    <option value="">Select State</option>
                    {Object.keys(STATE_DISTRICT_MAP).map((state) => (
                      <option key={state} value={state}>
                        {state}
                      </option>
                    ))}
                  </select>
                </div>

                {/* District */}
                <div>
                  <label className="font-medium text-gray-700 text-sm">
                    District
                  </label>
                  <select
                    name="district"
                    value={formData.district}
                    onChange={handleChange}
                    disabled={!formData.state}
                    className="w-full border border-gray-300 rounded-lg p-3 mt-2 focus:outline-none focus:ring-2 focus:ring-green-600 transition disabled:bg-gray-100 disabled:cursor-not-allowed"
                  >
                    <option value="">
                      {formData.state ? "Select District" : "Select State First"}
                    </option>
                    {availableDistricts.map((district) => (
                      <option key={district} value={district}>
                        {district}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Crop */}
                <div>
                  <label className="font-medium text-gray-700 text-sm">
                    Crop
                  </label>
                  <select
                    name="crop"
                    value={formData.crop}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg p-3 mt-2 focus:outline-none focus:ring-2 focus:ring-green-600 transition"
                  >
                    <option value="">Select Crop</option>
                    {CROPS.map((crop) => (
                      <option key={crop} value={crop}>
                        {crop}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Storage */}
                <div>
                  <label className="font-medium text-gray-700 text-sm">
                    Storage Available
                  </label>
                  <select
                    name="storage"
                    value={formData.storage}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg p-3 mt-2 focus:outline-none focus:ring-2 focus:ring-green-600 transition"
                  >
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </div>

                {/* Language */}
                <div>
                  <label className="font-medium text-gray-700 text-sm">
                    Language
                  </label>
                  <select
                    name="language"
                    value={formData.language}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg p-3 mt-2 focus:outline-none focus:ring-2 focus:ring-green-600 transition"
                  >
                    {LANGUAGES.map((lang) => (
                      <option key={lang} value={lang}>
                        {lang}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <button
                onClick={handleSubmit}
                className="mt-8 w-full bg-green-700 hover:bg-green-800 text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-200 shadow-md hover:shadow-lg"
              >
                Get Advisory
              </button>
            </div>
          </div>

          {/* Right: Result Cards (60%) */}
          <div className="lg:w-3/5 w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Weather Card */}
              <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:-translate-y-2 hover:shadow-2xl transition-all duration-300">
                <div className="flex items-center gap-2 mb-4">
                  <FaCloudSun className="text-2xl text-green-700" />
                  <h3 className="text-lg font-bold text-gray-800">
                    Weather Forecast
                  </h3>
                </div>

                {advisory ? (
                  <div className="flex flex-col gap-3 text-gray-600 text-sm">
                    <div className="flex items-center gap-2">
                      <FaTint className="text-green-600" />
                      <span>Temperature: {advisory.weather.temperature}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <FaWater className="text-green-600" />
                      <span>Humidity: {advisory.weather.humidity}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <FaCloudSun className="text-green-600" />
                      <span>Rainfall: {advisory.weather.rainfall}</span>
                    </div>
                  </div>
                ) : (
                  <p className="text-gray-500">Click "Get Advisory"</p>
                )}
              </div>

              {/* Mandi Price Card */}
              <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:-translate-y-2 hover:shadow-2xl transition-all duration-300">
                <div className="flex items-center gap-2 mb-4">
                  <FaChartLine className="text-2xl text-green-700" />
                  <h3 className="text-lg font-bold text-gray-800">
                    Today's Mandi Price
                  </h3>
                </div>

                {advisory ? (
                  <div className="flex flex-col gap-3 text-gray-600 text-sm">
                    <div className="flex items-center gap-2">
                      <FaStore className="text-green-600" />
                      <span>{advisory.market.market_name}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <FaChartLine className="text-green-600" />
                      <span>{advisory.market.current_price}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <FaChartLine className="text-green-600" />
                      <span>{advisory.market.trend}</span>
                    </div>
                  </div>
                ) : (
                  <p className="text-gray-500">Click "Get Advisory"</p>
                )}
              </div>

              {/* Crop Knowledge Card */}
              <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:-translate-y-2 hover:shadow-2xl transition-all duration-300">
                <div className="flex items-center gap-2 mb-4">
                  <FaSeedling className="text-2xl text-green-700" />
                  <h3 className="text-lg font-bold text-gray-800">
                    Crop Knowledge
                  </h3>
                </div>

                {advisory ? (
                  <div className="flex flex-col gap-3 text-gray-600 text-sm">
                    <div className="flex items-center gap-2">
                      <FaCalendarAlt className="text-green-600" />
                      <span>{advisory.crop.harvest_tip}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <FaBoxOpen className="text-green-600" />
                      <span>{advisory.crop.storage_tip}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <FaChartLine className="text-green-600" />
                      <span>{advisory.crop.best_selling_period}</span>
                    </div>
                  </div>
                ) : (
                  <p className="text-gray-500">Click "Get Advisory"</p>
                )}
              </div>

              {/* AI Recommendation Card */}
              <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:-translate-y-2 hover:shadow-2xl transition-all duration-300">
                <div className="flex items-center gap-2 mb-4">
                  <FaRobot className="text-2xl text-green-700" />
                  <h3 className="text-lg font-bold text-gray-800">
                    Recommendation
                  </h3>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 rounded-lg p-4 text-sm">
                  {advisory
                    ? advisory.recommendation
                    : "Click 'Get Advisory' to view recommendation"}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FarmerDashboard;
