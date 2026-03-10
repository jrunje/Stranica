import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";
import Nav from "./components/Nav";
import Naslovnica from "./pages/Naslovnica";
import Footer from "./components/Footer";
import Vozila from "./pages/Vozila";
import VoziloSingle from "./pages/VoziloSingle";

function App() {
  return (
    <BrowserRouter basename={'/jrunje'}>
      <Nav />
      <Routes>
        <Route path="/" element={<Naslovnica />} />
        <Route path="/vozila" element={<Vozila />} />
        <Route path="/vozila/:slug" element={<VoziloSingle />} />
    
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;

