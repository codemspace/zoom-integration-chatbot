import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { verify } from "../../store/auth";

const ActivateAccountPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { uid, token } = useParams();

  const [verified, setVerified] = useState(false);

  const handleVerifyAccount = () => {
    dispatch(verify(uid, token));
    setVerified(true);
  };

  useEffect(() => {
    verified && navigate("/");
  }, [verified, navigate]);

  return (
    <div className="container mx-auto flex justify-center items-center h-screen">
      <div className="flex flex-col items-center justify-center">
          <h1 className="text-2xl font-bold">Activate your account</h1>
          <button
              onClick={handleVerifyAccount}
              type="button"
              className="mt-12 px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
              Verify
          </button>
      </div>
  </div>
  );
};

export default ActivateAccountPage;
