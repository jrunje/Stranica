import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Loader from "../components/Loader";
import Yoast from "../components/Yoast";

const BASE_URL = process.env.REACT_APP_API_URL;

const VoziloSingle = () => {
  const { slug } = useParams();
  const [vozilo, setVozilo] = useState(null);

  useEffect(() => {
    // Dohvaćamo specifično vozilo preko sluga uz _embed za slike
    fetch(`${BASE_URL}vozila?slug=${slug}&_embed`)
      .then((response) => response.json())
      .then((data) => setVozilo(data[0]));
  }, [slug]);

  if (!vozilo) return <Loader />;

  // Izvlačimo ACF polja radi lakšeg korištenja
  const { cijena, kilometraza, godina, snaga_motora, slika1, slika2, slika3, slika4 } = vozilo.acf;

  return (
    <>
      <Yoast yoastHeadJson={vozilo.yoast_head_json} />
      
      <div className="bg-black text-white min-vh-100 mt-5 pt-5">
        <div className="container">
          <div className="row">
            
            {/* 1. GALERIJA SLIKA (Lijeva strana) */}
            <div className="col-lg-8">
              <img 
                src={vozilo._embedded["wp:featuredmedia"][0].source_url} 
                className="img-fluid rounded shadow-lg mb-3 w-100" 
                alt={vozilo.title.rendered} 
              />
              <div className="row g-2">
                {/* Prikazujemo dodatne slike iz ACF-a ako postoje */}
                {[slika1, slika2, slika3, slika4].map((img, index) => img && (
                  <div key={index} className="col-3">
                    <img src={img} className="img-fluid rounded shadow-sm" alt={`Galerija ${index}`} />
                  </div>
                ))}
              </div>
            </div>

            {/* 2. INFORMACIJE O VOZILU (Desna strana) */}
            <div className="col-lg-4">
              <div className="card bg-dark text-white p-4 border-0 shadow">
                <h1 className="fw-bold text-uppercase mb-3">{vozilo.title.rendered}</h1>
                <div className="h2 text-warning fw-bold mb-4">{cijena} €</div>
                
                <ul className="list-unstyled">
                  <li className="mb-2 pb-2 border-bottom border-secondary d-flex justify-content-between">
                    <span className="text-muted">Godina:</span> <strong>{godina}.</strong>
                  </li>
                  <li className="mb-2 pb-2 border-bottom border-secondary d-flex justify-content-between">
                    <span className="text-muted">Kilometraža:</span> <strong>{kilometraza} km</strong>
                  </li>
                  <li className="mb-2 pb-2 border-bottom border-secondary d-flex justify-content-between">
                    <span className="text-muted">Snaga:</span> <strong>{snaga_motora}</strong>
                  </li>
                </ul>

                <button className="btn btn-warning w-100 py-3 fw-bold text-uppercase mt-3">
                   Kontaktiraj prodavača
                </button>
              </div>
            </div>
          </div>

          {/* 3. OPIS VOZILA */}
          <div className="row mt-5">
            <div className="col-lg-8">
              <h3 className="text-warning text-uppercase mb-4">Opis vozila</h3>
              <div 
                className="lead"
                dangerouslySetInnerHTML={{ __html: vozilo.content.rendered }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default VoziloSingle;