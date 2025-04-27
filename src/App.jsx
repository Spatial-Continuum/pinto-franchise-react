import React, { useEffect } from "react";
import "./App.css";
import Routers from "./config/Routers.jsx";
import { requestNotificationPermission, onMessageListener } from "./firebase";
import ErrorBoundary from "./components/ErrorBoundary";
import { Provider } from "react-redux";
import { store } from "./redux/store";

const App = () => {
  useEffect(() => {
    Update();
    initializeFCM();
  }, []);

  const Update = async () => {};

  const initializeFCM = async () => {
    try {
      // Request permission and get FCM token
      const token = await requestNotificationPermission();

      if (token) {
        // Here you can send this token to your backend
        console.log("FCM Token received:", token);

        // Set up foreground message handler
        onMessageListener()
          .then((payload) => {
            console.log("Received foreground message:", payload);
            // Handle the message (e.g., show a notification)
            new Notification(payload.notification.title, {
              body: payload.notification.body,
              icon: payload.notification.icon,
            });
          })
          .catch((err) => console.log("Failed to receive message:", err));
      }
    } catch (error) {
      console.error("Error initializing FCM:", error);
    }
  };

  return (
    // <ErrorBoundary>
    <Provider store={store}>
      <React.Fragment>
        <Routers />
      </React.Fragment>
    </Provider>
    // </ErrorBoundary>
  );
};

export default App;
