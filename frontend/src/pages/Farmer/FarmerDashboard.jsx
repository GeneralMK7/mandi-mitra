import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

import Header from "./components/Header";
import Hero from "./components/Hero";
import StatsCards from "./components/StatsCards";
import FarmerForm from "./components/FarmerForm";
import WeatherCard from "./components/WeatherCard";
import MarketCard from "./components/MarketCard";
import MaxPriceTrendChart from "./components/MaxPriceTrendChart";
import CropCard from "./components/CropCard";
import AdvisoryCard from "./components/AdvisoryCard";
import FloatingButtons from "./components/FloatingButtons";
import Footer from "./components/Footer";
import LoadingScreen from "./components/LoadingScreen";
import { getTranslator } from "./components/translations";
import { normalizeAdvisory } from "./components/advisoryAdapter";

const INITIAL_FORM = {
  state: "",
  district: "",
  crop: "",
  storage: "No",
  language: "English",
  harvestDate: "",
  quantity: "",
};

function FarmerDashboard() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [advisory, setAdvisory] = useState(null);
  const [priceHistory, setPriceHistory] = useState(null);
  const [loading, setLoading] = useState(false);

  const t = getTranslator(formData.language);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "state") {
      setFormData((prev) => ({ ...prev, state: value, district: "" }));
      return;
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLanguageChange = (language) => {
    setFormData((prev) => ({ ...prev, language }));
  };

  const handleSubmit = async () => {
    if (!formData.state || !formData.district || !formData.crop) {
      alert("Please select state, district and crop first.");
      return;
    }

    setLoading(true);
    try {
      const [advisoryRes, historyRes] = await Promise.all([
        api.post("/advisory", formData),
        api.get("/market/history", {
          params: {
            state: formData.state,
            district: formData.district,
            crop: formData.crop,
          },
        }),
      ]);
      setAdvisory(normalizeAdvisory(advisoryRes.data, formData));
      setPriceHistory(historyRes.data || []);
    } catch (error) {
      console.error(error);
      alert("Failed to fetch advisory. Please try again.");
    } finally {
      // Let the staged loading screen play out fully so the animation
      // doesn't feel jarring even when the API responds instantly.
      setTimeout(() => setLoading(false), 1800);
    }
  };

  const handleLogout = () => {
    navigate("/login");
  };

  const handleAskAgain = () => {
    setAdvisory(null);
    setPriceHistory(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleNearbyMarkets = () => {
    const query = formData.district
      ? `mandi market near ${formData.district}`
      : "mandi market near me";
    window.open(
      `https://www.google.com/maps/search/${encodeURIComponent(query)}`,
      "_blank"
    );
  };

  const handleHelpline = () => {
    window.location.href = "tel:18001801551";
  };

  const isEmpty = !advisory;

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 via-white to-green-50">
      {loading && <LoadingScreen />}

      <Header
        language={formData.language}
        onLanguageChange={handleLanguageChange}
        t={t}
        onLogout={handleLogout}
      />

      <main className="max-w-7xl mx-auto px-4 md:px-8 py-6 md:py-8 flex flex-col gap-6 md:gap-8">
        <Hero
          t={t}
          aiReady={!loading}
          weatherSummary={
            advisory ? advisory.weather.temperature : "Awaiting details"
          }
        />

        <StatsCards t={t} advisory={advisory} />

        <div className="grid lg:grid-cols-5 gap-6 md:gap-8">
          <div className="lg:col-span-2">
            <div className="lg:sticky lg:top-24">
              <FarmerForm
                t={t}
                formData={formData}
                onChange={handleChange}
                onSubmit={handleSubmit}
                loading={loading}
              />
            </div>
          </div>

          <div className="lg:col-span-3 flex flex-col gap-6">
            <div className="grid sm:grid-cols-2 gap-6">
              <WeatherCard
                t={t}
                data={advisory?.weather}
                empty={isEmpty}
              />
              <MarketCard t={t} data={advisory?.market} empty={isEmpty} />
            </div>

            <MaxPriceTrendChart
              t={t}
              history={priceHistory || []}
              empty={isEmpty}
              location={`${formData.district}, ${formData.state}`}
            />

            <CropCard t={t} data={advisory?.crop} empty={isEmpty} />

            <AdvisoryCard
              t={t}
              advisory={advisory}
              formData={formData}
              empty={isEmpty}
              onAskAgain={handleAskAgain}
            />
          </div>
        </div>
      </main>

      <Footer t={t} />

      <FloatingButtons
        t={t}
        onNearbyMarkets={handleNearbyMarkets}
        onHelpline={handleHelpline}
        onAskAgain={handleAskAgain}
      />
    </div>
  );
}

export default FarmerDashboard;