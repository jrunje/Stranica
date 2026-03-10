import { useEffect, useState } from "react";
import Loader from "../components/Loader";
import ReactPaginate from "react-paginate";
import ScrollToTop from "../components/ScrollToTop";
import { Helmet } from "react-helmet-async";
import VehicleCard from "../components/VehicleCard";
import "./Vozila.css";

const BASE_URL = process.env.REACT_APP_API_URL;

const Vozila = () => {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageCount, setPageCount] = useState(0);

  // Stanja za opcije u filterima - koristimo tvoje točne nazive
  const [marke, setMarke] = useState([]);
  const [modeli, setModeli] = useState([]);
  const [mjenjac, setMjenjac] = useState([]); // Ispravljeno: jednina
  const [motori, setMotori] = useState([]);
  const [boje, setBoje] = useState([]);

  useEffect(() => {
    // Dohvat taksonomija s točnim slugovima iz tvog API-ja
    const fetchOptions = async () => {
      try {
        const [resMarka, resModel, resMjenjac, resMotor, resBoja] = await Promise.all([
          fetch(`${BASE_URL}marka`),
          fetch(`${BASE_URL}model-vozila`),
          fetch(`${BASE_URL}mjenjac`), // Tvoj točan naziv
          fetch(`${BASE_URL}vrsta-motora`),
          fetch(`${BASE_URL}boja`)
        ]);

        setMarke(await resMarka.json());
        setModeli(await resModel.json());
        setMjenjac(await resMjenjac.json());
        setMotori(await resMotor.json());
        setBoje(await resBoja.json());
      } catch (err) {
        console.error("Greška pri dohvatu filtera:", err);
      }
    };
    fetchOptions();
  }, []);

  useEffect(() => {
    setLoading(true);
    fetch(`${BASE_URL}vozila?_embed&per_page=100`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setVehicles(data);
          setPageCount(Math.ceil(data.length / 6));
        }
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="vozila-page-wrapper bg-black">
      <Helmet><title>Ponuda Vozila | Runje Automobili</title></Helmet>
      {loading && <Loader />}
      
      <div className="container py-5">
        <h1 className="main-title text-white mb-5">NAŠA PONUDA</h1>
        
        <div className="row">
          {/* FILTERI LIJEVO */}
          <div className="col-lg-3">
            <aside className="filter-sidebar p-4 rounded bg-dark border border-secondary text-white">
              <h5 className="text-warning fw-bold mb-4">PRETRAGA</h5>
              
              <div className="mb-3">
                <label className="filter-label">Marka</label>
                <select className="form-select custom-select">
                  <option value="">Sve marke</option>
                  {Array.isArray(marke) && marke.map(m => <option key={m.id} value={m.id}>{m.name}</option>)}
                </select>
              </div>

              <div className="mb-3">
                <label className="filter-label">Model</label>
                <select className="form-select custom-select">
                  <option value="">Svi modeli</option>
                  {Array.isArray(modeli) && modeli.map(m => <option key={m.id} value={m.id}>{m.name}</option>)}
                </select>
              </div>

              <div className="mb-3">
                <label className="filter-label">Mjenjač</label>
                <select className="form-select custom-select">
                  <option value="">Svi tipovi</option>
                  {Array.isArray(mjenjac) && mjenjac.map(m => <option key={m.id} value={m.id}>{m.name}</option>)}
                </select>
              </div>

              <div className="mb-3">
                <label className="filter-label">Motor</label>
                <select className="form-select custom-select">
                  <option value="">Svi motori</option>
                  {Array.isArray(motori) && motori.map(m => <option key={m.id} value={m.id}>{m.name}</option>)}
                </select>
              </div>

              <div className="mb-3">
                <label className="filter-label">Boja</label>
                <select className="form-select custom-select">
                  <option value="">Sve boje</option>
                  {Array.isArray(boje) && boje.map(b => <option key={b.id} value={b.id}>{b.name}</option>)}
                </select>
              </div>

  
  <div className="mb-3">
    <label className="filter-label">Maksimalna cijena (€)</label>
    <input type="number" className="form-control custom-select" placeholder="npr. 20000" />
  </div>

  <div className="mb-3">
    <label className="filter-label">Kilometraža do (km)</label>
    <input type="number" className="form-control custom-select" placeholder="npr. 150000" />
  </div>

  <div className="row g-2 mb-3">
    <div className="col-6">
      <label className="filter-label">Godina od</label>
      <input type="number" className="form-control custom-select" placeholder="2015" />
    </div>
    <div className="col-6">
      <label className="filter-label">Snaga do (KS)</label>
      <input type="number" className="form-control custom-select" placeholder="150" />
    </div>
  </div>

  <button className="btn btn-warning w-100 fw-bold mt-3">FILTRIRAJ</button>
</aside>

            
          </div>

          {/* VOZILA DESNO */}
          <div className="col-lg-9">
            <div className="row g-4">
              {vehicles.slice(currentPage * 6, (currentPage + 1) * 6).map(v => (
                <VehicleCard key={v.id} vehicle={v} />
              ))}
            </div>

            <ReactPaginate 
              previousLabel={"←"}
              nextLabel={"→"}
              pageCount={pageCount}
              onPageChange={(e) => { setCurrentPage(e.selected); ScrollToTop(); }}
              containerClassName={"pagination-custom"}
              activeClassName={"active"}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Vozila;