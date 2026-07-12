import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaLeaf,
  FaBell,
  FaSignOutAlt,
  FaChevronDown,
  FaUserCircle,
  FaGlobe,
} from "react-icons/fa";
import { LANGUAGES } from "./translations";

function Header({ language, onLanguageChange, t, onLogout }) {
  const [langOpen, setLangOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 bg-white/70 backdrop-blur-lg border-b border-white/40 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-3 flex items-center justify-between gap-3">
        {/* Logo */}
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="h-10 w-10 md:h-11 md:w-11 rounded-xl bg-gradient-to-br from-green-600 to-emerald-500 flex items-center justify-center shadow-md shrink-0">
            <FaLeaf className="text-white text-lg md:text-xl" />
          </div>
          <div className="min-w-0">
            <h1 className="text-lg md:text-xl font-extrabold text-gray-900 tracking-tight leading-tight truncate">
              MandiMitra
            </h1>
            <p className="text-[11px] md:text-xs text-green-700 font-medium truncate">
              {t("subtitle")}
            </p>
          </div>
        </div>

        {/* Right controls */}
        <div className="flex items-center gap-2 md:gap-3 shrink-0">
          {/* Language selector */}
          <div className="relative">
            <button
              onClick={() => setLangOpen((v) => !v)}
              className="flex items-center gap-1.5 bg-white/80 hover:bg-white border border-gray-200 rounded-full px-3 py-2 text-sm font-medium text-gray-700 transition-colors shadow-sm"
            >
              <FaGlobe className="text-green-600" />
              <span className="hidden sm:inline">{language}</span>
              <FaChevronDown className="text-[10px] text-gray-400" />
            </button>

            <AnimatePresence>
              {langOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 mt-2 w-40 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden"
                >
                  {LANGUAGES.map((lang) => (
                    <button
                      key={lang}
                      onClick={() => {
                        onLanguageChange(lang);
                        setLangOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2.5 text-sm hover:bg-green-50 transition-colors ${
                        lang === language
                          ? "text-green-700 font-semibold bg-green-50"
                          : "text-gray-700"
                      }`}
                    >
                      {lang}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Notification */}
          <button
            aria-label="Notifications"
            className="relative h-10 w-10 flex items-center justify-center rounded-full bg-white/80 hover:bg-white border border-gray-200 shadow-sm transition-colors"
          >
            <FaBell className="text-gray-600" />
            <span className="absolute top-2 right-2.5 h-2 w-2 rounded-full bg-red-500" />
          </button>

          {/* Profile */}
          <button className="hidden sm:flex items-center gap-2 h-10 pl-1.5 pr-3 rounded-full bg-white/80 hover:bg-white border border-gray-200 shadow-sm transition-colors">
            <FaUserCircle className="text-2xl text-green-700" />
            <span className="text-sm font-semibold text-gray-700">
              Farmer
            </span>
          </button>

          {/* Logout */}
          <button
            onClick={onLogout}
            className="flex items-center gap-2 bg-green-700 hover:bg-green-800 text-white px-3.5 md:px-4 py-2.5 rounded-full font-semibold text-sm transition-colors shadow-md"
          >
            <FaSignOutAlt />
            <span className="hidden md:inline">{t("logout")}</span>
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;