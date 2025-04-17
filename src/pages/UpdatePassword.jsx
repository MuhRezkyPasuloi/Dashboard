import { React, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UpdateProfile = () => {
    const navigate = useNavigate();

    const [input, setInput] = useState({
        old_password: "",
        new_password: "",

    });
    const [loading, setLoading] = useState(false);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setInput({ ...input, [name]: value });
    };

    const handleUpdate = (event) => {
        event.preventDefault();
        setLoading(true);

        const token = Cookies.get('token');

        let { old_password, new_password } = input;

        axios.patch(`https://gapakerem.vercel.app/profile`,
            { old_password, new_password },
            {
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            }
        )
            .then((res) => {
                toast.success(res.message, {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: true,
                });

                setTimeout(() => {
                    navigate('/profile');
                }, 3000);
            })
            .catch((error) => {
                console.error("Error :", error);
                toast.error(error.response.data.message, {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: true,
                });

                setLoading(false)
            });
    };

    return (
        <div className="flex items-center justify-center mt-10">
            <div className="w-full max-w-lg border border-gray-300 rounded-lg p-10 bg-white">
                <form className="w-full max-w-md" onSubmit={handleUpdate}>
                    <h1 className="text-3xl font-bold text-[#FFC100]">
                        Update Password
                    </h1>

                    <div className="flex flex-col items-center mt-10">
                        <label className="font-medium text-gray-500 self-start mb-2">Password Lama</label>
                        <input
                            type="password"
                            name="old_password"
                            id="old_password"
                            className="border border-gray-300 text-gray-900 text-sm rounded-full focus:outline-none w-full p-3"
                            onChange={handleChange}
                            disabled={loading}
                        />
                    </div>

                    <div className="flex flex-col items-center mt-4">
                        <label className="font-medium text-gray-500 self-start mb-2">Password Baru</label>
                        <input
                            type="password"
                            name="new_password"
                            id="new_password"
                            className="border border-gray-300 text-gray-900 text-sm rounded-full focus:outline-none w-full p-3"
                            onChange={handleChange}
                            disabled={loading}
                        />
                    </div>

                    <div className="flex justify-center mt-20">
                        <button
                            className="w-full bg-[#FFC100] hover:bg-yellow-400 text-white py-2 px-4 rounded-full"
                            disabled={loading}
                        >
                            Submit
                        </button>
                    </div>

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

        </div>
    )
}

export default UpdateProfile;
