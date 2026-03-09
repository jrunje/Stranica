import React from 'react';
import { Link } from 'react-router-dom';


const HeroSection = ({ stranica, fallback }) => {
  // Logika za sliku s predavanja
  const selectedImg =
    stranica?._embedded?.["wp:featuredmedia"]?.[0]?.source_url || fallback;

  return (
    <section 
      className="hero-section d-flex align-items-center"
      style={{ '--bg-image': `url(${selectedImg})` }} // Samo prosljeđujemo putanju slike
    >
      <div className="container">
        <div className="row">
          <div className="col-lg-7 text-white">
            <h1 className="display-3 fw-bold mb-3">
              {stranica?.acf?.naslov || "Standard koji zaslužujete."}
            </h1>
            <p className="fs-4 mb-4 hero-subtitle">
              Runje Automobili — Bez kompromisa u kvaliteti.
            </p>
            <Link to="/vozila" className="btn btn-warning btn-lg hero-btn">
               <i className="bi bi-chevron-double-right me-2"></i> Pogledaj ponudu
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;