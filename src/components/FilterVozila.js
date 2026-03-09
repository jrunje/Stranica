import React from 'react';

const FilterVozila = () => {
  return (
    <div className="container filter-container">
      <div className="card shadow-lg border-0 bg-white p-4 filter-card">
        <div className="row g-3 align-items-end">
          {/* Marka vozila */}
          <div className="col-md-3">
            <label className="small fw-bold text-muted mb-2 text-uppercase">Marka vozila</label>
            <select className="form-select border-light-subtle py-2">
              <option value="">Sve marke</option>
              <option value="audi">Audi</option>
              <option value="bmw">BMW</option>
              <option value="mercedes">Mercedes-Benz</option>
              <option value="vw">Volkswagen</option>
            </select>
          </div>

          {/* Model vozila */}
          <div className="col-md-3">
            <label className="small fw-bold text-muted mb-2 text-uppercase">Model vozila</label>
            <select className="form-select border-light-subtle py-2">
              <option value="">Svi modeli</option>
            </select>
          </div>

          {/* Kilometraža ili Cijena */}
          <div className="col-md-2">
            <label className="small fw-bold text-muted mb-2 text-uppercase">Cijena do (€)</label>
            <input 
              type="number" 
              className="form-control border-light-subtle py-2" 
              placeholder="Eura..." 
            />
          </div>

          {/* Godina proizvodnje */}
          <div className="col-md-2">
            <label className="small fw-bold text-muted mb-2 text-uppercase">Godina</label>
            <select className="form-select border-light-subtle py-2">
              <option value="">Bilo koja</option>
              <option value="2023">2023</option>
              <option value="2022">2022</option>
              <option value="2021">2021</option>
              <option value="2020">2020</option>
            </select>
          </div>

          {/* Gumb za pretraživanje */}
          {/* Gumb za pretraživanje - koristimo iste klase kao na Hero-u */}
<div className="col-md-2 text-end">
  <button className="btn btn-warning w-100 py-2 fw-bold text-uppercase hero-btn d-flex align-items-center justify-content-center border-0">
    <i className="bi bi-search me-2"></i> Pretraži
  </button>
</div>
        </div>
      </div>
    </div>
  );
};

export default FilterVozila;