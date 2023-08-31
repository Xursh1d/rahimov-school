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
import { useUserStore } from "./store/UserDetailsStore";
import Statistics from "./pages/statistics/Statistics";
import BehaviorMarkCategories from "./pages/behavior-mark-categories/BehaviorMarkCategories";
import Holidays from "./pages/holidays/Holidays";

function App() {
  const navigate = useNavigate();
  const { onReload, updateParams } = useUserStore();

  const configureUser = useCallback(() => {
    const userData = localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user") ?? "")
      : null;

    const checkToken = userData?.access_token
      ? isJwtExpired(userData.access_token)
      : true;

    if (userData === null || checkToken) {
      localStorage.clear();
      navigate("/login", { replace: true });
    }
  }, []);

  const pageLoad = async () => {
    const user_details = JSON.parse(localStorage.getItem("user_details"));
    if (!user_details) {
      await onReload();
    } else {
      updateParams({
        academic_year_id: user_details?.current_academic_year,
        branch_id: user_details?.current_branch,
      });
    }
  };

  useEffect(() => {
    pageLoad();
    configureUser();
  }, []);

  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<Statistics />} />
          <Route path="/attendance" element={<Attendance />} />
          <Route path="/marking/academic" element={<AcademicMark />} />
          <Route path="/marking/behavioural" element={<BehavioralMark />} />
          <Route
            path="/settings/behavioural-categories"
            element={<BehaviorMarkCategories />}
          />
          <Route
            path="/settings/holidays"
            element={<Holidays />} />
        </Route>
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
