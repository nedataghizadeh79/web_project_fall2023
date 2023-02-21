import "./App.css";
import Login from "./pages/login/login";
import { Route, Routes } from "react-router-dom";
import WelcomePage from "./pages/welcomePage/welcomePage";
import Register from "./pages/register/register";
import NotFound from "./pages/notFound/notFound";
import MainPage from "./pages/mainPage/mainPage";
import Profile from "./pages/profile/profile";
import Announcement from "./pages/announcement/announcement";
import AnnouncementList from "./pages/announcementList/announcementList";

function App() {
  return (
    <Routes>
      <Route path="/" element={<WelcomePage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/main" element={<MainPage />} />
      <Route path="/register" element={<Register />} />
      <Route path="profile" element={<Profile />} />
      <Route path="/announcements" element={<AnnouncementList />} />
      <Route path="/announcement/:id" element={<Announcement />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
