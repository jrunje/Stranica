import { useEffect, useState, useMemo } from "react"; // Dodan useMemo
import { useLocation } from "react-router-dom";
import Loader from "../components/Loader";
import ReactPaginate from "react-paginate";
// Maknut import ScrollToTop jer smo ga stavili u App.js da radi automatski
import { Helmet } from "react-helmet-async";
import VehicleCard from "../components/VehicleCard";
import "./Vozila.css";

const BASE_URL = process.env.REACT_APP_API_URL;

const Vozila = () => {
  const location = useLocation();
  
  // POPRAVAK: QueryParams definiramo unutar useMemo da izbjegnemo "initialization" greške
  const queryParams = useMemo(() => new URLSearchParams(location.search), [location.search]);

  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);

  // Taksonomije
  const [marke, setMarke] = useState([]);
  const [modeli, setModeli] = useState([]);
  const [mjenjaci, setMjenjaci] = useState([]);
  const [motori, setMotori] = useState([]);
  const [boje, setBoje] = useState([]);
  const [kategorijeVozila, setKategorijeVozila] = useState([]);

  const [statusFilter, setStatusFilter] = useState("all");

  // Filteri
  const [filters, setFilters] = useState({
    marka: queryParams.get("marka") || "",
    "model-vozila": queryParams.get("model") || "",
    mjenjac: "",
    "vrsta-motora": "",
    boja: "",
    maxCijena: queryParams.get("cijena") || "",
    maxKm: "",
    godinaOd: queryParams.get("godina") || "",
    maxSnaga: ""
  });

  // Dohvat opcija za filtere
  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const [resMarka, resModel, resMjenjac, resMotor, resBoja, resKat] = await Promise.all([
          fetch(`${BASE_URL}marka`),
          fetch(`${BASE_URL}model-vozila`),
          fetch(`${BASE_URL}mjenjac`),
          fetch(`${BASE_URL}vrsta-motora`),
          fetch(`${BASE_URL}boja`),
          fetch(`${BASE_URL}kategorija-vozila`)
        ]);

        setMarke(await resMarka.json());
        setModeli(await resModel.json());
        setMjenjaci(await resMjenjac.json());
        setMotori(await resMotor.json());
        setBoje(await resBoja.json());
        setKategorijeVozila(await resKat.json());
      } catch (err) {
        console.error("Greška pri dohvatu opcija:", err);
      }
    };
    fetchOptions();
  }, []);

  // Dohvat vozila
  useEffect(() => {
    setLoading(true);
    fetch(`${BASE_URL}vozila?_embed&per_page=100`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setVehicles(data);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
    setCurrentPage(0);
  };

  const resetFilters = () => {
    setFilters({
      marka: "",
      "model-vozila": "",
      mjenjac: "",
      "vrsta-motora": "",
      boja: "",
      maxCijena: "",
      maxKm: "",
      godinaOd: "",
      maxSnaga: ""
    });
    setStatusFilter("all");
    setCurrentPage(0);
  };

  const akcijaKat = kategorijeVozila.find(k => k.slug === "akcija");

  const filteredVehicles = vehicles.filter(v => {
    const { acf } = v;
    if (!acf) return false; // Sigurnosna provjera ako ACF fali
    
    const matchStatus = statusFilter === "all" || v["kategorija-vozila"]?.includes(akcijaKat?.id);
    const matchMarka = !filters.marka || v.marka?.includes(parseInt(filters.marka));
    const matchModel = !filters["model-vozila"] || v["model-vozila"]?.includes(parseInt(filters["model-vozila"]));
    const matchMjenjac = !filters.mjenjac || v.mjenjac?.includes(parseInt(filters.mjenjac));
    const matchMotor = !filters["vrsta-motora"] || v["vrsta-motora"]?.includes(parseInt(filters["vrsta-motora"]));
    const matchBoja = !filters.boja || v.boja?.includes(parseInt(filters.boja));

    const matchCijena = !filters.maxCijena || parseInt(acf.cijena) <= parseInt(filters.maxCijena);
    const matchKm = !filters.maxKm || parseInt(acf.kilometraza) <= parseInt(filters.maxKm);
    const matchGodina = !filters.godinaOd || parseInt(acf.godina) >= parseInt(filters.godinaOd);
    const matchSnaga = !filters.maxSnaga || parseInt(acf.snaga_motora) <= parseInt(filters.maxSnaga);

    return matchStatus && matchMarka && matchModel && matchMjenjac && matchMotor && matchBoja && matchCijena && matchKm && matchGodina && matchSnaga;
  });

  const pageCount = Math.ceil(filteredVehicles.length / 6);

  // Funkcija za skok na vrh prilikom paginacije (smooth)
  const handlePageChange = (e) => {
    setCurrentPage(e.selected);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="vozila-page-wrapper bg-black">
      <Helmet><title>Ponuda Vozila | Runje Automobili</title></Helmet>
      {loading && <Loader />}
      
      <div className="container py-5">
        <h1 className="main-title text-white mb-5">NAŠA PONUDA</h1>

        <div className="row mb-4">
          <div className="col-12">
            <div className="status-toggle-container">
              <button 
                className={`status-btn ${statusFilter === 'all' ? 'active' : ''}`}
                onClick={() => { setStatusFilter("all"); setCurrentPage(0); }}
              >
                SVA VOZILA
              </button>
              <button 
                className={`status-btn ${statusFilter !== 'all' ? 'active' : ''}`}
                onClick={() => { setStatusFilter(akcijaKat?.id || "akcija"); setCurrentPage(0); }}
              >
                VOZILA NA AKCIJI
              </button>
            </div>
          </div>
        </div>
        
        <div className="row">
          <div className="col-lg-3">
            <aside className="filter-sidebar p-4 text-white">
              <h5 className="text-warning fw-bold mb-4">PRETRAGA</h5>
              
              <div className="mb-3">
                <label className="filter-label">Marka</label>
                <select name="marka" className="form-select custom-select" value={filters.marka} onChange={handleInputChange}>
                  <option value="">Sve marke</option>
                  {marke.map(m => <option key={m.id} value={m.id}>{m.name}</option>)}
                </select>
              </div>

              <div className="mb-3">
                <label className="filter-label">Model</label>
                <select name="model-vozila" className="form-select custom-select" value={filters["model-vozila"]} onChange={handleInputChange}>
                  <option value="">Svi modeli</option>
                  {modeli.map(m => <option key={m.id} value={m.id}>{m.name}</option>)}
                </select>
              </div>

              <div className="mb-3">
                <label className="filter-label">Mjenjač</label>
                <select name="mjenjac" className="form-select custom-select" value={filters.mjenjac} onChange={handleInputChange}>
                  <option value="">Svi tipovi</option>
                  {mjenjaci.map(m => <option key={m.id} value={m.id}>{m.name}</option>)}
                </select>
              </div>

              <div className="mb-3">
                <label className="filter-label">Motor</label>
                <select name="vrsta-motora" className="form-select custom-select" value={filters["vrsta-motora"]} onChange={handleInputChange}>
                  <option value="">Svi motori</option>
                  {motori.map(m => <option key={m.id} value={m.id}>{m.name}</option>)}
                </select>
              </div>

              <div className="mb-3">
                <label className="filter-label">Boja</label>
                <select name="boja" className="form-select custom-select" value={filters.boja} onChange={handleInputChange}>
                  <option value="">Sve boje</option>
                  {boje.map(b => <option key={b.id} value={b.id}>{b.name}</option>)}
                </select>
              </div>

              <div className="mb-3">
                <label className="filter-label">Maksimalna cijena (€)</label>
                <input name="maxCijena" type="number" className="form-control custom-select" placeholder="npr. 20000" value={filters.maxCijena} onChange={handleInputChange} />
              </div>

              <div className="mb-3">
                <label className="filter-label">Kilometraža do (km)</label>
                <input name="maxKm" type="number" className="form-control custom-select" placeholder="npr. 150000" value={filters.maxKm} onChange={handleInputChange} />
              </div>

              <div className="row g-2 mb-3">
                <div className="col-6">
                  <label className="filter-label">Godina od</label>
                  <input name="godinaOd" type="number" className="form-control custom-select" placeholder="2015" value={filters.godinaOd} onChange={handleInputChange} />
                </div>
                <div className="col-6">
                  <label className="filter-label">Snaga do (KS)</label>
                  <input name="maxSnaga" type="number" className="form-control custom-select" placeholder="150" value={filters.maxSnaga} onChange={handleInputChange} />
                </div>
              </div>

              <button className="btn btn-outline-light w-100 fw-bold mt-3" onClick={resetFilters} style={{ borderColor: '#333', fontSize: '0.9rem' }}>
                RESETIRAJ FILTERE
              </button>
            </aside>
          </div>

          <div className="col-lg-9">
            <div className="row g-4">
              {filteredVehicles.length > 0 ? (
                filteredVehicles.slice(currentPage * 6, (currentPage + 1) * 6).map(v => (
                  <VehicleCard key={v.id} vehicle={v} />
                ))
              ) : (
                <div className="col-12 text-center py-5">
                  <h4 className="text-white opacity-50">Nema pronađenih vozila.</h4>
                </div>
              )}
            </div>

            {pageCount > 1 && (
              <ReactPaginate 
                previousLabel={"←"}
                nextLabel={"→"}
                pageCount={pageCount}
                onPageChange={handlePageChange}
                containerClassName={"pagination-custom"}
                activeClassName={"active"}
                forcePage={currentPage}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Vozila;