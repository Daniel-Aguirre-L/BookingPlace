import { Outlet } from "react-router-dom";
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";
import Notification from "../Components/Notification"; // Renamed from Toast to Notification
import { useEffect } from "react";
import useNotificationStore from "../store/useNotificationStore";
import Warning from "../Components/Warning"

const Layout = () => {
  const { notification, setNotification, resetNotification } = useNotificationStore();

  useEffect(() => {
    if (notification.visibility) {
      const timer = setTimeout(() => {
        resetNotification();
      }, 4000);

      return () => clearTimeout(timer);
    }
  }, [notification.visibility, resetNotification]);

  return (
    <div className="flex flex-col items-center w-screen">
      <header className="w-full sticky top-0 bg-opacity-70 bg-background-dark z-50 max-w-[1600px]">
        <Navbar />
      </header>
      <main className="flex w-full max-w-[1600px] min-h-[calc(100vh-315px)]">
        <Outlet />
      </main>
      <div className="max-w-[1600px] flex w-full">
        <Footer />
      </div>
      {notification.visibility && (
        <Notification type={notification.type}>{notification.text}</Notification>
      )}
    </div>
  );
};

export default Layout;