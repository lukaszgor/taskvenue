import { BrowserRouter, Routes, Route, Link,useParams } from "react-router-dom"

// pages

import Login from "../Pages/Common/Login"
import Home from "../Pages/Common/Home"
import NoAccessLicence from "../Pages/Common/NoAccessLicence";
import Administration from "../Pages/Manager/Administration";
import VenueDashboard from "../Pages/Manager/VenueDashboard";
import Schedule from "../Pages/Manager/Schedule";
import Reports from "../Pages/Manager/Reports";
import Tasks from "../Pages/Manager/Tasks";
import Profile from "../Pages/Manager/Profile";
import Register from "../Pages/Manager/Register";
import UserDetails from "../Pages/Manager/UserDetails";
import ContractorsDetails from "../Pages/Manager/ContractorsDetails";
import WaitingRoomForNewUser from "../Pages/Common/WaitingRoomForNewUser";
import AddNewVenue from "../Pages/Manager/AddNewVenue";
import VenueDetalils from "../Pages/Manager/VenueDetalils";

function Routing() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/NoAccessLicence" element={<NoAccessLicence />} />
        <Route path="/WaitingRoomForNewUser" element={<WaitingRoomForNewUser />} />
        <Route path="/Administration" element={<Administration />} />
        <Route path="/VenueDashboard" element={<VenueDashboard />} />
        <Route path="/Schedule" element={<Schedule />} />
        <Route path="/Reports" element={<Reports />} />
        <Route path="/Tasks" element={<Tasks />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/AddNewVenue" element={<AddNewVenue />} />
        <Route path="/UserDetails/:id" element={<UserDetails />} />
        <Route path="/ContractorsDetails/:id" element={<ContractorsDetails />} />
        <Route path="/VenueDetalils/:id" element={<VenueDetalils />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Routing;
