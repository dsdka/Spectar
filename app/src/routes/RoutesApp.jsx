import React from 'react';
import { Route, Routes } from "react-router-dom";

import LoginPage from '../components/LoginPage/LoginPage';
import UserManagement from '../components/pages/UserManagement/UserManagement';

function RoutesApp() {
  return (
    <Routes>
      <Route exact path="/" element={<div>Init Page</div>} />
      <Route exact path="/schedule" element={<div>schedule</div>} />
      <Route exact path="/patients" element={<div>patients</div>} />
      <Route exact path="/userManagement" element={<UserManagement />} />
      <Route exact path="/settings" element={<div>settings</div>} />
      <Route exact path="/myDocuments" element={<div>myDocuments</div>} />

      <Route exact path="/login" element={ <LoginPage />} />
    </Routes>
  );
}

export default RoutesApp;