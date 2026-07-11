import {
  FaCloudSun,
  FaRupeeSign,
  FaRobot,
  FaWarehouse,
} from "react-icons/fa";

export default function StatsCards() {
  const cards = [
    {
      title: "Weather",
      value: "32°C",
      icon: <FaCloudSun />,
      color: "bg-blue-100 text-blue-700",
    },
    {
      title: "Market Price",
      value: "₹3500",
      icon: <FaRupeeSign />,
      color: "bg-green-100 text-green-700",
    },
    {
      title: "AI Status",
      value: "Ready",
      icon: <FaRobot />,
      color: "bg-purple-100 text-purple-700",
    },
    {
      title: "Storage",
      value: "Available",
      icon: <FaWarehouse />,
      color: "bg-orange-100 text-orange-700",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">
      {cards.map((card) => (
        <div
          key={card.title}
          className="bg-white rounded-2xl shadow-lg p-6 hover:-translate-y-1 hover:shadow-2xl transition"
        >
          <div
            className={`w-14 h-14 rounded-full flex items-center justify-center text-2xl ${card.color}`}
          >
            {card.icon}
          </div>

          <h3 className="mt-5 text-gray-500">
            {card.title}
          </h3>

          <p className="text-3xl font-bold mt-2">
            {card.value}
          </p>
        </div>
      ))}
    </div>
  );
}