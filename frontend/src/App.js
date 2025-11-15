


// src/App.js
import React from "react";
import { Routes, Route } from "react-router-dom";
// import Layout from "./components/Layout";
import PublicLayout from "./components/PublicLayout";
import AdminLayout from "./components/AdminLayout";

// Parent pages
import Home from "./components/Home";
import TheSchool from "./components/TheSchool";
import Academics from "./components/Academics";
import Admissions from "./components/Admissions";
import ExtraCurricular from "./components/ExtraCurricular";
import Download from "./components/Download";
import Gallery from "./components/Gallery";
import Contact from "./components/Contact";
import AdmissionForm from "./components/AdmissionForm";
import MandatoryDisclosure from "./components/MandatoryDisclosure";



// Admin pages
import AdminLogin from "./components/AdminLogin";
import AdminDashboard from "./components/AdminDashboard";
import ManageTeachers from "./components/ManageTeachers";
import ManageNotices from "./components/ManageNotices";
import AdminProfile from "./components/AdminProfile";
import AdmissionDetail from "./components/AdmissionDetail";
import ContactEditor from "./components/ContactEditor";
import AdminManageAcademics from "./components/AdminManageAcademics";
import AdminEditSection from "./components/AdminEditSection";
import AdminExtraCurricular from "./components/AdminExtraCurricular";
import AdminGallery from "./components/AdminGallery";
import AdminHomeManager from "./components/AdminHomeManager";
import AdminFeeHistory from "./components/AdminFeeHistory";

// === Fees Management ===
import AdminManageFees from "./components/AdminManageFees";
import ParentFeePage from "./components/ParentFeePage";
import AdminStudentsFees from "./components/AdminStudentsFees";
import FeeStructure from "./components/FeeStructure";



export default function App() {
  return (
    <Routes>
      {/* Parent routes */}
      <Route element={<PublicLayout />}>
      
        <Route index element={<Home />} />
        <Route path="school" element={<TheSchool />} />
        <Route path="academics" element={<Academics />} />
        <Route path="admissions" element={<Admissions />} />
        <Route path="extracurricular" element={<ExtraCurricular />} />
        <Route path="download" element={<Download />} />
        <Route path="gallery" element={<Gallery />} />
        <Route path="contact" element={<Contact />} />
        <Route path="admission-form" element={<AdmissionForm />} />
        <Route path="mandatory-disclosure" element={<MandatoryDisclosure />} />
        <Route path="/parent-fees" element={<ParentFeePage />} />
        <Route path="fees/:admissionNo" element={<ParentFeePage />} />
        <Route path="fees" element={<FeeStructure />} />



      
      </Route>

      {/* Admin routes */}
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin" element={<AdminLayout />}>
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="teachers" element={<ManageTeachers />} />
        <Route path="notices" element={<ManageNotices />} />
        <Route path="profile" element={<AdminProfile />} />
        <Route path="/admin/admission/:id" element={<AdmissionDetail />} />
        <Route path="contact" element={<ContactEditor />} />
        <Route path="/admin/manage-academics" element={<AdminManageAcademics />} />
        <Route path="/admin/edit-academics/:sectionKey" element={<AdminEditSection />} />
        <Route path="/admin/manage-fees" element={<AdminManageFees />} />
        <Route path="/admin/students-fees" element={<AdminStudentsFees />} />
        <Route path="/admin/manage-extracurricular" element={<AdminExtraCurricular />} />
        <Route path="manage-gallery" element={<AdminGallery />} /> {/* NEW */}
        <Route path="manage-home" element={<AdminHomeManager />} />
        <Route path="/admin/fee-history" element={<AdminFeeHistory />} />
      </Route>
    </Routes>
  );
}
