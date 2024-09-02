import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { checkAuthenticated, loadUser, logout } from "../store/auth";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false); // State to manage the toggle
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);

  React.useEffect(() => {
    dispatch(checkAuthenticated());
    isAuthenticated && dispatch(loadUser());
  }, [dispatch, isAuthenticated]);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/" className="text-white text-lg font-semibold">
          Chatbot System
        </Link>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-white block lg:hidden focus:outline-none"
        >
          <svg
            className={`w-6 h-6 ${isOpen ? 'hidden' : 'block'}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
          </svg>
          <svg
            className={`w-6 h-6 ${isOpen ? 'block' : 'hidden'}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
        <div className={`lg:flex lg:items-center lg:space-x-4 ${isOpen ? 'block' : 'hidden'}`}>
          <Link to="/" className="text-white hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium">
            Home
          </Link>
          {isAuthenticated ? (
            <button
              onClick={handleLogout}
              className="text-white hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium"
            >
              Logout
            </button>
          ) : (
            <>
              <Link to="/login" className="text-white hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium">
                Login
              </Link>
              <Link to="/signup" className="text-white hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium">
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
