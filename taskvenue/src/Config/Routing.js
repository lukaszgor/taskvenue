import { BrowserRouter, Routes, Route, Link,useParams } from "react-router-dom"

// pages

import Login from "../Pages/Common/Login"
import Home from "../Pages/Common/Home"
import NoAccessLicence from "../Pages/Common/NoAccessLicence";


function Routing() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/NoAccessLicence" element={<NoAccessLicence />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Routing;
