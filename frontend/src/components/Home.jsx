import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md w-80 text-center">
        <h1 className="text-3xl mb-4">Welcome</h1>
        <div className="space-y-4">
          <Link
            to="/register"
            className="block w-full bg-blue-500 text-white p-2 rounded"
          >
            Register
          </Link>
          <Link
            to="/login"
            className="block w-full bg-green-500 text-white p-2 rounded"
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
