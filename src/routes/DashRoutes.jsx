import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Sidebar from "../component/Sidebar";
import Dashboard from "../pages/Dashboard";
import UserDash from "../pages/userDash";
import OpenTrip from "../pages/OpenTrip";
import PrivateTrip from "../pages/PrivateTrip";
import TranOpenTrip from "../pages/TransOpenTrip";
import TranPrivTrip from "../pages/TransPrivTrip";
import Laporan from "../pages/LaporanTrip";
import GuidePorter from "../pages/GuidePorterPage";
import DetailOpenTransaksi from "../pages/DetOpenTran";
import DetailPrivateTransaksi from "../pages/DetPrivTrip";
import AddOpenTrip from "../pages/AddOpenTrip";
import EditOpenTrip from "../pages/EditOpenTrip";
import AddPrivTrip from "../pages/AddPrivateTrip";
import UserDetailView from "../pages/UserDetailView";
import ViewOpenTrip from "../pages/ViewOpenTrip";
import ViewPrivateTrip from "../pages/ViewPrivateTrip";


const DashRoutes = () => {
    return (
        <div className="flex h-screen">
            <Sidebar />
            <div className="flex-1 p-4 overflow-y-auto">
                <Routes>
                    <Route path="" element={<Dashboard />} />
                    <Route path="user" element={<UserDash />} />
                    <Route path="opentrip" element={<OpenTrip />} />
                    <Route path="privtrip" element={<PrivateTrip />} />
                    <Route path="booking-open" element={<TranOpenTrip />} />
                    <Route path="booking-private" element={<TranPrivTrip />} />
                    <Route path="laporan" element={<Laporan />} />
                    <Route path="guideporter" element={<GuidePorter />} />
                    <Route path="booking/open/:id" element={<DetailOpenTransaksi />} />
                    <Route path="booking/private/:id" element={<DetailPrivateTransaksi />} />
                    <Route path="add-open-trip" element={<AddOpenTrip />} />
                    <Route path="edit-open-trip/:id" element={<EditOpenTrip />} />
                    <Route path="add-private-trip" element={<AddPrivTrip />} />
                    <Route path="view-private-trip/:id" element={<ViewPrivateTrip />} />
                    <Route path="view-open-trip/:id" element={<ViewOpenTrip />} />
                    <Route path="user/:id" element={<UserDetailView />} />
                </Routes>
            </div>
        </div>
    );
};
export default DashRoutes;
