import { React, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
    const navigate = useNavigate();

    const [input, setInput] = useState({
        username: "",
        name: "",
        email: "",
        number: "",
        password: ""
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setInput({ ...input, [name]: value });
    };

    const handleRegister = (event) => {
        event.preventDefault();
        setLoading(true);

        let { username, name, email, number, password } = input;
        axios.post(`https://gapakerem.vercel.app/register`, { username, name, email, number, password })
            .then((res) => {
                toast.success(res.message, {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: true,
                });

                setTimeout(() => {
                    navigate('/login');
                }, 3000);
            })
            .catch((error) => {
                console.error("Error", error);
                toast.error(error.response.data.message, {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: true,
                });
                setLoading(false);
            });
    };

    return (
        <div className="flex items-center justify-center h-screen">
            <div className="w-full max-w-lg border border-gray-300 rounded-lg p-10 bg-white">
                <form className="w-full max-w-md" onSubmit={handleRegister}>
                    <h1 className="text-3xl font-bold text-[#FFC100] mb-8">
                        Daftar Akun
                    </h1>

                    <div className="mb-5 grid grid-cols-3 items-center gap-4">
                        <label htmlFor="username" className="font-medium text-gray-500">
                            Username
                        </label>
                        <input
                            type="text"
                            name="username"
                            id="username"
                            className="col-span-2 border border-gray-300 text-gray-900 text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-[#FFC100] focus:border-transparent w-full p-3"
                            onChange={handleChange}
                            value={input.username}
                            disabled={loading}
                        />
                    </div>

                    <div className="mb-5 grid grid-cols-3 items-center gap-4">
                        <label htmlFor="name" className="font-medium text-gray-500">
                            Nama
                        </label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            className="col-span-2 border border-gray-300 text-gray-900 text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-[#FFC100] focus:border-transparent w-full p-3"
                            onChange={handleChange}
                            value={input.name}
                            disabled={loading}
                        />
                    </div>

                    <div className="mb-5 grid grid-cols-3 items-center gap-4">
                        <label htmlFor="email" className="font-medium text-gray-500">
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            className="col-span-2 border border-gray-300 text-gray-900 text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-[#FFC100] focus:border-transparent w-full p-3"
                            onChange={handleChange}
                            value={input.email}
                            disabled={loading}
                        />
                    </div>

                    <div className="mb-5 grid grid-cols-3 items-center gap-4">
                        <label htmlFor="number" className="font-medium text-gray-500">
                            Nomor HP
                        </label>
                        <input
                            type="number"
                            name="number"
                            id="number"
                            className="col-span-2 border border-gray-300 text-gray-900 text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-[#FFC100] focus:border-transparent w-full p-3"
                            onChange={handleChange}
                            value={input.number}
                            disabled={loading}
                        />
                    </div>

                    <div className="mb-5 grid grid-cols-3 items-center gap-4">
                        <label htmlFor="password" className="font-medium text-gray-500">
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            className="col-span-2 border border-gray-300 text-gray-900 text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-[#FFC100] focus:border-transparent w-full p-3"
                            onChange={handleChange}
                            value={input.password}
                            disabled={loading}
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-[#FFC100] mt-10 text-white font-semibold py-3 rounded-full hover:opacity-90 transition"
                        disabled={loading}
                    >
                        Daftar
                    </button>

                    {loading && (
                        <div className="flex justify-center items-center mt-10">
                            <div className="relative w-12 h-12">
                                <div className="absolute inset-0 border-4 border-[#FFC100] border-t-transparent rounded-full animate-spin"></div>
                            </div>
                        </div>
                    )}
                </form>
            </div>

            <ToastContainer
                className="absolute top-5 right-5"
            />

            {error && (
                <div className="fixed top-4 left-1/2 transform -translate-x-1/2 border-2 bg-white border-gray-300 text-[#FFC100] font-bold px-4 py-2 rounded-full shadow-lg z-50">
                    {errorMessage}
                </div>
            )}
        </div>
    );
};

export default Register;
