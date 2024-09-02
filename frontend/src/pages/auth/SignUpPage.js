import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { signup } from "../../store/auth";

import httpService from "../../utils/httpService";

const SignUpPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [accountCreated, setAccountCreated] = useState(false);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    re_password: "",
  });
  const { first_name, last_name, email, password, re_password } = formData;

  const { isAuthenticated } = useSelector((state) => state.auth);

  const handleOnChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === re_password) {
      dispatch(signup(first_name, last_name, email, password, re_password));
      setAccountCreated(true);
    }
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
    accountCreated && navigate("/login");
  }, [isAuthenticated, accountCreated, navigate]);

  return (
    <div className="container mx-auto mt-10 p-5 max-w-md shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold pb-5 text-center">Sign Up</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
          <div className="form-group">
              <label htmlFor="first_name" className="block text-sm font-medium text-gray-700">First Name</label>
              <input
                  type="text"
                  name="first_name"
                  value={first_name}
                  onChange={handleOnChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  id="first_name"
                  required
                  placeholder="Enter First Name"
              />
          </div>

          <div className="form-group">
              <label htmlFor="last_name" className="block text-sm font-medium text-gray-700">Last Name</label>
              <input
                  type="text"
                  name="last_name"
                  value={last_name}
                  onChange={handleOnChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  id="last_name"
                  required
                  placeholder="Enter Last Name"
              />
          </div>

          <div className="form-group">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
              <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={handleOnChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  id="email"
                  required
                  aria-describedby="emailHelp"
                  placeholder="Enter email"
              />
          </div>

          <div className="form-group">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
              <input
                  type="password"
                  name="password"
                  value={password}
                  onChange={handleOnChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  id="password"
                  required
                  placeholder="Password"
              />
          </div>

          <div className="form-group">
              <label htmlFor="re_password" className="block text-sm font-medium text-gray-700">Confirm Password</label>
              <input
                  type="password"
                  name="re_password"
                  value={re_password}
                  onChange={handleOnChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  id="re_password"
                  required
                  placeholder="Confirm Password"
              />
          </div>

          <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-full shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
              Sign Up
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

      <p className="text-sm font-medium text-gray-600 mt-6">
          Already have an account? <Link to="/login" className="text-blue-500 hover:text-blue-600">Login</Link>
      </p>
  </div>
  );
};

export default SignUpPage;
