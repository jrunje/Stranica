import React from 'react';
import { Link } from 'react-router-dom';

const HeroSection = ({ stranica, fallback, tip }) => {
  // dohvat slike
  // Provjeravamo embedded (WP Featured Image), pa ACF polje ako postoji, pa fallback
  const wpImg = stranica?._embedded?.["wp:featuredmedia"]?.[0]?.source_url;
  const acfImg = stranica?.acf?.hero_image; 
  
  // Ako je sve prazno, koristi ovaj default (
  const selectedImg = wpImg || acfImg || fallback || "https://placehold.co/1200x800";

  // Provjera tipa stranice
  const isSimpleHero = tip === 'jamstvo' || tip === 'single' || tip === 'o-nama';

  // Dinamički stilovi ovisno o tipu heroja
  const sectionStyle = {
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${selectedImg})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    width: '100%',
    //  dajemo mu barem 400px visine da se slika vidi
    minHeight: isSimpleHero ? '400px' : '85vh',
    display: 'flex',
    alignItems: 'center',
    position: 'relative'
  };

  return (
    <section 
      className={`hero-section ${isSimpleHero ? 'simple-hero' : ''}`}
      style={sectionStyle}
    >
      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <div className="row">
          <div className="col-lg-10 text-white">
            
            {/* Naslov: Prioritet ima ACF naslov, pa WP naslov, pa default */}
            <h1 className="display-3 fw-bold mb-3">
              {!isSimpleHero 
                ? "Standard koji zaslužujete." // Naslovnica
                : (stranica?.acf?.naslov || stranica?.title?.rendered || "Runje Automobili") 
              }
            </h1>
            
            {/* Podnaslov i Gumb*/}
            {!isSimpleHero && (
              <>
                <p className="fs-4 mb-4 hero-subtitle">
                  Runje Automobili — Bez kompromisa u kvaliteti.
                </p>
                <Link to="/vozila" className="btn btn-warning btn-lg hero-btn">
                  <i className="bi bi-chevron-double-right me-2"></i> Pogledaj ponudu
                </Link>
              </>
            )}
            
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;