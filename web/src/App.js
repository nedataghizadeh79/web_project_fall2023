import "./App.css";
import Login from "./pages/login/login";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import WelcomePage from "./pages/welcomePage/welcomePage";
import Register from "./pages/register/register";
import NotFound from "./pages/notFound/notFound";
import MainPage from "./pages/mainPage/mainPage";
import Profile from "./pages/profile/profile";
import AnnouncementList from "./pages/announcementList/announcementList";
import VolunteerList from "./pages/volunteerList/volunteerList";
import { useUser } from "./providers/UserProvider";
import { useCallback, useEffect, useState } from "react";
import Layout from "./layout/layout";
import Course from "./pages/course/course";

function App() {
  const { loggedIn } = useUser();

  const authenticate = useCallback(
    (element) => {
      return loggedIn ? element : <Navigate replace to={"/login"} />;
    },
    [loggedIn]
  );

  const [subscription, setSubscription] = useState(null);

  useEffect(() => {
    // Request permission from the user to send push notifications
    Notification.requestPermission().then(permission => {
      if (permission === 'granted') {
        // Subscribe the user to push notifications
        navigator.serviceWorker.register('/sw.js').then(registration => {
          registration.pushManager.subscribe({ userVisibleOnly: true }).then(subscription => {
            // Send the subscription object to the server
            fetch('/subscribe', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(subscription)
            });
            setSubscription(subscription);
          });
        });
      }
    });

    // navigator.serviceWorker.addEventListener('message', event => {
    //   if (event.data && event.data.type === 'push-notification') {
    //     setNotification(event.data.notification);
    //   }
    // });

  }, []);

  return (
    <Routes>
      <Route path="/" element={<WelcomePage />} />
      <Route path="/" element={authenticate(<Layout />)}>
        <Route path="main" element={<MainPage />} />
        <Route path="profile" element={<Profile />} />
        <Route path="profile/:user_id" element={<Profile />} />
        <Route path="course/:course_id" element={<Course />} />
        <Route
          path="/announcements"
          element={<AnnouncementList />}
        />
        <Route
          path="/announcement/:id"
          element={<VolunteerList />}
        />
      </Route>
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
