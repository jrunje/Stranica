import { useState, useEffect } from "react";
import Loader from "../components/Loader";
import HeroSection from "../components/HeroSection";
import FilterVozila from "../components/FilterVozila";
import VozilaSwiper from "../components/VozilaSwiper";

const BASE_URL = process.env.REACT_APP_API_URL;

const Naslovnica = () => {
  const [vozila, setVozila] = useState(null);

  useEffect(() => {
    const fetchVozila = async () => {
      try {
        // Dohvaćamo vozila s _embed parametrom zbog slika
        const response = await fetch(`${BASE_URL}vozila?_embed`);
        if (!response.ok) {
          throw new Error('Ne mogu povući podatke');
        }
        const data = await response.json();
        setVozila(data);
      } catch (err) {
        console.log("Greška:", err.message);
      }
    };
    fetchVozila();
  }, []);

  // Dok se podaci učitavaju, prikazujemo tvoju Loader komponentu
  if (!vozila) return <Loader />;

  return (
    <div className="bg-black min-vh-100">
      
      {/* 1. HERO SECTION */}
      {/* Koristimo sliku prvog vozila iz niza kao pozadinu, ili fallback ako niz nekim čudom bude prazan */}
      <HeroSection 
        stranica={vozila[0]} 
        fallback="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=1920&auto=format&fit=crop" 
      />

      {/* 2. FILTER VOZILA */}
      {/* Ova komponenta se u CSS-u podiže prema gore pomoću negativne margine */}
      <FilterVozila />

      {/* 3. IZDVOJENA VOZILA (SWIPER) */}
      {/* Umjesto klasične mreže (row/col), sada koristimo moderan vrtuljak */}
      <div className="py-5">
        <VozilaSwiper vozila={vozila} />
      </div>

      {/* 4. DODATNI PROSTOR DO FOOTERA */}
      <div className="py-5">
        <div className="container text-center">
          <hr className="text-secondary opacity-25" />
          <p className="text-muted small mt-5 text-uppercase letter-spacing-2">
            Runje Automobili — Vaš partner u odabiru najboljih vozila
          </p>
        </div>
      </div>

    </div>
  );
};

export default Naslovnica;