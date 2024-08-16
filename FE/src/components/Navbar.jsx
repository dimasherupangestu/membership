import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AlertInfo from "../components/AlertInfo";

const Navbar = () => {
    const token = localStorage.getItem("token");
    const navigate = useNavigate();
    const [notification, setNotification] = useState({ visible: false, message: "", type: "" });

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        localStorage.removeItem("user");

        setNotification({ visible: true, message: "Logout successful", type: "success" });

        // Delay navigation to allow the alert to be visible
        setTimeout(() => {
            navigate("/login");
        }, 1000);
    };

    return (
        <div>
            <nav className="bg-[#222] text-white border-gray-200 dark:bg-gray-900">
                <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                    <Link
                        to="/"
                        className="flex items-center space-x-3 rtl:space-x-reverse">
                        <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                            Member
                            <span className="text-blue-500">Dev</span>
                        </span>
                    </Link>
                    <button
                        data-collapse-toggle="navbar-default"
                        type="button"
                        className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                        aria-controls="navbar-default"
                        aria-expanded="false">
                        <span className="sr-only">Open main menu</span>
                        <svg
                            className="w-5 h-5"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 17 14">
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M1 1h15M1 7h15M1 13h15"
                            />
                        </svg>
                    </button>
                    <div className="hidden w-full md:block md:w-auto" id="navbar-default">
                        <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 bg-[#222] dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                            <li>
                                <Link
                                    to="/"
                                    className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500"
                                    aria-current="page">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/list"
                                    className="block py-2 px-3 text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
                                    Your List
                                </Link>
                            </li>
                            {token ? (
                                <li>
                                    <button
                                        onClick={logout}
                                        className="block py-2 px-3 text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
                                        Logout
                                    </button>
                                </li>
                            ) : (
                                <div className="flex items-center space-x-3 rtl:space-x-reverse">
                                    <li>
                                        <Link
                                            to="/login"
                                            className="block py-2 px-3 text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
                                            Login
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            to="/register"
                                            className="block py-2 px-3 text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
                                            Register
                                        </Link>
                                    </li>
                                </div>
                            )}
                        </ul>
                    </div>
                </div>
            </nav>

            {notification.visible && (
                <AlertInfo
                    message={notification.message}
                    type={notification.type}
                    onClose={() => setNotification({ ...notification, visible: false })}
                />
            )}
        </div>
    );
};

export default Navbar;
