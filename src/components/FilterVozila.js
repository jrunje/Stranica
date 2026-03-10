import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const BASE_URL = process.env.REACT_APP_API_URL;

const FilterVozila = () => {
  const navigate = useNavigate();
  
  const [marke, setMarke] = useState([]);
  const [modeli, setModeli] = useState([]);
  
  const [selectedMarka, setSelectedMarka] = useState("");
  const [selectedModel, setSelectedModel] = useState("");
  const [selectedCijena, setSelectedCijena] = useState("");
  const [selectedGodina, setSelectedGodina] = useState("");

  useEffect(() => {
    // 1. Dohvat MARKI - koristimo samo naziv jer je v2 već u BASE_URL
    fetch(`${BASE_URL}marka`) 
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setMarke(data);
      })
      .catch(err => console.error("Greška marke:", err));

    // 2. Dohvat MODELA
    fetch(`${BASE_URL}model-vozila`) 
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setModeli(data);
      })
      .catch(err => console.error("Greška modeli:", err));
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/vozila?marka=${selectedMarka}&model=${selectedModel}&cijena=${selectedCijena}&godina=${selectedGodina}`);
  };

  return (
    <div className="container filter-container">
      <div className="card shadow-lg border-0 bg-white p-4 filter-card">
        <form onSubmit={handleSearch} className="row g-3 align-items-end">
          
          <div className="col-md-2">
            <label className="small fw-bold text-muted mb-2 text-uppercase">Marka vozila</label>
            <select 
              className="form-select border-light-subtle py-2"
              value={selectedMarka}
              onChange={(e) => setSelectedMarka(e.target.value)}
            >
              <option value="">Sve marke</option>
              {marke.map((m) => (
                <option key={m.id} value={m.id}>{m.name}</option>
              ))}
            </select>
          </div>

          <div className="col-md-2">
            <label className="small fw-bold text-muted mb-2 text-uppercase">Model vozila</label>
            <select 
              className="form-select border-light-subtle py-2"
              value={selectedModel}
              onChange={(e) => setSelectedModel(e.target.value)}
            >
              <option value="">Svi modeli</option>
              {modeli.map((mod) => (
                <option key={mod.id} value={mod.id}>{mod.name}</option>
              ))}
            </select>
          </div>

          <div className="col-md-2">
            <label className="small fw-bold text-muted mb-2 text-uppercase">Cijena do (€)</label>
            <input 
              type="number" 
              className="form-control border-light-subtle py-2" 
              placeholder="Eura..."
              value={selectedCijena}
              onChange={(e) => setSelectedCijena(e.target.value)}
            />
          </div>

          {/* GODINA */}
          <div className="col-md-2">
            <label className="small fw-bold text-muted mb-2 text-uppercase">Godina</label>
            <select 
              className="form-select border-light-subtle py-2"
              value={selectedGodina}
              onChange={(e) => setSelectedGodina(e.target.value)}
            >
              <option value="">Bilo koja</option>
              <option value="2024">2024</option>
              <option value="2023">2023</option>
              <option value="2022">2022</option>
              <option value="2021">2021</option>
              <option value="2020">2020</option>
            </select>
          </div>

          <div className="col-md-2 text-end">
            <button type="submit" className="btn btn-warning w-100 py-2 fw-bold text-uppercase border-0">
               Pretraži
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FilterVozila;