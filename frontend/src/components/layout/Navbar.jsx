import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="flex justify-between items-center px-8 py-4 shadow-md bg-white">
      <h1 className="text-2xl font-bold text-green-700">
        🌾 MandiMitra
      </h1>

      <div className="space-x-6">
        <Link to="/" className="hover:text-green-700">
          Home
        </Link>

        <Link to="/login" className="hover:text-green-700">
          Login
        </Link>

        <Link to="/register" className="hover:text-green-700">
          Register
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;