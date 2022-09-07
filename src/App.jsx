import React, { useState, useEffect } from "react";
// CSS
import "antd/dist/antd.css";
import "bootstrap/dist/css/bootstrap.min.css";
// Notify
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// Component
import Navbar from "./component/layout/Navbar";
import Login from "./component/pages/auth/Login";
import Register from "./component/pages/auth/Register";
import Home from "./component/pages/Home";
import AdminDashboard from "./component/pages/admin/AdminDashboard";
import UserDashboard from "./component/pages/user/UserDashboard";
import AdminCreatePerson from "./component/pages/admin/AdminCreatePerson";
import AdminUpdatePerson from "./component/pages/admin/AdminUpdatePerson";
// Router
// อยู่นอก Switch แสดงทุกหน้า
import { Routes, Route } from "react-router-dom";
import UserRoute from "./component/routes/UserRoute";
import AdminRoute from "./component/routes/AdminRoute";
// Redux

import { useDispatch } from "react-redux";
// functions
import { currentUser } from "./component/functions/auth";
function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const idTokenResult = localStorage.token;
    // console.log('App',idTokenResult);
    if (idTokenResult) {
      currentUser(idTokenResult)
        .then(res => {
          // console.log('App',res)
          dispatch({
            type: "LOGIN",
            payload: {
              name: res.data.name,
              token: idTokenResult,
              role: res.data.role,
              id: res.data._id,
            },
          });
        })
        .catch(err => {
          console.log(err);
        });
    }
  }, [dispatch]);
  return (
    <div className="App">
      <Navbar />
      <ToastContainer />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/register" element={<Register />} />
        <Route
          exact
          path="/admin/dashboard"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        />
        <Route
          exact
          path="/admin/create-person"
          element={
            <AdminRoute>
              <AdminCreatePerson />
            </AdminRoute>
          }
        />
        <Route
          exact
          path="/admin/update-person/:id"
          element={
            <AdminRoute>
              <AdminUpdatePerson />
            </AdminRoute>
          }
        />
        <Route
          exact
          path="/user/dashboard"
          element={
            <UserRoute>
              <UserDashboard />
            </UserRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
