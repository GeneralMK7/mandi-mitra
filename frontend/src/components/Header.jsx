import { FaLeaf, FaSignOutAlt, FaGlobe } from "react-icons/fa";

export default function Header({ handleLogout }) {
  return (
    <header className="sticky top-0 z-50 bg-gradient-to-r from-green-700 via-green-600 to-green-500 shadow-lg">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">

        <div className="flex items-center gap-3">
          <div className="bg-white p-2 rounded-full shadow">
            <FaLeaf className="text-green-700 text-2xl" />
          </div>

          <div>
            <h1 className="text-3xl font-bold text-white">
              MandiMitra
            </h1>
            <p className="text-green-100 text-sm">
              AI Smart Farming Assistant
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">

          <button className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-xl text-white hover:bg-white/30 transition">
            <FaGlobe />
            English
          </button>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-white text-green-700 px-5 py-2 rounded-xl font-semibold hover:bg-green-100 transition"
          >
            <FaSignOutAlt />
            Logout
          </button>

        </div>
      </div>
    </header>
  );
}