import { React, useState, useEffect } from 'react';
import axios from 'axios';
import Loading from '../component/Loading';
import { Link } from 'react-router-dom';
import Background from '../assets/background/trip.png';
import Icon1 from '../assets/icon/mount.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faChevronLeft, faChevronRight, faSearch } from '@fortawesome/free-solid-svg-icons';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Trip = () => {
    const [openTrip, setOpenTrip] = useState([]);
    const [privateTrip, setPrivateTrip] = useState([]);
    const [loading, setLoading] = useState(true);
    const [openTripSearch, setOpenTripSearch] = useState('');
    const [privateTripSearch, setPrivateTripSearch] = useState('');

    const [openTripPagination, setOpenTripPagination] = useState({
        current_page: 1,
        last_page: 1,
        total_data: 0
    });

    const [privateTripPagination, setPrivateTripPagination] = useState({
        current_page: 1,
        last_page: 1,
        total_data: 0
    });

    const fetchData = (openPage = 1, privatePage = 1) => {
        window.scrollTo(0, 0);
        setLoading(true);
        axios.all([
            axios.get(`https://gapakerem.vercel.app/trips/open?page=${openPage}&search=${openTripSearch}`),
            axios.get(`https://gapakerem.vercel.app/trips/private?page=${privatePage}&search=${privateTripSearch}`)
        ])
            .then(axios.spread((openRes, privateRes) => {
                setOpenTrip(openRes.data.data.trips);
                setPrivateTrip(privateRes.data.data.trips);

                setOpenTripPagination(openRes.data.data.pagination);
                setPrivateTripPagination(privateRes.data.data.pagination);

                setLoading(false);
            }))
            .catch((error) => {
                console.error("Error :", error);
                toast.error(error.response?.data?.message || "Failed to fetch trip data", {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: true,
                });

                setLoading(false)
            });
    };

    const handleOpenTripSearch = (e) => {
        e.preventDefault();
        fetchData(1, privateTripPagination.current_page);
    };

    const handlePrivateTripSearch = (e) => {
        e.preventDefault();
        fetchData(openTripPagination.current_page, 1);
    };

    const handleOpenTripPageChange = (newPage) => {
        if (newPage < 1 || newPage > openTripPagination.last_page) return;
        fetchData(newPage, privateTripPagination.current_page);
    };

    const handlePrivateTripPageChange = (newPage) => {
        if (newPage < 1 || newPage > privateTripPagination.last_page) return;
        fetchData(openTripPagination.current_page, newPage);
    };

    useEffect(() => {
        fetchData();
    }, []);

    const Pagination = ({ pagination, onPageChange }) => {
        return (
            <div className="flex justify-center mt-8 gap-2">
                <button
                    onClick={() => onPageChange(pagination.current_page - 1)}
                    disabled={pagination.current_page === 1}
                    className={`px-3 py-1 rounded-md ${pagination.current_page === 1 ? 'bg-gray-200 text-gray-500' : 'bg-gray-300 hover:bg-gray-400 text-gray-700'}`}
                >
                    <FontAwesomeIcon icon={faChevronLeft} />
                </button>

                <div className="flex gap-1">
                    {Array.from({ length: pagination.last_page }, (_, i) => i + 1).map(page => (
                        <button
                            key={page}
                            onClick={() => onPageChange(page)}
                            className={`px-3 py-1 rounded-md ${pagination.current_page === page
                                ? 'bg-[#FFC100] text-white'
                                : 'bg-gray-200 hover:bg-gray-300 text-gray-700'}`}
                        >
                            {page}
                        </button>
                    ))}
                </div>

                <button
                    onClick={() => onPageChange(pagination.current_page + 1)}
                    disabled={pagination.current_page === pagination.last_page}
                    className={`px-3 py-1 rounded-md ${pagination.current_page === pagination.last_page
                        ? 'bg-gray-200 text-gray-500'
                        : 'bg-gray-300 hover:bg-gray-400 text-gray-700'}`}
                >
                    <FontAwesomeIcon icon={faChevronRight} />
                </button>
            </div>
        );
    };

    if (loading) return <Loading />;

    return (
        <div className='px-60'>
            <div
                className="bg-cover bg-center bg-no-repeat rounded-lg"
                style={{ backgroundImage: `url(${Background})` }}
            >
                <h1 className="text-center text-[#FFC100] text-5xl font-bold py-20 bg-black/40 rounded-lg">
                    Daftar Trip
                </h1>
            </div>

            <div className="mt-10">
                <h1 className='text-3xl mb-4 inline-block bg-orange-200 rounded-lg px-2'>
                    <span className='text-[#FFC100]'>Open</span> Trip
                </h1>
                <p>Pendakian bersama grup terbuka, dengan jadwal dan rute yang sudah ditentukan.</p>

                <div className="mt-4">
                    <form onSubmit={handleOpenTripSearch} className="flex gap-2 w-full max-w-md mb-6">
                        <input
                            type="text"
                            value={openTripSearch}
                            onChange={(e) => setOpenTripSearch(e.target.value)}
                            placeholder="Cari trip berdasarkan nama gunung..."
                            className="px-4 py-2 border border-gray-300 rounded-md flex-grow focus:outline-none focus:ring-2 focus:ring-[#FFC100]"
                        />
                        <button
                            type="submit"
                            className="bg-[#FFC100] text-white px-4 py-2 rounded-md hover:bg-[#e6ae00] transition duration-200"
                        >
                            <FontAwesomeIcon icon={faSearch} />
                        </button>
                    </form>
                </div>

                <div className='grid grid-cols-3 gap-10 mt-6'>
                    {openTrip.length > 0 ? openTrip.map((trip, index) => (
                        <Link
                            to={`/trip/${trip.mountain_name}`}
                            key={index}
                            state={{ id: trip.id }}
                            className="relative border-2 border-gray-300 rounded-lg hover:scale-105 duration-300"
                        >
                            <img
                                src={trip.mountain_photo}
                                alt={trip.mountain_name}
                                className="w-full h-50 object-cover rounded-md"
                            />
                            <div className="relative p-4">
                                <h2 className="text-xl font-semibold text-[#FFC100]">{trip.mountain_name}</h2>
                                <p className="font-bold mt-2">Rp {trip.price.toLocaleString('id-ID')}</p>
                                <div className="mt-2 flex justify-between items-center">
                                    <h4 className="text-sm text-gray-500">Peserta Terdaftar: {trip.total_participants}</h4>
                                    {trip.feedback?.average_rating ? (
                                        <div className="flex gap-1 mt-2 text-yellow-400">
                                            {Array.from({ length: trip.feedback.average_rating }, (_, i) => (
                                                <FontAwesomeIcon icon={faStar} key={i} />
                                            ))}
                                        </div>
                                    ) : null}
                                </div>
                                <img
                                    src={Icon1}
                                    alt="mount"
                                    className="h-10 absolute top-2 right-0 opacity-25"
                                />
                            </div>
                        </Link>
                    )) : <p className="text-gray-500">Tidak ada data trip tersedia.</p>}
                </div>

                {openTripPagination.last_page > 1 && (
                    <Pagination
                        pagination={openTripPagination}
                        onPageChange={handleOpenTripPageChange}
                    />
                )}
            </div>

            <div className='mt-20'>
                <h1 className='text-3xl mb-4 inline-block bg-green-200 rounded-lg px-2'>
                    <span className='text-[#859F3D]'>Private</span> Trip
                </h1>
                <p>Pendakian eksklusif untuk grup, dengan kebebasan mengatur jadwal dan rute perjalanan.</p>

                <div className="mt-4">
                    <form onSubmit={handlePrivateTripSearch} className="flex gap-2 w-full max-w-md mb-6">
                        <input
                            type="text"
                            value={privateTripSearch}
                            onChange={(e) => setPrivateTripSearch(e.target.value)}
                            placeholder="Cari trip berdasarkan nama gunung..."
                            className="px-4 py-2 border border-gray-300 rounded-md flex-grow focus:outline-none focus:ring-2 focus:ring-[#FFC100]"
                        />
                        <button
                            type="submit"
                            className="bg-[#FFC100] text-white px-4 py-2 rounded-md hover:bg-[#e6ae00] transition duration-200"
                        >
                            <FontAwesomeIcon icon={faSearch} />
                        </button>
                    </form>
                </div>

                <div className='grid grid-cols-3 gap-10 mt-6'>
                    {privateTrip.length > 0 ? privateTrip.map((trip, index) => (
                        <Link
                            to={`/trip/${trip.mountain_name}`}
                            key={index}
                            state={{ id: trip.id }}
                            className="relative border-2 border-gray-300 rounded-lg hover:scale-105 duration-300"
                        >
                            <img
                                src={trip.mountain_photo}
                                alt={trip.mountain_name}
                                className="w-full h-50 object-cover rounded-md"
                            />
                            <div className="relative p-4">
                                <h2 className="text-xl font-semibold text-[#FFC100]">{trip.mountain_name}</h2>
                                <p className="font-bold mt-2">Rp {trip.price.toLocaleString('id-ID')}</p>
                                <div className="mt-2 flex justify-between items-center">
                                    <h4 className="text-sm text-gray-500">Peserta Terdaftar: {trip.total_participants}</h4>
                                    {trip.feedback?.average_rating ? (
                                        <div className="flex gap-1 mt-2 text-yellow-400">
                                            {Array.from({ length: trip.feedback.average_rating }, (_, i) => (
                                                <FontAwesomeIcon icon={faStar} key={i} />
                                            ))}
                                        </div>
                                    ) : null}
                                </div>
                                <img
                                    src={Icon1}
                                    alt="mount"
                                    className="h-10 absolute top-2 right-0 opacity-25"
                                />
                            </div>
                        </Link>
                    )) : <p className="text-gray-500">Tidak ada data trip tersedia.</p>}
                </div>

                {privateTripPagination.last_page > 1 && (
                    <Pagination
                        pagination={privateTripPagination}
                        onPageChange={handlePrivateTripPageChange}
                    />
                )}
            </div>

            <ToastContainer
                className="absolute top-5 right-5"
            />

            <a
                href="https://wa.me/"
                target="_blank"
                rel="noopener noreferrer"
                className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-full shadow-lg transition duration-300"
            >
                <FontAwesomeIcon icon={faWhatsapp} className="text-xl" />
                <span className="font-medium">Chat via WhatsApp</span>
            </a>
        </div>
    );
};

export default Trip;