import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        const config = {
          headers: {
            "x-auth-token": token,
          },
        };
        try {
          const res = await axios.get("http://localhost:3000/api/me", config);
          setUser(res.data);
        } catch (err) {
          console.error(err.response.data);
        }
      }
    };
    fetchUser();
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <h2 className="text-xl text-gray-700">Loading...</h2>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md w-80 text-center">
        <h1 className="text-3xl mb-4">Welcome, {user.username}</h1>
        <p className="text-gray-700">Email: {user.email}</p>
        <button
          onClick={logout}
          className="mt-4 bg-red-500 text-white py-2 px-4 rounded"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
