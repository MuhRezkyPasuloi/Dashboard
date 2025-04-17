import { Route, Routes, useNavigate } from "react-router-dom";
import React, { useEffect } from 'react'
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import LandingPage from "../pages/LandingPage";
import Navbar from "../component/Navbar";
import Footer from "../component/Footer";
import AboutUs from "../pages/AboutUs";
import Trip from "../pages/Trip";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Profile from "../pages/Profile";
import TripDetail from "../pages/TripDetail";
import Book from "../pages/Book";
import BookingDetail from "../pages/BookingDetail";
import UpdateProfile from "../pages/UpdateProfile";
import UpdatePassword from "../pages/UpdatePassword";
import DashRoutes from "./DashRoutes";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AppRoutes = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const token = Cookies.get("token");
        if (token) {
            try {
                const decoded = jwtDecode(token);
                const role = decoded.role;

                if (role === "admin") {
                    navigate("/dashboard");
                } else {
                    navigate("/");
                }
            } catch (error) {
                console.error("Invalid token", error);
                navigate("/login"); // atau redirect ke login kalau token rusak
            }
        }
    }, [Cookies.get("token")])

    return (
        <>
            <ToastContainer />

            <Routes>
                <Route path="/" element={
                    <>
                        <Navbar />
                        <LandingPage />
                        <Footer />
                    </>
                } />
                <Route path="/tentangkami" element={
                    <>
                        <Navbar />
                        <AboutUs />
                        <Footer />
                    </>
                } />
                <Route path="/daftartrip" element={
                    <>
                        <Navbar />
                        <Trip />
                        <Footer />
                    </>
                } />
                <Route path="/trip/:mountain_name" element={
                    <>
                        <Navbar />
                        <TripDetail />
                        <Footer />
                    </>
                } />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/dashboard/*" element={<DashRoutes />} />
                <Route path="/profile" element={
                    <>
                        <Navbar />
                        <Profile />
                        <Footer />
                    </>
                } />
                <Route path="/bookings" element={
                    <>
                        <Navbar />
                        <Book />
                        <Footer />
                    </>
                } />
                <Route path="/bookings/:mountain_name" element={
                    <>
                        <Navbar />
                        <BookingDetail />
                        <Footer />
                    </>
                } />
                <Route path="/updateprofile" element={
                    <>
                        <Navbar />
                        <UpdateProfile />
                        <Footer />
                    </>
                } />
                <Route path="/updatepassword" element={
                    <>
                        <Navbar />
                        <UpdatePassword />
                        <Footer />
                    </>
                } />
            </Routes>
        </>
    )
}

export default AppRoutes;
