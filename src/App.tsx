/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Events from "./pages/Events";
import Community from "./pages/Community";
import Artists from "./pages/Artists";
import Gallery from "./pages/Gallery";
import Partners from "./pages/Partners";
import About from "./pages/About";
import Contact from "./pages/Contact";

import Mansion from "./pages/Mansion";

import EventDetails from "./pages/EventDetails";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen bg-neutral-950 text-white font-sans selection:bg-neon-pink selection:text-white">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/mansion" element={<Mansion />} />
            <Route path="/events" element={<Events />} />
            <Route path="/events/details" element={<EventDetails />} />
            <Route path="/events/:id" element={<EventDetails />} />
            <Route path="/community" element={<Community />} />
            <Route path="/artists" element={<Artists />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/partners" element={<Partners />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}
