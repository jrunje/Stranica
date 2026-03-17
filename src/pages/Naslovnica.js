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
  const [pageData, setPageData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 1. Dohvaćamo vozila za swiper
        const vozilaRes = await fetch(`${BASE_URL}vozila?_embed`);
        const vozilaData = await vozilaRes.json();
        setVozila(vozilaData);

        // 2. Dohvaćamo podatke o naslovnici
        const pageRes = await fetch(`${BASE_URL}pages/126?_embed&acf_format=standard`);
        const pageDataJson = await pageRes.json();
        setPageData(pageDataJson);

        setLoading(false);
      } catch (err) {
        console.error("Greška pri dohvatu podataka:", err.message);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading || !vozila) return <Loader />;

  return (
    <div className="bg-black min-vh-100 naslovnica-wrapper">
      <div className="hero-filter-container" style={{ position: 'relative' }}>
        
        {/* HeroSection*/}
        <HeroSection 
          tip="home"
          stranica={{
            ...pageData,
            title: { rendered: "" }
          }}
          fallback="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=1920&auto=format&fit=crop" 
        />

        {/* Filter apsolutno pozicioniran na dno Heroja */}
        <div className="filter-absolute-wrapper">
          <FilterVozila />
        </div>
      </div>

      {/* IZDVOJENA VOZILA */}
      <div className="py-5 swiper-section-top">
        <VozilaSwiper vozila={vozila} />
      </div>

      <DodatneUsluge />
      <PovjerenjeSection /> 
      <KontaktMapaSection /> 

    </div>
  );
};

export default Naslovnica;