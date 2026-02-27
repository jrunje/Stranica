import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";
import Nav from "./components/Nav";
import Naslovnica from "./pages/Naslovnica";
import Footer from "./components/Footer";


function App() {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/" element={<Naslovnica />} />
        
        

      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;

