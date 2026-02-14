import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import Layout from './components/Layout/Layout'
import Home from './pages/Home'
import HomeA from './pages/HomeA'
import SampleCatalog from './pages/SampleCatalog'
import FillAVerse from './pages/FillAVerse'
import UploadSample from './pages/UploadSample'
import UploadVerse from './pages/UploadVerse'
import Signup from './pages/Signup'

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* Pages with Layout (Navbar) */}
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="side-a" element={<HomeA />} />
            <Route path="sample-catalog" element={<SampleCatalog />} />
            <Route path="fill-a-verse" element={<FillAVerse />} />
          </Route>
          
          {/* Pages without Layout */}
          <Route path="/signup" element={<Signup />} />
          <Route path="/upload-sample" element={<UploadSample />} />
          <Route path="/upload-verse" element={<UploadVerse />} />
        </Routes>
      </AuthProvider>
    </Router>
  )
}

export default App
