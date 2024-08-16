import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "./firebase";
import axiosInstance from "../utils/axios";

export const doSignInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    const idToken = await user.getIdToken(); // Dapatkan Firebase ID token

    // Kirim token ke backend untuk verifikasi
    const response = await axiosInstance.post("/auth/google-login", {
      token: idToken,
    });
    localStorage.setItem("token", response.data.token);
    localStorage.setItem("userId", response.data.user.id);
    console.log("Google Sign-in response:", response);

    return user;
  } catch (error) {
    console.error("Google Sign-in Error:", error.code, error.message, error);
    throw error;
  }
};
