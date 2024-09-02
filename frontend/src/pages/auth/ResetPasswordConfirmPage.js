import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { reset_password_confirm } from "../../store/auth";

const ResetPasswordConfirmPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { uid, token } = useParams();

  const [requestSent, setRequestSent] = useState(false);
  const [formData, setFormData] = useState({
    new_password: "",
    re_new_password: "",
  });
  const { new_password, re_new_password } = formData;

  const handleOnChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(reset_password_confirm(uid, token, new_password, re_new_password));
    setRequestSent(true);
  };

  useEffect(() => {
    requestSent && navigate("/");
  }, [requestSent, navigate]);

  return (
    <div className="container mx-auto mt-10 p-5 max-w-md shadow-lg rounded-lg">
      <form onSubmit={handleSubmit} className="space-y-6">
          <div className="form-group">
              <label htmlFor="new_password" className="block text-sm font-medium text-gray-700">
                  New Password
              </label>
              <input
                  type="password"
                  name="new_password"
                  value={new_password}
                  onChange={handleOnChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  id="new_password"
                  placeholder="New Password"
                  required
              />
          </div>

          <div className="form-group">
              <label htmlFor="re_new_password" className="block text-sm font-medium text-gray-700">
                  Confirm New Password
              </label>
              <input
                  type="password"
                  name="re_new_password"
                  value={re_new_password}
                  onChange={handleOnChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  id="re_new_password"
                  placeholder="Confirm New Password"
                  required
              />
          </div>

          <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              Reset Password
          </button>
      </form>
  </div>
  );
};

export default ResetPasswordConfirmPage;
