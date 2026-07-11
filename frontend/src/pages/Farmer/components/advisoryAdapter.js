// Normalizes the /advisory API response into the shape the dashboard UI needs.
//
// The current backend (routes/advisory.py) is still returning a hardcoded
// dummy payload with only a handful of fields. Several fields the redesigned
// UI wants (modal/high/low price, arrival date, wind speed, fertilizer &
// water advice, reasons, confidence score, risk level, price history) don't
// exist yet on the backend.
//
// This adapter reads whatever the backend *does* send, and derives sensible
// fallback values for anything missing so the UI never breaks. Once the real
// Gemma-powered advisory + full market/weather/crop APIs are wired in
// (see project TODOs: "Integrate SQLite Market API into Advisory API" and
// "Connect Google Gemma AI"), replace the `??` fallbacks below with the real
// field names as the backend starts returning them.

function parseNumber(value, fallback) {
  if (value === undefined || value === null) return fallback;
  const num = parseFloat(String(value).replace(/[^\d.]/g, ""));
  return Number.isFinite(num) ? num : fallback;
}

function buildPriceHistory(basePrice) {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Today"];
  let price = basePrice * 0.92;
  return days.map((date, i) => {
    // Gentle pseudo-random walk so the demo chart looks alive but stable
    // across re-renders for the same base price.
    const wiggle = Math.sin(i * 1.7 + basePrice) * (basePrice * 0.03);
    price = i === days.length - 1 ? basePrice : price + wiggle + basePrice * 0.015;
    return { date, modalPrice: Math.round(price) };
  });
}

export function normalizeAdvisory(raw, formData) {
  if (!raw) return null;

  const modalPrice = parseNumber(
    raw.market?.modal_price ?? raw.market?.current_price,
    2200
  );
  const highestPrice = parseNumber(raw.market?.max_price, modalPrice * 1.08);
  const lowestPrice = parseNumber(raw.market?.min_price, modalPrice * 0.9);

  const reasons =
    raw.reasons ??
    [
      `${formData.crop || "Crop"} prices are trending ${
        (raw.market?.trend || "Stable").toLowerCase()
      } in ${formData.district || "your district"}.`,
      `Weather conditions (${raw.weather?.rainfall ?? "low rainfall"}) favor selling soon rather than storing.`,
      formData.storage === "Yes"
        ? "You have storage available, giving flexibility to wait for a better price if needed."
        : "Limited storage availability makes an earlier sale lower-risk.",
    ];

  return {
    weather: {
      temperature: raw.weather?.temperature ?? "—",
      humidity: raw.weather?.humidity ?? "—",
      rainfall: raw.weather?.rainfall ?? "—",
      windSpeed: raw.weather?.wind_speed ?? "12 km/h",
    },
    market: {
      marketName: raw.market?.market_name ?? "Nearest Mandi",
      modalPrice: `₹${modalPrice}`,
      highestPrice: `₹${Math.round(highestPrice)}`,
      lowestPrice: `₹${Math.round(lowestPrice)}`,
      arrivalDate:
        raw.market?.arrival_date ?? new Date().toLocaleDateString(),
      trend: raw.market?.trend ?? "Stable",
    },
    priceHistory: raw.priceHistory ?? buildPriceHistory(modalPrice),
    crop: {
      harvestTip: raw.crop?.harvest_tip ?? "Harvest when grains reach full maturity.",
      storageTip: raw.crop?.storage_tip ?? "Store in a cool, dry, ventilated space.",
      bestSellingPeriod: raw.crop?.best_selling_period ?? "Within the next 2 weeks",
      fertilizerAdvice:
        raw.crop?.fertilizer_advice ?? "Apply balanced NPK as per soil test results.",
      waterRequirement:
        raw.crop?.water_requirement ?? "Moderate — irrigate every 5-7 days.",
    },
    recommendation: raw.recommendation ?? "Recommendation unavailable right now.",
    reasons,
    confidence: raw.confidence ?? 82,
    riskLevel: raw.risk_level ?? "Low",
    storageAvailable: formData.storage === "Yes",
  };
}