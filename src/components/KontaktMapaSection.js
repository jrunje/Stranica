import React from 'react';

const KontaktMapaSection = () => {
  return (
    <div className="kontakt-mapa-section py-5 bg-white text-dark">
      <div className="container">
        <div className="row g-0 align-items-stretch shadow-sm rounded-4 overflow-hidden border">
          {/* Lijeva strana: Info */}
          <div className="col-md-5 p-5 d-flex flex-column justify-content-center">
            <h2 className="display-5 fw-bold mb-4">Posjetite nas</h2>
            
            <div className="mb-4">
              {/* Novi podnaslov umjesto broja mobitela */}
              <h5 className="text-gold fw-bold mb-3 text-uppercase letter-spacing-1">
                Radno vrijeme:
              </h5>
              
              <div className="radno-vrijeme">
                <div className="d-flex justify-content-between border-bottom py-2">
                  <span>Ponedjeljak</span>
                  <span className="fw-bold">9h – 17h</span>
                </div>
                <div className="d-flex justify-content-between border-bottom py-2">
                  <span>Utorak</span>
                  <span className="fw-bold">9h – 17h</span>
                </div>
                <div className="d-flex justify-content-between border-bottom py-2">
                  <span>Srijeda</span>
                  <span className="fw-bold">9h – 17h</span>
                </div>
                <div className="d-flex justify-content-between border-bottom py-2">
                  <span>Četvrtak</span>
                  <span className="fw-bold">9h – 17h</span>
                </div>
                <div className="d-flex justify-content-between border-bottom py-2">
                  <span>Petak</span>
                  <span className="fw-bold">9h – 17h</span>
                </div>
                <div className="d-flex justify-content-between border-bottom py-2">
                  <span>Subota</span>
                  <span className="fw-bold">9h – 14h</span>
                </div>
                <div className="d-flex justify-content-between py-2 text-danger fw-bold">
                  <span>Nedjelja</span>
                  <span className="text-uppercase">Zatvoreno</span>
                </div>
              </div>
            </div>

            {/* Lokacija ostaje ispod, kao dodatna informacija */}
            <p className="text-muted small mt-3">
              <i className="bi bi-geo-alt-fill text-gold me-2"></i> 
              Koludrovac 8, Kaštel Štafilić
            </p>
          </div>

          {/* Desna strana: Mapa */}
          <div className="col-md-7" style={{ minHeight: '450px' }}>
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2891.9763!2d16.3456!3d43.5512!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDPCsDMzJzA0LjMiTiAxNsKwMjAnNDQuMiJF!5e0!3m2!1shr!2shr!4v1710000000000!5m2!1shr!2shr" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen="" 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KontaktMapaSection;