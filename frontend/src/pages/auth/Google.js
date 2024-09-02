import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import queryString from "query-string";

import { googleAuthenticate } from "../../store/auth";

const Google = () => {
  const dispatch = useDispatch();
  let location = useLocation();

  const { isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    const values = queryString.parse(location.search);
    const state = values.state ? values.state : null;
    const code = values.code ? values.code : null;

    if (state && code) {
      if (isAuthenticated)
        window.history.replaceState(null, null, window.location.pathname);
      else dispatch(googleAuthenticate(state, code));
    }
  }, [dispatch, isAuthenticated, location.search]);

  return (
    <div className="container mx-auto my-10 p-5">
      <div className="p-5 text-center bg-gray-200 rounded-lg shadow">
          <h1 className="text-2xl font-bold text-gray-800">Welcome to Auth System!</h1>
          <p className="mx-auto text-gray-600 max-w-2xl text-lg">
              This is an incredible auth system with production level features!
          </p>

          {!isAuthenticated && (
              <>
                  <p className="text-gray-500">
                      Click Sign In to login to your account or Sign Up to create a new account.
                  </p>

                  <div className="flex justify-center gap-4 mb-5">
                      <Link
                          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-full text-lg leading-6 font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                          to="/login"
                      >
                          Sign In
                      </Link>
                      <Link
                          className="px-4 py-2 bg-gray-100 text-gray-800 border border-gray-300 rounded-full text-lg leading-6 font-medium hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400"
                          to="/signup"
                      >
                          Sign Up
                      </Link>
                  </div>
              </>
          )}
      </div>
  </div>
  );
};

export default Google;
