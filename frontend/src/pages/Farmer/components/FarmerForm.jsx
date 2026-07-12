import { motion } from "framer-motion";
import {
  FaSeedling,
  FaMapMarkerAlt,
  FaMapMarkedAlt,
} from "react-icons/fa";

const STATE_DISTRICT_MAP = {
  "Andhra Pradesh": [
    "Alluri Sitharama Raju",
    "Anakapalli",
    "Ananthapuramu",
    "Annamayya",
    "Bapatla",
    "Chittoor",
    "Dr. B.R. Ambedkar Konaseema",
    "East Godavari",
    "Eluru",
    "Guntur",
    "Kakinada",
    "Krishna",
    "Kurnool",
    "Nandyal",
    "NTR",
    "Palnadu",
    "Parvathipuram Manyam",
    "Prakasam",
    "SPSR Nellore",
    "Srikakulam",
    "Sri Sathya Sai",
    "Tirupati",
    "Visakhapatnam",
    "Vizianagaram",
    "West Godavari",
    "YSR Kadapa"
  ]
};

const DISTRICT_MARKET_MAP = {
  "Alluri Sitharama Raju": ["Paderu", "Chintapalle"],
  "Anakapalli": ["Anakapalli", "Narsipatnam"],
  "Ananthapuramu": ["Anantapur", "Gooty", "Tadipatri"],
  "Annamayya": ["Madanapalle", "Rayachoti"],
  "Bapatla": ["Bapatla", "Chirala"],
  "Chittoor": ["Chittoor", "Madanapalle"],
  "Dr. B.R. Ambedkar Konaseema": ["Amalapuram", "Mummidivaram"],
  "East Godavari": ["Rajahmundry", "Kadiyam"],
  "Eluru": ["Eluru", "Jangareddygudem"],
  "Guntur": ["Guntur", "Tenali", "Mangalagiri"],
  "Kakinada": ["Kakinada", "Peddapuram"],
  "Krishna": ["Vijayawada", "Gudivada", "Machilipatnam"],
  "Kurnool": ["Kurnool", "Adoni", "Yemmiganur"],
  "Nandyal": ["Nandyal", "Atmakur"],
  "NTR": ["Tiruvuru", "Jaggaiahpet"],
  "Palnadu": ["Narasaraopet", "Sattenapalli"],
  "Parvathipuram Manyam": ["Parvathipuram", "Salur"],
  "Prakasam": ["Ongole", "Markapur"],
  "SPSR Nellore": ["Nellore", "Kavali", "Atmakur"],
  "Srikakulam": ["Srikakulam", "Palasa"],
  "Sri Sathya Sai": ["Hindupur", "Penukonda"],
  "Tirupati": ["Tirupati", "Sullurpeta", "Naidupeta"],
  "Visakhapatnam": ["Visakhapatnam", "Gajuwaka"],
  "Vizianagaram": ["Vizianagaram", "Bobbili"],
  "West Godavari": ["Bhimavaram", "Tadepalligudem"],
  "YSR Kadapa": ["Kadapa", "Proddatur", "Pulivendula"]
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

export { STATE_DISTRICT_MAP, CROPS };

function FieldLabel({ icon, children }) {
  return (
    <label className="flex items-center gap-2 font-semibold text-gray-700 text-sm mb-1.5">
      <span className="text-green-600">{icon}</span>
      {children}
    </label>
  );
}

const selectClass =
  "w-full border-2 border-gray-200 rounded-xl px-4 py-3.5 text-base bg-white focus:outline-none focus:ring-4 focus:ring-green-100 focus:border-green-500 transition disabled:bg-gray-50 disabled:cursor-not-allowed";

function FarmerForm({ t, formData, onChange, onSubmit, loading }) {
  const availableDistricts = formData.state
    ? STATE_DISTRICT_MAP[formData.state] || []
    : [];

  const availableMarkets = formData.district
    ? DISTRICT_MARKET_MAP[formData.district] || []
    : [];

  return (
    <motion.div
      initial={{ opacity: 0, x: -16 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4 }}
      className="rounded-2xl bg-white/70 backdrop-blur-md border border-white/60 shadow-lg p-5 md:p-7"
    >
      <h3 className="text-xl md:text-2xl font-bold text-gray-800 flex items-center gap-2 mb-5">
        <FaSeedling className="text-green-700" />
        {t("farmerDetails")}
      </h3>

      <div className="flex flex-col gap-4">
        <div>
          <FieldLabel icon={<FaMapMarkerAlt />}>{t("state")}</FieldLabel>
          <select
            name="state"
            value={formData.state}
            onChange={onChange}
            className={selectClass}
          >
            <option value="">{t("selectState")}</option>
            <option value="Andhra Pradesh">
              Andhra Pradesh
            </option>
          </select>
        </div>

        <div>
          <FieldLabel icon={<FaMapMarkedAlt />}>{t("district")}</FieldLabel>
          <select
            name="district"
            value={formData.district}
            onChange={onChange}
            disabled={!formData.state}
            className={selectClass}
          >
            <option value="">
              {formData.state ? t("selectDistrict") : t("selectStateFirst")}
            </option>
            {availableDistricts.map((district) => (
              <option key={district} value={district}>
                {district}
              </option>
            ))}
          </select>
        </div>

        <div>
          <FieldLabel icon={<FaMapMarkerAlt />}>
            Market
          </FieldLabel>

          <select
            name="market"
            value={formData.market}
            onChange={onChange}
            disabled={!formData.district}
            className={selectClass}
          >
            <option value="">
              {formData.district
                ? t("selectMarket")
                : t("selectDistrictFirstForMarket")}
            </option>

            {availableMarkets.map((market) => (
              <option key={market} value={market}>
                {market}
              </option>
            ))}
          </select>
        </div>

        <div>
          <FieldLabel icon={<FaSeedling />}>{t("crop")}</FieldLabel>
          <select
            name="crop"
            value={formData.crop}
            onChange={onChange}
            className={selectClass}
          >
            <option value="">{t("selectCrop")}</option>
            {CROPS.map((crop) => (
              <option key={crop} value={crop}>
                {crop}
              </option>
            ))}
          </select>
        </div>




      </div>

      <button
        onClick={onSubmit}
        disabled={loading}
        className="mt-6 w-full bg-green-700 hover:bg-green-800 disabled:bg-green-400 disabled:cursor-not-allowed text-white px-8 py-4 rounded-xl font-bold text-lg transition-colors duration-200 shadow-md hover:shadow-lg active:scale-[0.98]"
      >
        {loading ? "…" : t("getAdvisory")}
      </button>
    </motion.div>
  );
}

export default FarmerForm;