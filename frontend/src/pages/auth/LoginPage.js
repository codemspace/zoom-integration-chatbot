import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { login } from "../../store/auth";

import httpService from "../../utils/httpService";

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = formData;

  const { isAuthenticated } = useSelector((state) => state.auth);

  const handleOnChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  const handleContinueWithGoogle = async () => {
    try {
      const response = await httpService.get(
        "/auth/o/google-oauth2/?redirect_uri=http://localhost:8000/google"
      );
      window.location.replace(response.data.authorization_url);
    } catch (error) {}
  };

  const handleContinueWithFacebook = async () => {
    try {
      const response = await httpService.get(
        "/auth/o/facebook/?redirect_uri=http://localhost:8000/facebook"
      );
      window.location.replace(response.data.authorization_url);
    } catch (error) {}
  };
  useEffect(() => {
    isAuthenticated && navigate("/");
  }, [isAuthenticated, navigate]);

  return (
    <div className="container mx-auto mt-10 p-5 max-w-md shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold text-center pb-5">Sign In</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
          <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email address</label>
              <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={handleOnChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  id="email"
                  placeholder="Enter email"
              />
          </div>
          <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
              <input
                  type="password"
                  name="password"
                  value={password}
                  onChange={handleOnChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  id="password"
                  placeholder="Password"
              />
          </div>

          <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-full shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
              Login
          </button>
      </form>

      <div className="space-y-3 mt-6">
          <button
              type="button"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-full shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              onClick={handleContinueWithGoogle}
          >
              Continue with Google
          </button>

          <button
              type="button"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-full shadow-sm text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400"
              onClick={handleContinueWithFacebook}
          >
              Continue with Facebook
          </button>
      </div>

      <div className="text-sm font-medium text-gray-600 mt-6">
          <p>
              Don't have an account? <Link to="/signup" className="text-blue-500 hover:text-blue-600">Sign Up</Link>
          </p>
          <p>
              Forgot your password? <Link to="/reset-password" className="text-blue-500 hover:text-blue-600">Reset Password</Link>
          </p>
      </div>
  </div>
  );
};

export default LoginPage;
