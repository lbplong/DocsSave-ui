/**
 * /* eslint-disable react-hooks/exhaustive-deps
 *
 * @format
 */

/** @format */

import React, { useEffect, useState } from "react";
import LoadingPage from "../components/multipleComponents/LoadingPage";
import { useNavigate } from "react-router-dom";
import CheckInApi from "../API/ModuleAPI/CheckInApi";

export default function CheckIn(props) {
  const { children } = props;

  const [checkIn, setCheckIn] = useState(true);
  const navigate = useNavigate();

  const _onRedirectToLogin = () => {
    if (localStorage.getItem("token")) {
      localStorage.removeItem("username");
      localStorage.removeItem("fullName");
      localStorage.removeItem("email");
      localStorage.removeItem("token");
      localStorage.removeItem("accountId");
    }

    navigate("login");
  };

  const _checkIn = async () => {
    const checkInResponse = await CheckInApi.checkIn();

    if (checkInResponse.isAxiosError) {
      window.alert(checkInResponse.message, {
        title: `Error!`,
        actionText: "Go to Login",
        onClose: () => _onRedirectToLogin(),
      });
    } else {
      localStorage.setItem("username", checkInResponse.data.username);
      localStorage.setItem("fullName", checkInResponse.data.fullName);
      localStorage.setItem("email", checkInResponse.data.email);
      localStorage.setItem("accountId", checkInResponse.data.accountId);
      setCheckIn(false);
    }
  };

  useEffect(() => {
    _checkIn();
  });

  return checkIn ? <LoadingPage /> : { ...children };
}
