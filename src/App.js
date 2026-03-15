import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";
import Nav from "./components/Nav";
import Naslovnica from "./pages/Naslovnica";
import Footer from "./components/Footer";
import Vozila from "./pages/Vozila";
import VoziloSingle from "./pages/VoziloSingle"; 
import Jamstvo from "./pages/Jamstvo";
import ONama from "./pages/ONama";
import Kontakt from "./pages/Kontakt";
import UvozVozila from "./pages/UvozVozila";
import OtkupVozila from "./pages/OtkupVozila";
import Novosti from "./pages/Novosti"; 
import NovostiSingle from "./pages/NovostiSingle";

function App() {
  return (
    <BrowserRouter basename={'/jrunje'}>
      <Nav />
      <Routes>
        <Route path="/" element={<Naslovnica />} />
        <Route path="/kontakt" element={<Kontakt />} />
        <Route path="/vozila" element={<Vozila />} />
        <Route path="/vozila/:slug" element={<VoziloSingle />} />
        <Route path="/jamstvo" element={<Jamstvo />} />
        <Route path="/o-nama" element={<ONama />} />
        <Route path="/uvoz-vozila" element={<UvozVozila />} />
        <Route path="/otkup-vozila" element={<OtkupVozila />} />
        <Route path="/novosti" element={<Novosti />} />
        <Route path="/novosti/:slug" element={<NovostiSingle />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;

