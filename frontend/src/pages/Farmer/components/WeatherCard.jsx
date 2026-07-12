import { motion } from "framer-motion";
import { FaCloudSun, FaTint, FaCloudRain, FaWind } from "react-icons/fa";

function Metric({ icon, label, value }) {
  return (
    <div className="flex flex-col items-center text-center gap-1.5 rounded-xl bg-white/60 py-3 px-2">
      <span className="text-xl text-sky-500">{icon}</span>
      <span className="text-lg font-bold text-gray-800">{value}</span>
      <span className="text-[11px] text-gray-500 font-medium">{label}</span>
    </div>
  );
}

function WeatherCard({ t, data, empty }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="rounded-2xl bg-gradient-to-br from-sky-50 to-white border border-sky-100 shadow-md p-5 md:p-6"
    >
      <div className="flex items-center gap-2 mb-4">
        <FaCloudSun className="text-2xl text-sky-500" />
        <h3 className="text-lg font-bold text-gray-800">
          {t("weatherForecast")}
        </h3>
      </div>

      {empty ? (
        <p className="text-gray-500 text-sm">{t("fillFormPrompt")}</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <Metric
            icon={<FaTint />}
            label={t("temperature")}
            value={data.temperature}
          />
          <Metric
            icon={<FaCloudRain />}
            label={t("humidity")}
            value={data.humidity}
          />
          <Metric
            icon={<FaCloudRain />}
            label={t("rainfall")}
            value={data.rainfall}
          />
          <Metric
            icon={<FaWind />}
            label={t("windSpeed")}
            value={data.windSpeed}
          />
        </div>
      )}
    </motion.div>
  );
}

export default WeatherCard;