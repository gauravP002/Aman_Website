import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Home from '../screens/Home';
import About from '../screens/About';
import StudyMaterials from '../screens/StudyMaterials';
import Blog from '../screens/Blog';
import BlogDetail from '../screens/BlogDetail';
import YouTube from '../screens/YouTube';
import AdminDashboard from '../admin/Dashboard';
import Footer from '../components/Footer';

export default function AppRouter() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/study-materials" element={<StudyMaterials />} />
          <Route path="/study-materials/:category" element={<StudyMaterials />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:id" element={<BlogDetail />} />
          <Route path="/youtube" element={<YouTube />} />
          <Route path="/admin/*" element={<AdminDashboard />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
