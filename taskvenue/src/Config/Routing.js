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

        <Route path="/ClientReports" element={<ClientReports />} />
        <Route path="/ClientProfile" element={<ClientProfile />} />
        <Route path="/ClientTasks" element={<ClientTasks />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Routing;
