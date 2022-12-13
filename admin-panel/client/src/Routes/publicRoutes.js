import HomePage from "../pages/LandingPage";
import LoginPage from "../pages/LoginPage";
const { Routes, Route } = require("react-router-dom");

const PublicRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  );
};

export default PublicRoutes;
