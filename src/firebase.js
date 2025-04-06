// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBFl9s82b-EJ-linNjleFqFvyGM9Op2tVY",
  authDomain: "pinto-project-e1577.firebaseapp.com",
  projectId: "pinto-project-e1577",
  storageBucket: "pinto-project-e1577.firebasestorage.app",
  messagingSenderId: "606333588288",
  appId: "1:606333588288:web:e90a32733ce35417fee0a5",
  measurementId: "G-2L33Q0VRXH",
};

const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app); // Authentication
export const db = getFirestore(app); // Firestore Database
export const messaging = getMessaging(app);
// ... existing code ...
// Function to generate/get device ID
const generateDeviceId = () => {
  // Check if device ID exists in localStorage
  let deviceId = localStorage.getItem("pinto_device_id");

  if (!deviceId) {
    // Generate a new device ID if none exists

    const randomString = Math.random().toString(36).substring(2, 15);
    const userAgent = navigator.userAgent;
    deviceId = `web_${timestamp}_${randomString}_${userAgent.replace(
      /[^a-zA-Z0-9]/g,
      ""
    )}`;

    // Store the device ID in localStorage
    localStorage.setItem("pinto_device_id", deviceId);
  }

  return deviceId;
};

// Function to register device with backend
const registerDeviceWithBackend = async (fcmToken) => {
  try {
    const deviceId = generateDeviceId();
    const response = await fetch(
      "https://service.pintogroups.in/users/register-device",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${
            localStorage.getItem("app_token") ||
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzQ2MjE0OTY1LCJpYXQiOjE3NDM2MjI5NjUsImp0aSI6IjMyOTVmNWIzN2ZjNjQ0OGNiMjA5NTdmYzZjMDY4MzAwIiwidXNlcl9pZCI6IjZkNTEyOTlkLWUxZjAtNGMyYS1hM2ZjLTVhYTVhNGZjZjgxOCJ9.blm2ojw0jHHsy5XR_u2XsHL_sxAxa2vtwA5nMjzr8C8"
          }`,
        },
        body: JSON.stringify({
          device_token: fcmToken,
          device_id: deviceId,
        }),
      }
    );

    const result = await response.text();

    // Check if the response contains the duplicate device token error
    if (result.includes("device token with this device token already exists")) {
      // Silently return without showing error
      return null;
    }

    console.log("Device registered successfully:", result);
    return result;
  } catch (error) {
    // Silently handle any errors
    console.debug("Device registration attempt:", error);
    return null;
  }
};

// Function to request notification permission and get FCM token
export const requestNotificationPermission = async () => {
  try {
    console.log("Requesting notification permission...");
    const permission = await Notification.requestPermission();
    console.log("Permission status:", permission);

    if (permission === "granted") {
      console.log("Permission granted, getting FCM token...");
      // Get FCM token
      const token = await getToken(messaging, {
        vapidKey:
          "BE887jGVDwTFXkbhxwm_ycssc_lzkuJaEoxK69cDm3EFg0vw05BnNWgbrFo0Ot_22bL0QEb6uNK3LvAu3qXcydw",
      }).catch((error) => {
        console.error("Error getting FCM token:", error);
        return null;
      });

      console.log("Token generation attempt completed");
      if (token) {
        console.log("FCM Token generated successfully:", token);
        // Register device with backend
        await registerDeviceWithBackend(token);
        return token;
      } else {
        console.log(
          "No registration token available - token generation failed"
        );
        return null;
      }
    } else {
      console.log("Notification permission was denied by user");
      return null;
    }
  } catch (error) {
    console.error("Error in requestNotificationPermission:", error);
    return null;
  }
};

// ... existing code ...
// Function to handle foreground messages
export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      resolve(payload);
    });
  });

export default app;
