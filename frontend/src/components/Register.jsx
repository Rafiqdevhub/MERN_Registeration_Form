import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(true);
  const [userExists, setUserExists] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkUserExists = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        const config = {
          headers: {
            "x-auth-token": token,
          },
        };
        try {
          const res = await axios.get("http://localhost:5000/api/me", config);
          setUserExists(!!res.data);
        } catch (err) {
          console.error(err.response.data);
        }
      }
      setLoading(false);
    };
    checkUserExists();
  }, []);

  useEffect(() => {
    if (userExists) {
      alert("User already exists. Redirecting to login page.");
      navigate("/login");
    }
  }, [userExists, navigate]);

  const { username, email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    const newUser = {
      username,
      email,
      password,
    };
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const body = JSON.stringify(newUser);
      const res = await axios.post(
        "http://localhost:3000/api/register",
        body,
        config
      );
      console.log(res);
      alert("Registration successful. Please log in.");
      navigate("/login");
    } catch (err) {
      alert(err.response.data.error || "User already exists");
      console.error(err.response.data);
    }
  };

  const goToHome = () => {
    navigate("/");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <h2 className="text-xl text-gray-700">Loading...</h2>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={onSubmit} className="bg-white p-6 rounded shadow-md w-80">
        <h2 className="text-2xl mb-4 text-center">Register</h2>
        <input
          type="text"
          placeholder="Username"
          name="username"
          value={username}
          onChange={onChange}
          required
          className="block w-full p-2 mb-4 border border-gray-300 rounded"
        />
        <input
          type="email"
          placeholder="Email"
          name="email"
          value={email}
          onChange={onChange}
          required
          className="block w-full p-2 mb-4 border border-gray-300 rounded"
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          value={password}
          onChange={onChange}
          required
          className="block w-full p-2 mb-4 border border-gray-300 rounded"
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded"
        >
          Register
        </button>
        <button
          onClick={goToHome}
          className="w-full bg-gray-500 text-white p-2 mt-4 rounded"
        >
          Go to Home
        </button>
      </form>
    </div>
  );
};

export default Register;
