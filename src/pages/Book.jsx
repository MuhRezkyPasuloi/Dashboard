import { React, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Loading from '../component/Loading';
import Cookies from 'js-cookie';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Book = () => {
    const [book, setBook] = useState([]);
    const [loading, setLoading] = useState(true);

    const paymentStatus = (status) => {
        switch (status) {
            case 'unpaid':
                return { text: 'Belum Membayar', color: 'bg-red-200 text-red-600' };
            case 'paid':
                return { text: 'Sudah Membayar', color: 'bg-green-200 text-green-600' };
            case 'approved':
                return { text: 'Disetujui', color: 'bg-green-200 text-green-600' };
            case 'rejected':
                return { text: 'Ditolak', color: 'bg-red-200 text-red-600' };
            default:
                return { text: status, color: 'bg-gray-200 text-gray-600' };
        }
    };

    useEffect(() => {
        const token = Cookies.get('token');
        setLoading(true);

        axios.get(`https://gapakerem.vercel.app/bookings/profile`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((response) => {
                setBook(response.data.data);
                setLoading(false);
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
    }, []);

    if (loading) return <Loading />;

    return (
        <div className='px-60 py-10'>
            <div className='flex justify-between items-center mb-6'>
                <h1 className='text-3xl font-bold text-[#FFC100]'>Daftar Booking</h1>
            </div>

            <div className='grid grid-cols-2 gap-10 mt-10'>
                {book.length > 0 ? book.map((book, index) => {
                    const status = paymentStatus(book.payment_status);
                    return (
                        <div key={index} className='border-2 border-gray-300 p-5 rounded-lg flex items-center justify-between'>
                            <div>
                                <h1 className="text-2xl font-bold text-[#FFC100]">{book.mountain_name}</h1>
                                <h4 className='mt-4 text-lg font-semibold'>Rp {book.total_price.toLocaleString('id-ID')}</h4>
                                <h4 className='flex items-center gap-2 mt-2'>
                                    Status:
                                    <span className={`px-2 py-1 rounded-full text-sm ${status.color}`}>
                                        {status.text}
                                    </span>
                                </h4>
                                <h4 className='mt-4 text-sm text-gray-500'>
                                    Tanggal Dibooking: {new Date(book.created_at).toLocaleDateString('id-ID')}
                                </h4>
                            </div>

                            <Link to={`/bookings/${book.mountain_name}`} state={{ id: book.id }}>
                                <button className="bg-[#FFC100] w-10 h-10 flex items-center justify-center rounded-full text-white hover:bg-yellow-400 transition">
                                    <FontAwesomeIcon icon={faChevronRight} />
                                </button>
                            </Link>
                        </div>
                    )
                }) : <p className="text-gray-500">Belum ada trip yang di booking</p>}
            </div>

            <ToastContainer
                className="absolute top-5 right-5"
            />
        </div>
    )
}

export default Book;
