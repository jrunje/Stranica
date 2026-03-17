import React from 'react';
import { Link } from 'react-router-dom'; // 1. Dodajemo Link import
import slikaUvoz from '../img/uvoz-vozila.jpg';
import slikaOtkup from '../img/otkup-vozila.jpg';

const DodatneUsluge = () => {
  return (
    <div className="dodatne-usluge-section py-5 bg-white text-dark">
      <div className="container py-4">
        <h2 className="text-center text-uppercase mb-5 letter-spacing-2 fw-bold">
          Dodatne <span className="text-gold">Usluge</span>
        </h2>

        <div className="row g-5"> 
          
          {/* 1. Uvoz Vozila - cijela kartica je sada link */}
          <div className="col-md-6">
            <Link to="/uvoz-vozila" className="text-decoration-none text-dark">
              <div className="usluga-card h-100 border-0 shadow-sm">
                <div className="usluga-img-wrapper">
                  <img 
                    src={slikaUvoz} 
                    alt="Uvoz vozila po narudžbi" 
                    className="usluga-img"
                  />
                </div>
                <div className="usluga-body p-4 bg-light">
                  <h4 className="fw-bold mb-3 text-uppercase">Uvoz vozila po narudžbi</h4>
                  <p className="text-secondary mb-0">
                    Pronaći ćemo vaše idealno vozilo na europskom tržištu prema vašim točnim specifikacijama, slušajući svaku vašu želju.
                  </p>
                </div>
              </div>
            </Link>
          </div>

          {/* 2. Otkup Vozila - cijela kartica je sada link */}
          <div className="col-md-6">
            <Link to="/otkup-vozila" className="text-decoration-none text-dark">
              <div className="usluga-card h-100 border-0 shadow-sm">
                <div className="usluga-img-wrapper">
                  <img 
                    src={slikaOtkup} 
                    alt="Otkup i zamjena vozila" 
                    className="usluga-img"
                  />
                </div>
                <div className="usluga-body p-4 bg-light">
                  <h4 className="fw-bold mb-3 text-uppercase">Otkup i Zamjena vozila</h4>
                  <p className="text-secondary mb-0">
                    Nudimo siguran otkup vašeg starog vozila ili mogućnost zamjene za novo, uz poštenu procjenu i umanjenje cijene.
                  </p>
                </div>
              </div>
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
};

export default DodatneUsluge;