import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { MentorsPage } from "./pages/MentorsPage";
import { MentorProfilePage } from "./pages/MentorProfilePage";
import { CommunityPage } from "./pages/CommunityPage";
import { GrowthPage } from "./pages/GrowthPage";
import { ProfilePage } from "./pages/ProfilePage";
import "./index.css";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/mentors" element={<MentorsPage />} />
        <Route path="/mentor/:id" element={<MentorProfilePage />} />
        <Route path="/community" element={<CommunityPage />} />
        <Route path="/growth" element={<GrowthPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="*" element={<Navigate to="/home" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
