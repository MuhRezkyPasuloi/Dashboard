import React from 'react'
import Logo from '../assets/logo/logo.png'
import { P1, P2, P3 } from '../assets/photo'
import Background from '../assets/background/aboutus.png'

const AboutUs = () => {
    return (
        <div className='px-60'>
            <div
                className="bg-cover bg-center bg-no-repeat rounded-lg"
                style={{ backgroundImage: `url(${Background})` }}
            >
                <h1 className="text-center text-[#FFC100] text-5xl font-bold py-20 bg-black/40 rounded-lg">
                    Tentang Kami
                </h1>
            </div>
            <div className='mt-10'>
                <div className='flex items-center justify-between gap-10'>
                    <div className='w-1/3 flex flex-col items-center gap-5'>
                        <img src={Logo} alt="Logo" className='h-40 w-40 object-contain mr-20' />
                        <img src={P1} alt="Photo1" className='h-40 w-40 object-cover rounded-lg ml-20' />
                    </div>

                    <p className='w-2/3 text-justify leading-relaxed text-lg'>
                        <span className='text-[#FFC100] font-semibold'>GaPakeRem Adventure</span>, singkatan dari Gerakan Pecinta Alam Kreatif Makassar, adalah komunitas dan operator wisata yang bergerak di bidang pemanduan pendakian gunung di Sulawesi Selatan. Didirikan oleh Yasin Habibi di Makassar pada 25 Agustus 2021, komunitas ini menyediakan layanan open trip dan private trip, khususnya untuk kawasan pegunungan di Sulawesi Selatan. Dengan mengedepankan kreativitas, setiap kegiatan selalu didokumentasikan dalam bentuk konten atau vlog, memberikan kenangan yang abadi bagi para peserta. Didukung oleh tim profesional yang terdiri dari dua guide bersertifikasi APGI (Asosiasi Pemandu Gunung Indonesia) dan sepuluh porter berpengalaman, GakPakeRem Adventure terbuka untuk semua kalangan tanpa batasan, menjadikan pengalaman pendakian gunung lebih inklusif, aman, dan berkesan.
                    </p>
                </div>

                <div className='mt-10 flex items-center justify-between gap-10'>
                    <p className='w-2/3 text-justify leading-relaxed text-lg'>
                        Nama "GaPakeRem" sendiri memiliki makna bahwa setiap kegiatan yang dilakukan oleh komunitas ini selalu berjalan tanpa henti, mencerminkan semangat yang terus berkembang. GakPakeRem berawal dari hobi dan keresahan pemilik yang tidak bisa bergabung dengan organisasi pecinta alam (mapala). Hal ini mendorong pemilik untuk membentuk komunitas yang awalnya hanya fokus pada kegiatan pendakian bersama. Seiring berjalannya waktu, beberapa kerabat pemilik pun mulai tertarik untuk ikut serta dalam kegiatan pendakian. Tak lama kemudian, seorang teman memberikan saran untuk mendirikan sebuah komunitas yang lebih formal, yang akhirnya menjadi GakPakeRem Adventure.                    </p>

                    <div className='w-1/3 flex flex-col items-center gap-5'>
                        <img src={P2} alt="Photo2" className='h-40 w-40 rounded-lg ml-40' />
                        <img src={P3} alt="Photo3" className='h-40 w-40 rounded-lg mr-40' />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AboutUs