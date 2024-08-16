import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import TextInput from '../components/TextInput';
import AlertInfo from '../components/AlertInfo';
import { doSignInWithGoogle } from '../config/auth';
import axiosInstance from '../utils/axios';

const LoginPage = () => {
  const [login, setLogin] = useState({ email: "", password: "" });
  const [notification, setNotification] = useState({ visible: false, message: "", type: "" });
  const navigate = useNavigate();
  const [isSigningIn, setIsSigningIn] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLogin({ ...login, [name]: value });
  };

  const onGoogleSignIn = async (e) => {
    e.preventDefault();
    setIsSigningIn(true);

    try {
      const user = await doSignInWithGoogle();
      console.log("Google user:", user);
      setNotification({ visible: true, message: "Google Sign-in successful", type: "success" });

      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (err) {
      console.error("Google Sign-in failed:", err);
      setNotification({ visible: true, message: "Google Sign-in failed", type: "error" });
    } finally {
      setIsSigningIn(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await axiosInstance.post("/login", login);
        console.log('first', response.data);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("userId", response.data.userId);
        setNotification({ visible: true, message: "Login successful", type: "success" });
        setTimeout(() => {
            navigate("/");
          }, 1000);
    } catch (error) {
        console.log(error)
        setNotification({ visible: true, message: "Login failed", type: "error" });
    }
  };
  return (
    <div className="w-xl h-screen flex justify-center items-center bg-slate-900">
      {notification.visible && (
        <AlertInfo
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification({ ...notification, visible: false })}
        />
      )}
      <form className="max-w-xl w-[20rem] px-7 py-5 mx-auto shadow-md rounded-lg bg-gray-300" onSubmit={handleSubmit}>
        <h1 className="font-bold text-3xl text-center">Login</h1>
        <div className="mt-4">
          <TextInput
            label="Email"
            name="email"
            type="email"
            value={login.email}
            onChange={handleChange}
            placeholder="Enter your email"
          />
        </div>
        <div className="mt-4">
          <TextInput
            label="Password"
            name="password"
            type="password"
            value={login.password}
            onChange={handleChange}
            placeholder="Enter your password"
          />
        </div>
        <button type="submit" className="bg-blue-600 w-full mt-3 text-white py-2 rounded-lg" >Login</button>
        <p className="text-center mt-3">Dont have an account? <Link to="/register" className="text-blue-600">Register</Link></p>

        <button
          disabled={isSigningIn}
          onClick={onGoogleSignIn}
          className={`w-full flex items-center justify-center gap-x-3 py-2.5 border rounded-lg text-sm font-medium ${isSigningIn ? 'cursor-not-allowed' : 'hover:bg-gray-100 transition duration-300 active:bg-gray-100'}`}>
          <svg className="w-5 h-5" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip0_17_40)">
              <path d="M47.532 24.5528C47.532 22.9214 47.3997 21.2811 47.1175 19.6761H24.48V28.9181H37.4434C36.9055 31.8988 35.177 34.5356 32.6461 36.2111V42.2078H40.3801C44.9217 38.0278 47.532 31.8547 47.532 24.5528Z" fill="#4285F4" />
              <path d="M24.48 48.0016C30.9529 48.0016 36.4116 45.8764 40.3888 42.2078L32.6549 36.2111C30.5031 37.675 27.7252 38.5039 24.4888 38.5039C18.2275 38.5039 12.9187 34.2798 11.0139 28.6006H3.03296V34.7825C7.10718 42.8868 15.4056 48.0016 24.48 48.0016Z" fill="#34A853" />
              <path d="M11.0051 28.6006C9.99973 25.6199 9.99973 22.3922 11.0051 19.4115V13.2296H3.03298C-0.371021 20.0112 -0.371021 28.0009 3.03298 34.7825L11.0051 28.6006Z" fill="#FBBC04" />
              <path d="M24.48 9.49932C27.9016 9.44641 31.2086 10.7339 33.6866 13.0973L40.5387 6.24523C36.2 2.17101 30.4414 -0.068932 24.48 0.00161733C15.4055 0.00161733 7.10718 5.11644 3.03296 13.2296L11.005 19.4115C12.901 13.7235 18.2187 9.49932 24.48 9.49932Z" fill="#EA4335" />
            </g>
            <defs>
              <clipPath id="clip0_17_40">
                <rect width="48" height="48" fill="white" />
              </clipPath>
            </defs>
          </svg>
          {isSigningIn ? "Signing in..." : "Sign in with Google"}
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
