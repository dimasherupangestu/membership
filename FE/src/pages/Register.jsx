import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../utils/axios';
import TextInput from '../components/TextInput';
import SelectInput from '../components/SelectInput';
import AlertInfo from '../components/AlertInfo';

const Register = () => {
    const [register, setRegister] = useState({
        name: "",
        email: "",
        password: "",
        membership: "",
    });
    const [notification, setNotification] = useState({ visible: false, message: "", type: "" });
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setRegister({
            ...register,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axiosInstance.post("/register", register);
            console.log(response.data);
            setNotification({ visible: true, message: "Registration successful", type: "success" });
            setTimeout(() => {
                navigate("/login");
            }, 1000);
        } catch (error) {
            console.log(error);
            setNotification({ visible: true, message: "Registration failed", type: "error" });
        }
    };

    const membershipOptions = [
        { label: "Reguler", value: "Reguler" },
        { label: "Premium", value: "Premium" },
        { label: "Super Premium", value: "Super Premium" },
    ];

    return (
        <div className={"w-xl h-screen flex justify-center items-center bg-slate-900 "}>
            {notification.visible && (
                <AlertInfo
                    message={notification.message}
                    type={notification.type}
                    onClose={() => setNotification({ ...notification, visible: false })}
                />
            )}
            <form className={"max-w-xl w-[24rem] px-7 py-5 mx-auto shadow-md rounded-lg bg-gray-300"} onSubmit={handleSubmit}>
                <h1 className={"font-bold text-3xl text-center text-slate-900 mb-4"}>Register</h1>
                <TextInput 
                    label="Name" 
                    name="name" 
                    type="text" 
                    value={register.name} 
                    onChange={handleChange} 
                    placeholder="Enter your name"
                />
                <TextInput 
                    label="Email" 
                    name="email" 
                    type="email" 
                    value={register.email} 
                    onChange={handleChange} 
                    placeholder="Enter your email"
                />
                <TextInput 
                    label="Password" 
                    name="password" 
                    type="password" 
                    value={register.password} 
                    onChange={handleChange} 
                    placeholder="Enter your password"
                />
                <SelectInput 
                    label="Membership" 
                    name="membership" 
                    value={register.membership} 
                    onChange={handleChange} 
                    options={membershipOptions}
                />
                <button type="submit" className={"bg-blue-600 w-full mt-3 text-white py-2 rounded-lg"}>
                    Register
                </button>
                <p className={"text-center mt-4"}>Already have an account? <a href="/login" className={"text-blue-600"}>Login</a></p>
            </form>
        </div>
    );
};

export default Register;
