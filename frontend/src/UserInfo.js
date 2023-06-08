import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function UserInfo() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
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
    } catch (error) {
      console.error("Error fetching data:", error);
      navigate("/login");
    }
  };

  useEffect(() => {
    authUser();
  }, []);
}
