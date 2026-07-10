import { useNavigate } from "react-router-dom";
import Navbar from "../../components/layout/Navbar";
import Button from "../../components/common/Button";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-green-50">
      <Navbar />

      <div className="flex flex-col items-center justify-center text-center px-6 py-20">

        <h1 className="text-5xl font-bold text-green-800 mb-6">
          🌾 MandiMitra
        </h1>

        <p className="text-xl text-gray-700 max-w-2xl mb-10">
          Helping farmers make better crop selling decisions using
          weather forecasts, mandi prices, and crop knowledge.
        </p>

        <Button
          text="Get Started"
          onClick={() => navigate("/login")}
        />

        <div className="grid md:grid-cols-3 gap-8 mt-20 w-full max-w-6xl">

          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-2xl font-bold mb-3">🌦 Weather</h2>
            <p>Live weather forecast to help plan harvesting.</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-2xl font-bold mb-3">📈 Mandi Prices</h2>
            <p>Latest market prices from nearby mandis.</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-2xl font-bold mb-3">🌱 Crop Knowledge</h2>
            <p>Important crop information for better decisions.</p>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Home;