import { FaCloudSun, FaRobot } from "react-icons/fa";

export default function Hero() {
  return (
    <div className="bg-gradient-to-r from-green-600 to-green-500 rounded-3xl p-8 shadow-xl text-white mb-8">

      <div className="flex flex-col justify-center">

        <div>

          <h2 className="text-4xl font-bold mb-3">
            👋 Welcome Farmer
          </h2>

          <p className="text-green-100 text-lg mb-5 max-w-xl">
            Make smarter farming decisions using AI, weather updates,
            and live mandi prices.
          </p>

          <div className="flex gap-6 flex-wrap">

            <div className="flex items-center gap-2">
              <FaCloudSun />
              <span>Today's Weather Ready</span>
            </div>

            <div className="flex items-center gap-2">
              <FaRobot />
              <span>AI Advisory Available</span>
            </div>

          </div>

        </div>
        
        

      </div>

    </div>
  );
}