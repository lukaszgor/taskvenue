import { BrowserRouter, Routes, Route, Link,useParams } from "react-router-dom"

// pages

import Login from "../Pages/Common/Login"
import Home from "../Pages/Common/Home"
import NoAccessLicence from "../Pages/Common/NoAccessLicence";
import Administration from "../Pages/Manager/Administration";
import LocationDashboard from "../Pages/Manager/LocationDashboard";
import Schedule from "../Pages/Manager/Schedule";
import Reports from "../Pages/Manager/Reports";
import Tasks from "../Pages/Manager/Tasks";
import Profile from "../Pages/Manager/Profile";
import Register from "../Pages/Manager/Register";
import UserDetails from "../Pages/Manager/UserDetails";
import ContractorsDetails from "../Pages/Manager/ContractorsDetails";
import WaitingRoomForNewUser from "../Pages/Common/WaitingRoomForNewUser";

function Routing() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/NoAccessLicence" element={<NoAccessLicence />} />
        <Route path="/WaitingRoomForNewUser" element={<WaitingRoomForNewUser />} />
        <Route path="/Administration" element={<Administration />} />
        <Route path="/LocationDashboard" element={<LocationDashboard />} />
        <Route path="/Schedule" element={<Schedule />} />
        <Route path="/Reports" element={<Reports />} />
        <Route path="/Tasks" element={<Tasks />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/UserDetails/:id" element={<UserDetails />} />
        <Route path="/ContractorsDetails/:id" element={<ContractorsDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Routing;
