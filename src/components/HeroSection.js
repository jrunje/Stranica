import React from 'react';
import { Link } from 'react-router-dom';

const HeroSection = ({ stranica, fallback, tip }) => {
  // Logika za sliku: prioritet ima Featured Image iz WP-a, inače fallback
  const selectedImg =
    stranica?._embedded?.["wp:featuredmedia"]?.[0]?.source_url || fallback;

  // Provjeravamo je li ovo stranica tipa 'jamstvo' ili 'single' da prilagodimo sadržaj
  const isSimpleHero = tip === 'jamstvo' || tip === 'single' || tip === 'o-nama';

  return (
    <section 
      className={`hero-section d-flex align-items-center ${isSimpleHero ? 'simple-hero' : ''}`}
      style={{ '--bg-image': `url(${selectedImg})` }}
    >
      <div className="container">
        <div className="row">
          <div className="col-lg-10 text-white">
            {/* Naslov: Uzima ACF naslov, ili WP naslov stranice, ili default */}
            <h1 className="display-3 fw-bold mb-3">
              {stranica?.acf?.naslov || stranica?.title?.rendered || "Standard koji zaslužujete."}
            </h1>
            
            {/* Podnaslov i Gumb se prikazuju samo ako NIJE simple hero (npr. na naslovnici) */}
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