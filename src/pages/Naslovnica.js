import { useState, useEffect } from "react";
import Loader from "../components/Loader";
import HeroSection from "../components/HeroSection";
import FilterVozila from "../components/FilterVozila";
import VozilaSwiper from "../components/VozilaSwiper";
import DodatneUsluge from '../components/DodatneUsluge';
import PovjerenjeSection from '../components/PovjerenjeSection';
import KontaktMapaSection from '../components/KontaktMapaSection';

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

      <DodatneUsluge />
      <PovjerenjeSection /> 
      <KontaktMapaSection /> 

  
      

    </div>
  );
};

export default Naslovnica;