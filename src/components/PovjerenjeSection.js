import React from 'react';

const PovjerenjeSection = () => {
  return (
    <div className="povjerenje-section py-5 bg-black text-white border-top border-gold-subtle">
      <div className="container py-4">
        <div className="row g-4 text-center">
          {/* Jamstvo */}
          <div className="col-md-4">
            <i className="bi bi-shield-check text-gold fs-1 mb-3"></i>
            <h4 className="fw-bold text-uppercase">Jamstvo do 12 mj.</h4>
            <p className="small text-muted">Naša vozila prolaze stroge kontrole, a uz svaku kupnju nudimo jamstvo na kvalitetu do 12 mjeseci.</p>
          </div>
          {/* Kvaliteta */}
          <div className="col-md-4">
            <i className="bi bi-star-fill text-gold fs-1 mb-3"></i>
            <h4 className="fw-bold text-uppercase">Provjerena kvaliteta</h4>
            <p className="small text-muted">Svako vozilo u našem salonu je detaljno pregledano i servisirano prije same prodaje.</p>
          </div>
          {/* Tradicija */}
          <div className="col-md-4">
            <i className="bi bi-people-fill text-gold fs-1 mb-3"></i>
            <h4 className="fw-bold text-uppercase">Osobni pristup</h4>
            <p className="small text-muted">Dugogodišnje iskustvo i tisuće zadovoljnih klijenata garancija su vaše sigurne kupnje.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PovjerenjeSection;