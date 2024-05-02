import React from "react";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
// import Header from "../Layout/Header/Header";
import RegistrationApi from "../Components/RegistrationApi";
import LoginApi from "../Components/LoginApi";
import Profile from "../Components/Users/Profile";
// import View from "../Components/CURD/View";
// import Create from "../Components/CURD/Create";
// import Registration from "../Components/Registration";
// import Caraousel from "../Components/Caraousel";
// import SingleProd from "../Components/SingleProd";
// import Login from "../Components/Login";
// import AllUsers from "../Components/Users/AllUsers";
// import CreateState from "../Components/CURD/CreateState";

const Routing = () => {
  return (
    <Router>
      {/* <Header /> */}
      <Routes>
        {/* <Route path="" element={<Login />} /> */}
        {/* <Route path="carousel" element={<Caraousel />} />
        <Route path="carousel/single/:id" element={<SingleProd />} /> */}
        {/* <Route path="register" element={<Registration />} />
        <Route path="view" element={<View />} /> */}
        {/* <Route path="create" element={<Create />} /> */}
        {/* <Route path="createState" element={<CreateState />} /> */}
        {/* <Route path="allusers" element={<AllUsers />} /> */}
        <Route path="" element={<RegistrationApi />} />
        <Route path="loginapi" element={<LoginApi />} />
        <Route path="profile" element={<Profile />} />
      </Routes>
    </Router>
  );
};

export default Routing;
