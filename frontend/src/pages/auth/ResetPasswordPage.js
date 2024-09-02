import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { reset_password } from "../../store/auth";

const ResetPasswordPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [requestSent, setRequestSent] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
  });
  const { email } = formData;

  const handleOnChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(reset_password(email));
    setRequestSent(true);
  };

  useEffect(() => {
    requestSent && navigate("/");
  }, [requestSent, navigate]);

  return (
    <div className="container mx-auto mt-10 p-5 max-w-md shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold">Request Password Reset</h1>
      <form onSubmit={handleSubmit} className="mt-6">
          <div className="form-group mb-6">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email address
              </label>
              <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={handleOnChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  id="email"
                  aria-describedby="emailHelp"
                  placeholder="Enter email"
                  required
              />
          </div>

          <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              Request Password Reset
          </button>
      </form>
  </div>
  );
};

export default ResetPasswordPage;
