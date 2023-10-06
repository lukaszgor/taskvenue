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
import AddNewTask from "../Pages/Manager/AddNewTask";
import TaskDetails from "../Pages/Manager/TaskDetails";
import Absences from "../Pages/Manager/Absences";
import AbsenceDetails from "../Pages/Manager/AbsenceDetails";
import AddNewAbsence from "../Pages/Manager/AddNewAbsence";
import WorkerAbsences from "../Pages/Worker/WorkerAbsences";
import WorkerProfile from "../Pages/Worker/WorkerProfile";
import WorkerReports from "../Pages/Worker/WorkerReports";
import WorkerSchedule from "../Pages/Worker/WorkerSchedule";
import WorkerTasks from "../Pages/Worker/WorkerTasks";
import ClientProfile from "../Pages/Client/ClientProfile";
import ClientReports from "../Pages/Client/ClientReports";
import ClientTasks from "../Pages/Client/ClientTasks";
import AddNewWorkerAbsence from "../Pages/Worker/AddNewWorkerAbsence";
import WorkerAbsenceDetails from "../Pages/Worker/WorkerAbsenceDetails";
import WorkerTaskDetails from "../Pages/Worker/WorkerTaskDetails";
import AddNewClientTask from "../Pages/Client/AddNewClientTask";
import ClientVenue from "../Pages/Client/ClientVenue";
import ClientContact from "../Pages/Client/ClientContact";
import ClientVenueDetalils from "../Pages/Client/ClientVenueDetalils";
import ClientTaskDetails from "../Pages/Client/ClientTaskDetails";
import Info from "../Pages/Common/Info/Info";
import AboutUs from "../Pages/Common/Info/AboutUs";
import CaseStudy from "../Pages/Common/Info/CaseStudy";
import InfoContact from "../Pages/Common/Info/InfoContact";
import Knowledge from "../Pages/Common/Info/Knowledge";
import Technology from "../Pages/Common/Info/Technology";

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
        <Route path="/Absences" element={<Absences />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/AddNewVenue" element={<AddNewVenue />} />
        <Route path="/AddNewTask" element={<AddNewTask />} />
        <Route path="/AddNewAbsence" element={<AddNewAbsence />} />
        <Route path="/UserDetails/:id" element={<UserDetails />} />
        <Route path="/ContractorsDetails/:id" element={<ContractorsDetails />} />
        <Route path="/VenueDetalils/:id" element={<VenueDetalils />} />
        <Route path="/TaskDetails/:id" element={<TaskDetails />} />
        <Route path="/AbsenceDetails/:id" element={<AbsenceDetails />} />

        <Route path="/WorkerAbsences" element={<WorkerAbsences />} />
        <Route path="/WorkerProfile" element={<WorkerProfile />} />
        <Route path="/WorkerReports" element={<WorkerReports />} />
        <Route path="/WorkerSchedule" element={<WorkerSchedule />} />
        <Route path="/WorkerTasks" element={<WorkerTasks />} />
        <Route path="/AddNewWorkerAbsence" element={<AddNewWorkerAbsence />} />
        <Route path="/WorkerAbsenceDetails/:id" element={<WorkerAbsenceDetails />} />
        <Route path="/WorkerTaskDetails/:id" element={<WorkerTaskDetails />} />

        <Route path="/ClientReports" element={<ClientReports />} />
        <Route path="/ClientProfile" element={<ClientProfile />} />
        <Route path="/ClientTasks" element={<ClientTasks />} />
        <Route path="/ClientNewTask" element={<AddNewClientTask />} />
        <Route path="/ClientVenues" element={<ClientVenue />} />
        <Route path="/ClientContact" element={<ClientContact />} />
        <Route path="/ClientVenueDetalils/:id" element={<ClientVenueDetalils />} />
        <Route path="/ClientTaskDetails/:id" element={<ClientTaskDetails />} />

        <Route path="/info" element={<Info />} />
        <Route path="/casestudy" element={<CaseStudy />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/infocontact" element={<InfoContact />} />
        <Route path="/knowledge" element={<Knowledge />} />
        <Route path="/technology" element={<Technology />} />



      </Routes>
    </BrowserRouter>
  );
}

export default Routing;
