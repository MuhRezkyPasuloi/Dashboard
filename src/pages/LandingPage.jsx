import { React, useState, useEffect } from 'react'
import '../App.css';
import Logo from '../assets/logo/logo.png'
import Icon1 from '../assets/icon/mount.png'
import { P1, P2, P3, P4 } from '../assets/photo'
import { L1, L2, L3, L4 } from '../assets/service'
import { G1, G2, G3, G4, G5, G6 } from '../assets/gallery'
import Background from '../assets/background/bgmount.png'
import Background2 from '../assets/background/bgmount2.png'
import Background3 from '../assets/background/bgmount4.png'
import Tools from '../assets/icon/tools.png'
import Logo2 from '../assets/logo/seven.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInstagram, faWhatsapp } from '@fortawesome/free-brands-svg-icons'
import { faMousePointer, faImages, faQuoteLeft, faQuoteRight } from '@fortawesome/free-solid-svg-icons'
import Card1 from '../component/Card1'
import Testimoni from '../component/Testimoni'
import axios from 'axios'
import Loading from '../component/Loading'
import Slide from '../component/Slide'
import AOS from 'aos'
import 'aos/dist/aos.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LandingPage = () => {
    const [guide, setGuide] = useState([]);
    const [porter, setPorter] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        AOS.init({
            duration: 800,
            once: false,
            mirror: true,
        });

        setLoading(true);
        axios.all([
            axios.get('https://gapakerem.vercel.app/guides'),
            axios.get('https://gapakerem.vercel.app/porters')
        ])
            .then(axios.spread((openRes, privateRes) => {
                setGuide(openRes.data.data.guides);
                setPorter(privateRes.data.data.porters);
                setLoading(false);
            }))
            .catch((error) => {
                console.error("Error fetching data:", error);
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
        <div className='overflow-x-hidden'>
            {/* Hero Section */}
            <section className='px-8 md:px-20 lg:px-50 py-16 md:py-20 mb-20'>
                <div className='flex flex-col md:flex-row justify-center items-center gap-8 md:gap-10'>
                    <img src={Background3} alt="background" className="absolute bottom-0 left-0 w-full z-0 h-100 w-100 opacity-50" />

                    <div data-aos="fade-right">
                        <img src={Logo} alt="Logo" className='h-24 md:h-28 lg:h-100' />
                    </div>

                    <div className='relative text-center' data-aos="fade-left">

                        <h1 className='font-bold text-3xl md:text-4xl lg:text-5xl relative z-10'>
                            GaPakeRem Adventure
                        </h1>

                        <h4 className='text-xl text-[#FF6500] md:text-2xl lg:text-3xl relative z-10 mt-2'>
                            Lifetime brotherhood
                        </h4>

                        <button
                            className="bg-[#FF6500] text-2xl text-white px-4 py-2 rounded-lg shadow-lg hover:bg-yellow-400 transition mt-10"
                        >
                            Mulai Petualanganmu!
                        </button>
                    </div>
                </div>
            </section>

            {/* About Us Section */}
            <section className='px-8 md:px-20 lg:px-50 py-12 md:py-16'>
                <div className='flex gap-6 md:gap-8 lg:gap-10 justify-center items-center' data-aos="fade-up">
                    <img src={Icon1} className='h-8 md:h-10' />
                    <div className='relative'>
                        <h1 className='text-2xl md:text-3xl text-[#FFC100]'>Tentang Kami</h1>
                        <img
                            src={Icon1}
                            className='h-16 md:h-20 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-25'
                        />
                    </div>
                    <img src={Icon1} className='h-8 md:h-10' />
                </div>

                <div className="flex flex-col md:flex-row justify-between items-center mt-10 gap-8 md:gap-10">
                    <div className="grid grid-cols-2 gap-3 md:gap-4 w-full md:w-1/3" data-aos="fade-right">
                        <img src={P1} className="h-24 md:h-30 w-full object-cover rounded-lg" />
                        <img src={P2} className="h-32 md:h-40 w-full object-cover rounded-lg" />
                        <img src={P3} className="h-32 md:h-40 w-full object-cover rounded-lg" />
                        <img src={P4} className="h-24 md:h-30 w-full object-cover rounded-lg" />
                    </div>

                    <div className="w-full md:w-2/3 mt-6 md:mt-0" data-aos="fade-left">
                        <p className="text-justify">
                            <span className='text-[#FFC100] font-semibold'>GaPakeRem Adventure</span>, singkatan dari Gerakan Pecinta Alam Kreatif Makassar, adalah komunitas dan operator wisata yang bergerak di bidang pemanduan
                            pendakian gunung di Sulawesi Selatan. Didirikan oleh Yasin Habibi di Makassar pada 25 Agustus 2021, komunitas ini menyediakan layanan open trip dan
                            private trip, khususnya untuk kawasan pegunungan di Sulawesi Selatan. Dengan mengedepankan kreativitas, setiap kegiatan selalu didokumentasikan dalam
                            bentuk konten atau vlog yang menarik, memberikan kenangan yang abadi bagi para peserta. Didukung oleh tim profesional yang terdiri dari dua guide
                            bersertifikasi APGI (Asosiasi Pemandu Gunung Indonesia) dan sepuluh porter berpengalaman, GakPakeRem Adventure terbuka untuk semuk kalangan tanpa
                            batasan, menjadikan pengalaman pendakian gunung lebih inklusif, aman, dan berkesan.
                        </p>
                    </div>
                </div>
            </section>

            {/* Services Section */}
            <section className="relative px-8 md:px-20 lg:px-50 py-16 md:py-20">
                <img src={Background} alt="background" className="absolute top-0 left-0 w-full h-full z-0" />

                <div className='mt-20 md:mt-32 lg:mt-40 flex items-center gap-6 md:gap-10 relative z-10' data-aos="fade-right">
                    <h1 className='text-2xl md:text-3xl font-bold text-gray-500'>Layanan trip Kami</h1>
                    <div className='h-4 md:h-5 w-2/3 bg-[#FFC100] rounded-lg' />
                </div>

                <div className='mt-12 md:mt-16 lg:mt-20 mb-16 md:mb-20 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 relative z-10'>
                    <div className='flex flex-col gap-2 items-center' data-aos="zoom-in" data-aos-delay="100">
                        <div className='w-16 h-16 md:w-20 md:h-20 bg-gray-500 rounded-full overflow-hidden'>
                            <img src={L1} alt='layanan1' className='w-full h-full object-cover' />
                        </div>
                        <h4 className='font-semibold text-gray-500 text-xl mt-2'>Pendaki Open Trip</h4>
                        <p className='text-lg text-center max-w-md'>Pendakian bersama grup terbuka untuk umum dengan pemanduan profesional, cocok bagi individu yang ingin menikmati pendakian seru dan bertemu teman baru.</p>
                    </div>
                    <div className='flex flex-col gap-2 items-center' data-aos="zoom-in" data-aos-delay="200">
                        <div className='w-16 h-16 md:w-20 md:h-20 bg-gray-500 rounded-full overflow-hidden'>
                            <img src={L2} alt='layanan2' className='w-full h-full object-cover' />
                        </div>
                        <h4 className='font-semibold text-gray-500 text-xl mt-2'>Pendaki Private Trip</h4>
                        <p className='text-lg text-center max-w-md'>Layanan pendakian eksklusif untuk grup dengan fleksibilitas rute dan waktu yang dapat disesuaikan sesuai kebutuhan.</p>
                    </div>
                    <div className='flex flex-col gap-2 items-center' data-aos="zoom-in" data-aos-delay="300">
                        <div className='w-16 h-16 md:w-20 md:h-20 bg-gray-500 rounded-full overflow-hidden'>
                            <img src={L3} alt='layanan3' className='w-full h-full object-cover' />
                        </div>
                        <h4 className='font-semibold text-gray-500 text-xl mt-2'>Pemandu Bersertifikat</h4>
                        <p className='text-lg text-center max-w-md'>Pendakian dipandu oleh guide bersertifikat APGI yang berpengalaman, memastikan pengalaman aman, nyaman dan menyenangkan.</p>
                    </div>
                    <div className='flex flex-col gap-2 items-center' data-aos="zoom-in" data-aos-delay="400">
                        <div className='w-16 h-16 md:w-20 md:h-20 bg-gray-500 rounded-full overflow-hidden'>
                            <img src={L4} alt='layanan4' className='w-full h-full object-cover' />
                        </div>
                        <h4 className='font-semibold text-gray-500 text-xl mt-2'>Jasa Porter</h4>
                        <p className='text-lg text-center text-lg max-w-md'>Layanan porter untuk membawa alat dan logistik, memudahkan peserta fokus pada pengalaman pendakian.</p>
                    </div>
                </div>
            </section>

            {/* Equipment Section */}
            <section className='px-8 md:px-20 lg:px-50 py-12 md:py-16 lg:py-20'>
                <div className='flex items-center justify-center gap-6 md:gap-10' data-aos="fade-up">
                    <div className='h-3 md:h-5 w-1/4 md:w-1/2 bg-[#FFC100] rounded-lg' />
                    <h1 className='text-2xl md:text-3xl font-bold text-gray-500'>Butuh Perlengkapan Mendaki?</h1>
                </div>

                <div className='mt-12 md:mt-16 lg:mt-20 flex flex-col md:flex-row justify-center items-center gap-10 md:gap-20'>
                    <div className='w-full md:w-1/3' data-aos="fade-right">
                        <p className="text-center md:text-left text-lg">
                            Kami di <span className='text-[#FFC100] font-semibold'>Gapakerem Outdoor & Service</span> menyediakan peralatan berkualitas tinggi untuk
                            perjalanan yang aman dan nyaman. Sewa sekarang dan fokuslah pada petualangan
                        </p>
                        <img src={Tools} alt='image1' className="mt-4 md:mt-6 animate-floating" />
                    </div>
                    <div className="relative flex flex-col items-center" data-aos="fade-left">
                        <FontAwesomeIcon
                            icon={faInstagram}
                            className="absolute top-0 right-0 text-[#FFC100] opacity-50 text-3xl md:text-5xl rotate-12 animate-floating"
                        />

                        <FontAwesomeIcon
                            icon={faInstagram}
                            className="absolute left-[-10px] top-1/2 -translate-y-1/2 text-[#FFC100] opacity-50 text-3xl md:text-5xl -rotate-12 animate-floating"
                        />

                        <div className="absolute right-[0.1px] top-1/2 -translate-y-1/2 flex flex-col items-center animate-floating">
                            <FontAwesomeIcon
                                icon={faMousePointer}
                                className="text-gray-400 text-2xl md:text-3xl -rotate-20"
                            />
                            <span className="text-xs md:text-sm text-gray-500 mt-1">klik disini</span>
                        </div>

                        <img src={Logo2} alt="Logo2" className="h-48 md:h-64 w-auto" />

                        <div className="mt-4 text-center">
                            <span className="mr-2 italic font-semibold">
                                Lihat koleksi perlengkapan kami di instagram
                            </span>
                            <span className="p-2 border rounded-full font-semibold underline">
                                @outsevencamp
                            </span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Gallery Section */}
            <section className='px-8 md:px-20 lg:px-50 py-12 md:py-16 lg:py-20 mt-10 md:mt-16 lg:mt-20'>
                <div className='flex items-center justify-center gap-6 md:gap-10' data-aos="fade-up">
                    <div className='h-3 md:h-5 w-1/4 md:w-1/2 bg-[#FFC100] rounded-lg' />
                    <h1 className='text-2xl md:text-3xl text-[#FFC100]'>Gallery</h1>
                    <div className='h-3 md:h-5 w-1/4 md:w-1/2 bg-[#FFC100] rounded-lg' />
                </div>

                <div className="relative">
                    <FontAwesomeIcon
                        icon={faImages}
                        className='absolute left-[5%] md:left-[10%] opacity-50 -rotate-12 text-[#FFC100] text-3xl md:text-5xl animate-floating'
                    />

                    <FontAwesomeIcon
                        icon={faImages}
                        className='absolute right-[5%] md:right-[10%] opacity-50 rotate-12 text-[#FFC100] text-3xl md:text-5xl animate-floating'
                    />

                    <p className='text-center text-lg mt-4 md:mt-6'>
                        Lihat koleksi foto dan video dari petualangan mendaki kami.
                    </p>
                </div>

                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 lg:gap-10 mt-8 md:mt-10'>
                    <div data-aos="fade-up" data-aos-delay="100">
                        <img src={G1} alt='Gallery 1' className='w-full h-auto rounded-lg object-cover' />
                    </div>
                    <div data-aos="fade-up" data-aos-delay="200">
                        <img src={G2} alt='Gallery 2' className='w-full h-auto rounded-lg object-cover' />
                    </div>
                    <div data-aos="fade-up" data-aos-delay="300">
                        <img src={G3} alt='Gallery 3' className='w-full h-auto rounded-lg object-cover' />
                    </div>
                    <div data-aos="fade-up" data-aos-delay="400">
                        <img src={G4} alt='Gallery 4' className='w-full h-auto rounded-lg object-cover' />
                    </div>
                    <div data-aos="fade-up" data-aos-delay="500">
                        <img src={G5} alt='Gallery 5' className='w-full h-auto rounded-lg object-cover' />
                    </div>
                    <div data-aos="fade-up" data-aos-delay="600">
                        <img src={G6} alt='Gallery 6' className='w-full h-auto rounded-lg object-cover' />
                    </div>
                </div>

                <div className='h-3 md:h-5 bg-[#FFC100] rounded-lg mt-12 md:mt-16 lg:mt-20' data-aos="fade-up" />
            </section>

            {/* Guide & Porter Section */}
            <section className='px-8 md:px-20 lg:px-50 py-12 md:py-16'>
                <p className='text-center text-lg' data-aos="fade-up">Jelajahi Gunung Bersama Guide & Porter Berpengalaman</p>

                <div data-aos="fade-up">
                    <h1 className='text-2xl md:text-3xl text-[#FFC100] text-center mt-5'>-- Guide --</h1>
                    <div data-aos="fade-right" data-aos-delay="200">
                        <Slide
                            items={guide}
                            renderItem={(item) => <Card1 imageUrl={item.photo} name={item.name} />}
                            itemsPerView={3}
                        />
                    </div>
                </div>

                <div className="mt-8 md:mt-10" data-aos="fade-up">
                    <h1 className='text-2xl md:text-3xl text-[#FFC100] text-center mt-5'>-- Porter --</h1>
                    <div data-aos="fade-left" data-aos-delay="200">
                        <Slide
                            items={porter}
                            renderItem={(item) => <Card1 imageUrl={item.photo} name={item.name} />}
                            itemsPerView={3}
                        />
                    </div>
                </div>
            </section>

            {/* Testimonial Section */}
            <section className='relative px-8 md:px-20 lg:px-50 py-12 md:py-16 lg:py-20 mt-10 md:mt-16 lg:mt-20'>
                <img src={Background2} alt="background2" className="absolute top-0 left-0 w-full h-full z-0" />

                <div className='flex items-center justify-center gap-3 md:gap-4 relative z-10' data-aos="fade-up">
                    <FontAwesomeIcon
                        icon={faQuoteLeft}
                        className='text-2xl md:text-3xl'
                    />

                    <h1 className='text-2xl md:text-3xl font-bold'>Testimoni</h1>

                    <FontAwesomeIcon
                        icon={faQuoteRight}
                        className='text-2xl md:text-3xl'
                    />
                </div>

                <div className='mt-20 md:mt-32 lg:mt-40 z-10 relative'>
                    <div className='flex flex-col md:flex-row gap-6 md:gap-10 justify-center'>
                        <div data-aos="fade-right" data-aos-delay="200">
                            <Testimoni
                                text="Pengalaman pendakian bersama GakPakeRem Adventure luar biasa! Guide yang profesional, perjalanan yang aman, dan keindahan alam yang tak 
                                terlupakan. Saya ikut open trip dan bisa bertemu banyak teman baru. Pasti akan ikut lagi!"
                                username="Anonim"
                                mount="Gunung Lompobattang"
                                rating={4}
                            />
                        </div>
                        <div data-aos="fade-left" data-aos-delay="400">
                            <Testimoni
                                text="Pengalaman pendakian bersama GakPakeRem Adventure luar biasa! Guide yang profesional, perjalanan yang aman, dan keindahan alam yang tak 
                                terlupakan. Saya ikut open trip dan bisa bertemu banyak teman baru. Pasti akan ikut lagi!"
                                username="Anonim"
                                mount="Gunung Lompobattang"
                                rating={4}
                            />
                        </div>
                    </div>
                </div>
            </section>

            <div className="mt-40 text-center text-[#FFC100] font-extrabold opacity-10 whitespace-nowrap pointer-events-none select-none" data-aos="slide-left">
                <span className="text-[150px]" >GAPAKEREM</span><span className="text-[50px]">Adventure</span>
            </div>

            <a
                href="https://wa.me/"
                target="_blank"
                rel="noopener noreferrer"
                className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-full shadow-lg transition duration-300"
            >
                <FontAwesomeIcon icon={faWhatsapp} className="text-xl" />
                <span className="font-medium">Chat via WhatsApp</span>
            </a>

            <ToastContainer
                className="absolute top-5 right-5"
            />
        </div>
    )
}

export default LandingPage