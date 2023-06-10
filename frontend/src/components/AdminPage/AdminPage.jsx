import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Header from "../Header";
import AddFlights from "./AddFlights";
export default function AdminPage() {
  return (
    <>
      <AddFlights />
    </>
  );
}
