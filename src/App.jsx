import { Route, Routes } from "react-router-dom";
import AcademicMark from "./pages/academic-mark/AcademicMark";
import Attendance from "./pages/attendance/Attendance";
import Login from "./pages/auth/Login";
import BehavioralMark from "./pages/behavioral-marki/BehavioralMark";
import PrivateRoute from "./PrivateRoute";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { isJwtExpired } from "jwt-check-expiration";
import { useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function App() {
  const navigate = useNavigate();

  const configureUser = useCallback(() => {
    const userData = localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user") ?? "")
      : null;

    const checkToken = userData?.access_token
      ? isJwtExpired(userData.access_token)
      : true;

    if (userData === null || checkToken) {
      localStorage.removeItem("user");
      navigate("/login", { replace: true });
    }
  }, []);

  useEffect(() => {
    configureUser();
  }, []);

  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<Attendance />} />
          <Route path="/attendance" element={<Attendance />} />
          <Route path="/marking/academic" element={<AcademicMark />} />
          <Route path="/marking/behavioral" element={<BehavioralMark />} />
        </Route>
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
