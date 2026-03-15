import { Link } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import Loader from "../components/Loader";
import HeroSection from "../components/HeroSection";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons";
import "./UvozVozila.css";

const BASE_URL = process.env.REACT_APP_API_URL;

const UvozVozila = () => {
  const [pageData, setPageData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Dohvaćamo stranicu Uvoz vozila (ID 2391)
    fetch(`${BASE_URL}pages/2391?acf_format=standard&_embed`)
      .then((res) => res.json())
      .then((data) => {
        setPageData(data);
        setLoading(false);
      });
  }, []);

  if (loading) return <Loader />;

  return (
    <div className="uvoz-page-wrapper bg-black">
      <HeroSection 
        stranica={pageData} 
        tip="o-nama" // Koristimo stil bez gumba u hero sekciji
      />

      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-lg-12">
            <div className="uvoz-content-card">
              
              {/* Sadržaj iz WordPress editora */}
              <div 
                className="wp-content-render"
                dangerouslySetInnerHTML={{ __html: pageData.content.rendered }} 
              />

              <hr className="border-secondary my-5" />

              {/* SEKCIJA S GUMBIMA (Kao na slici) */}
              <div className="cta-section text-center text-md-start">
                <h3 className="text-gold mb-4">Imate dodatna pitanja?</h3>
                <p className="text-white-50 mb-5">
                  Ako trebate pomoć oko uvoza specifičnog vozila ili želite informaciju o troškovima, slobodno nas kontaktirajte.
                </p>
                
                <div className="d-flex flex-wrap gap-3 justify-content-center justify-content-md-start">
                 <Link 
  to="/kontakt" 
  className="btn btn-gold-rounded d-flex align-items-center px-4 py-2"
>
  <FontAwesomeIcon icon={faEnvelope} className="me-2" />
  POŠALJI UPIT
</Link>
                  <a href="tel:+385917394888" className="btn btn-outline-white-rounded d-flex align-items-center px-4 py-2">
                    <FontAwesomeIcon icon={faPhone} className="me-2" />
                    NAZOVI
                  </a>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UvozVozila;