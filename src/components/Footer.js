import { useLocation, Link } from "react-router-dom";
import logo from "../img/runje-logo.svg";

const Footer = () => {
  const location = useLocation();

  // "Natrag na vrh" gumb
  const handleBackToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (location.pathname === "/signin") {
    return null;
  }

  return (
    <footer className="footer-section py-5">
      <div className="container">
        <div className="row">
          <div className="col-md-8">
            <div className="row">
              {/* Prvi stupac - Ponuda */}
              <div className="col-md-4">
                <h4>Ponuda</h4>
                <ul className="list-unstyled">
                  <li><Link to="/vozila">Ponuda vozila</Link></li>
                  <li><Link to="/uvoz-vozila">Uvoz vozila</Link></li>
                  <li><Link to="/otkup-vozila">Otkup vozila</Link></li>
                </ul>
              </div>

              {/* Drugi stupac - O nama */}
              <div className="col-md-4">
                <h4>O nama</h4>
                <ul className="list-unstyled">
                  <li><Link to="/o-nama">Naša priča</Link></li>
                  <li><Link to="/jamstvo">Jamstvo</Link></li>
                  <li><Link to="/novosti">Novosti</Link></li>
                  <li><Link to="/kontakt">Kontakt</Link></li>
                </ul>
              </div>

              {/* Treći stupac - KONTAKT PODACI */}
              <div className="col-md-4">
                <h4>Kontakt</h4>
                <ul className="list-unstyled footer-contact-info">
                  <li className="mb-2">
                    <i className="bi bi-geo-alt-fill me-2 text-gold"></i>
                    Koludrovac 8, Kaštel Štafilić
                  </li>
                  <li className="mb-2">
                    <i className="bi bi-telephone-fill me-2 text-gold"></i>
                    <a href="tel:+385917394888" style={{ color: 'inherit', textDecoration: 'none' }}>
                      (+385) 91 739 4888
                    </a>
                  </li>
                  <li className="mb-2">
                    <i className="bi bi-envelope-fill me-2 text-gold"></i>
                    <a href="mailto:jelena_bukovac@hotmail.com" style={{ color: 'inherit', textDecoration: 'none' }}>
                      jelena_bukovac@hotmail.com
                    </a>
                  </li>
                  <li>
                    <i className="bi bi-whatsapp me-2 text-gold"></i>
                    <a href="https://wa.me/385917394888" target="_blank" rel="noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>
                      WhatsApp podrška
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Četvrti stupac - Logo i Newsletter */}
          <div className="col-md-4 text-md-end">
            <img src={logo} alt="Runje Logo" style={{ height: "80px", marginBottom: "20px" }} />
            <h4>Pridružite nam se.</h4>
          </div>
        </div>

        <div className="row mt-5 align-items-center">
          <div className="col-md-6">
            <p className="text-white-50 small mb-0">© {new Date().getFullYear()} Runje Automobili. Sva prava pridržana.</p>
          </div>
          <div className="col-md-6 text-end">
            {/* pozivamo lokalnu funkciju handleBackToTop */}
            <button className="btn btn-outline-warning btn-sm" onClick={handleBackToTop}>
              NATRAG NA VRH
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;