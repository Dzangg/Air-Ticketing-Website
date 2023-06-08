import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Header from "../Header";
import UserTickets from "./UserTickets";

export default function UserAccount() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const location = useLocation();
  const [user, setUser] = useState();

  const authUser = async () => {
    try {
      const headers = new Headers();
      headers.append("Authorization", "Bearer " + token);
      const response = await fetch("http://localhost:3000/auth", {
        method: "GET",
        headers: headers,
      });

      if (!response.ok) {
        throw new Error("Error fetching data: " + response.status);
      }
      const jsonData = await response.json();
      setUser(jsonData.user);
      console.log(jsonData);
    } catch (error) {
      console.error("Error fetching data:", error);
      navigate("/login");
    }
  };

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
    {
      token && authUser();
    }
  }, []);

  return (
    <>
      {user && <Header user={user} />}
      {user && <UserTickets user={user} />}
    </>
  );
}
