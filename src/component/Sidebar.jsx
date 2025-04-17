import React, { useState } from 'react';
import { FaUser, FaMountain, FaChevronDown, FaReceipt, FaFileAlt, FaUsers, FaSignOutAlt } from 'react-icons/fa';
import logo from '../assets/logo/logo.svg';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const Sidebar = () => {
  const [isTripOpen, setIsTripOpen] = useState(false);
  const [isTransaksiOpen, setIsTransaksiOpen] = useState(false);
  const navigate = useNavigate();

  const toggleTrip = () => {
    setIsTripOpen(!isTripOpen);
    if (isTransaksiOpen) setIsTransaksiOpen(false);
  };

  const toggleTransaksi = () => {
    setIsTransaksiOpen(!isTransaksiOpen);
    if (isTripOpen) setIsTripOpen(false);
  };

  const handleLogoClick = () => {
    navigate('/dashboard');
  };

  const handleLogout = () => {
    Cookies.remove("token");
    navigate("/");
  };

  return (
    <div className="w-1/5 bg-gray-200 h-full p-4 overflow-y-auto">
      <div className="flex items-center justify-center mb-8">
        <img src={logo} alt="Logo" className="rounded-full cursor-pointer" width="100" height="100" onClick={handleLogoClick} />
      </div>
      <nav>
        <ul>
          <li className="mb-4">
            <Link to="/dashboard/user" className="flex items-center p-2 text-gray-700 rounded-lg">
              <FaUser className="mr-2" />
              User
            </Link>
          </li>
          <li className="mb-4">
            <div onClick={toggleTrip} className="flex items-center p-2 text-gray-700 cursor-pointer">
              <FaMountain className="mr-2" />
              Trip
              <FaChevronDown className={`ml-auto ${isTripOpen ? 'transform rotate-180' : ''}`} />
            </div>
            {isTripOpen && (
              <ul className="pl-4">
                <li className="mb-2">
                  <Link to="/dashboard/privtrip" className="flex items-center p-2 text-gray-600">
                    Private Trip
                  </Link>
                </li>
                <li className="mb-2">
                  <Link to="/dashboard/opentrip" className="flex items-center p-2 text-gray-600">
                    Open Trip
                  </Link>
                </li>
              </ul>
            )}
          </li>
          <li className="mb-4">
            <div onClick={toggleTransaksi} className="flex items-center p-2 text-gray-700 cursor-pointer">
              <FaReceipt className="mr-2" />
              Transaksi
              <FaChevronDown className={`ml-auto ${isTransaksiOpen ? 'transform rotate-180' : ''}`} />
            </div>
            {isTransaksiOpen && (
              <ul className="pl-4">
                <li className="mb-2">
                  <Link to="/dashboard/booking-open" className="flex items-center p-2 text-gray-600">
                    Open Trip
                  </Link>
                </li>
                <li className="mb-2">
                  <Link to="/dashboard/booking-private" className="flex items-center p-2 text-gray-600">
                    Private Trip
                  </Link>
                </li>
              </ul>
            )}
          </li>
          <li className="mb-4">
            <Link to="/dashboard/laporan" className="flex items-center p-2 text-gray-700">
              <FaFileAlt className="mr-2" />
              Laporan
            </Link>
          </li>
          <li className="mb-4">
            <Link to="/dashboard/guideporter" className="flex items-center p-2 text-gray-700">
              <FaUsers className="mr-2" />
              Guide & Porter
            </Link>
          </li>
          <li className="mt-auto">
            <button onClick={handleLogout} className="flex items-center p-2 text-gray-700 w-full">
              <FaSignOutAlt className="mr-2" />
              Log out
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
