import { React, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import Loading from '../component/Loading';
import Cookies from 'js-cookie';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const BookingDetail = () => {
    const location = useLocation();
    const { id } = location.state;
    const [book, setBook] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loadingUploadFeedback, setLoadingUploadFeedback] = useState(false);
    const [loadingUploadPaymentProof, setLoadingUploadPaymentProof] = useState(false);
    const [paymentProof, setPaymentProof] = useState(null);
    const [feedback, setFeedback] = useState("")
    const [rating, setRating] = useState(0)
    const [hover, setHover] = useState(0)

    useEffect(() => {
        const token = Cookies.get('token');

        setLoading(true);
        axios.get(`https://gapakerem.vercel.app/bookings/profile/${id}`, {
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
    }, [id]);

    const handleUpload = (e) => {
        e.preventDefault();
        if (!paymentProof) return alert("Silakan pilih file terlebih dahulu.");

        setLoadingUploadPaymentProof(true);

        const formData = new FormData();
        formData.append('payment_proof', paymentProof);

        const token = Cookies.get('token');

        axios.patch(`https://gapakerem.vercel.app/bookings/${id}/upload-proof`, formData, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'multipart/form-data',
            },
        })
            .then((res) => {
                setLoadingUploadPaymentProof(false);
                toast.success(res.message, {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: true,
                });

                setTimeout(() => {
                    window.location.reload();
                }, 3000);
            })
            .catch((error) => {
                console.error("Error :", error);
                toast.error(error.response.data.message, {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: true,
                });

                setLoadingUploadPaymentProof(false)
            });
    };

    const handleFeedbackSubmit = (e) => {
        e.preventDefault();

        setLoadingUploadFeedback(true)

        const token = Cookies.get('token');

        axios.post('https://gapakerem.vercel.app/feedbacks', {
            id_trip_booking: id,
            message: feedback,
            rating: rating,
        }, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((res) => {
                toast.success(res.message, {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: true,
                });
                setFeedback("");
                setRating(0);
                setLoadingUploadFeedback(false)
            })
            .catch((error) => {
                console.error("Error :", error);
                toast.error(error.response.data.message, {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: true,
                });

                setLoadingUploadFeedback(false)
            });
    };

    const formatRupiah = (value) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(value);
    };

    const paymentStatus = (status) => {
        switch (status) {
            case 'unpaid':
                return { text: 'Belum Membayar', color: 'bg-red-200 text-red-600' };
            case 'paid':
                return { text: 'Sudah Membayar', color: 'bg-green-200 text-green-600' };
            case 'pending':
                return { text: 'Menunggu Konfirmasi', color: 'bg-yellow-200 text-yellow-600' };
            default:
                return { text: status, color: 'bg-gray-200 text-gray-600' };
        }
    };

    if (loading) return <Loading />;

    return (
        <div className='mx-60 my-10 p-10 border-2 rounded-lg border-gray-300'>
            <h1 className='text-3xl text-[#FFC100] text-center'>{book.mountain_name}</h1>

            <div className="grid grid-cols-3 items-center gap-4 max-w-xl mt-10">
                <label className="font-medium text-gray-500">Nama Peserta</label>
                <textarea
                    value={book.participant_name}
                    readOnly
                    rows={3}
                    className="col-span-2 mt-2 max-w-sm border border-gray-300 text-gray-900 text-sm rounded-xl focus:outline-none w-full p-3 resize-none"
                />

            </div>

            <div className="grid grid-cols-3 items-center gap-4 max-w-xl">
                <label className="font-medium text-gray-500">Total Pembayaran</label>
                <input
                    type="text"
                    value={formatRupiah(book.total_price)}
                    readOnly
                    className="col-span-2 mt-2 max-w-sm border border-gray-300 text-gray-900 text-sm rounded-full focus:outline-none w-full p-3"
                />
            </div>

            <div className="grid grid-cols-3 items-center gap-4 max-w-xl">
                <label className="font-medium text-gray-500">Tanggal Dibooking</label>
                <input
                    type="text"
                    value={new Date(book.created_at).toLocaleDateString('id-ID')}
                    readOnly
                    className="col-span-2 mt-2 max-w-sm border border-gray-300 text-gray-900 text-sm rounded-full focus:outline-none w-full p-3"
                />
            </div>

            <div className="grid grid-cols-3 items-center gap-4 max-w-xl mt-10">
                <label className="font-medium text-gray-500">Status</label>
                <span
                    className={`px-2 py-1 rounded-full text-sm ${paymentStatus(book.payment_status)?.color}`}
                >
                    {paymentStatus(book.payment_status)?.text}
                </span>
            </div>

            <div className="mt-10 flex justify-start gap-6">
                <a
                    href="https://wa.me/nomor-telepon?text=Halo,%20saya%20ingin%20reschedule%20trip%20saya."
                    className="bg-blue-500 text-white hover:bg-blue-600 px-4 py-2 rounded-lg gap-3 font-medium transition"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <i className="fab fa-whatsapp text-xl"></i>
                    <span>Reschedule Trip?</span>
                </a>

                <a
                    href="https://wa.me/nomor-telepon?text=Halo,%20saya%20ingin%20membatalkan%20trip%20saya."
                    className="bg-red-500 text-white hover:bg-red-600 px-4 py-2 rounded-lg gap-3 font-medium transition"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <i className="fab fa-whatsapp text-xl"></i>
                    <span>Cancel Trip?</span>
                </a>
            </div>

            <div className="grid grid-cols-3 items-center gap-4 max-w-xl mt-10">
                <label className="font-medium text-gray-500">No. Rekening</label>
                <p className="col-span-2">1136609602 (BSI) - MUH YASIN HABIBIE</p>
            </div>

            {book.payment_proof && (
                <div className="mt-10">
                    <p className="text-gray-500 mb-2">Bukti Pembayaran:</p>
                    <a href={book.payment_proof} target="_blank" rel="noopener noreferrer">
                        <img
                            src={book.payment_proof}
                            alt="Bukti Pembayaran"
                            className="w-64 rounded-lg hover:opacity-80 transition"
                        />
                    </a>
                </div>
            )}

            {book.payment_status === 'unpaid' && !book.payment_proof && (
                <div>
                    <form
                        onSubmit={(e) => handleUpload(e)}
                        className="mt-10 flex items-center gap-4"
                        encType="multipart/form-data"
                    >
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => setPaymentProof(e.target.files[0])}
                            className="border border-gray-300 p-2 rounded-lg"
                            disabled={loadingUploadPaymentProof}
                        />
                        <button
                            type="submit"
                            className="bg-[#FFC100] text-white px-4 py-2 rounded-lg hover:bg-yellow-400 transition"
                            disabled={loadingUploadPaymentProof}
                        >
                            Upload Bukti Pembayaran
                        </button>
                    </form>

                    {loadingUploadPaymentProof && (
                        <div className="flex justify-center items-center mt-10">
                            <div className="relative w-12 h-12">
                                <div className="absolute inset-0 border-4 border-[#FFC100] border-t-transparent rounded-full animate-spin"></div>
                            </div>
                        </div>
                    )}
                </div>
            )}

            <div className='mt-20 h-2 w-full bg-[#FFC100] rounded-lg' />

            <div>
                <form className="flex flex-col justify-center gap-4 mt-4 mt-20 max-w-lg" onSubmit={handleFeedbackSubmit}>
                    <p>Jangan lupa bagikan pengalamanmu setelah trip!</p>

                    <textarea
                        value={feedback}
                        onChange={(e) => setFeedback(e.target.value)}
                        className="border border-gray-300 p-2 rounded mt-5 focus:outline-none focus:ring-2 focus:ring-[#FFC100] focus:border-transparent"
                        rows="4"
                        placeholder="Tulis feedback kamu disini..."
                        disabled={loadingUploadFeedback}
                    />

                    <div className="flex gap-2">
                        {[...Array(5)].map((_, index) => {
                            const starValue = index + 1;
                            return (
                                <FontAwesomeIcon
                                    key={index}
                                    icon={faStar}
                                    className={`text-2xl cursor-pointer transition ${starValue <= (hover || rating) ? 'text-yellow-400' : 'text-gray-300'
                                        }`}
                                    onClick={() => setRating(starValue)}
                                    onMouseEnter={() => setHover(starValue)}
                                    onMouseLeave={() => setHover(0)}
                                />
                            )
                        })}
                    </div>

                    <div className="mt-5">
                        <button
                            type="submit"
                            className="bg-[#FFC100] text-white px-4 py-2 rounded-lg hover:bg-yellow-400 transition"
                            disabled={loadingUploadFeedback}
                        >
                            Submit Feedback
                        </button>
                    </div>
                </form>
            </div>

            {loadingUploadFeedback && (
                <div className="flex justify-center items-center mt-10">
                    <div className="relative w-12 h-12">
                        <div className="absolute inset-0 border-4 border-[#FFC100] border-t-transparent rounded-full animate-spin"></div>
                    </div>
                </div>
            )}

            <ToastContainer
                className="absolute top-5 right-5"
            />
        </div>
    )
}

export default BookingDetail