import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import queryString from "query-string";

import { facebookAuthenticate } from "../../store/auth";

const Facebook = () => {
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
      else dispatch(facebookAuthenticate(state, code));
    }
  }, [dispatch, isAuthenticated, location.search]);

  return (
    <div className="container mx-auto my-10 p-5">
      <div className="p-5 text-center bg-gray-200 rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold text-gray-800">Welcome to Auth System!</h1>
          <p className="mx-auto max-w-prose text-lg text-gray-600">
              This is an incredible auth system with production level features!
          </p>

          {!isAuthenticated && (
              <>
                  <p className="text-gray-600">
                      Click Sign In to login to your account or Sign Up to create a new account.
                  </p>

                  <div className="flex justify-center gap-4 my-5">
                      <Link
                          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-full text-lg leading-6 font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                          to="/login"
                      >
                          Sign In
                      </Link>
                      <Link
                          className="px-4 py-2 bg-white border border-gray-300 text-gray-800 rounded-full text-lg leading-6 font-medium hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400"
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

export default Facebook;
