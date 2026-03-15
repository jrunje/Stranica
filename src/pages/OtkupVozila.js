import { Link } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import Loader from "../components/Loader";
import HeroSection from "../components/HeroSection";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons";
import "./OtkupVozila.css";

const BASE_URL = process.env.REACT_APP_API_URL;

const OtkupVozila = () => {
  const [pageData, setPageData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Dohvaćamo stranicu Otkup vozila (ID 2394)
    fetch(`${BASE_URL}pages/2394?acf_format=standard&_embed`)
      .then((res) => res.json())
      .then((data) => {
        setPageData(data);
        setLoading(false);
      });
  }, []);

  if (loading) return <Loader />;

  return (
    <div className="otkup-page-wrapper bg-black">
      <HeroSection 
        stranica={pageData} 
        tip="o-nama" 
      />

      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-lg-12">
            <div className="otkup-content-card">
              
              {/* Sadržaj iz WordPress editora */}
              <div 
                className="wp-content-render"
                dangerouslySetInnerHTML={{ __html: pageData.content.rendered }} 
              />

              <hr className="border-secondary my-5" />

              {/* SEKCIJA S GUMBIMA (Kao na slici b2ea6d) */}
              <div className="cta-section text-center text-md-start">
                <h3 className="text-gold mb-4">Želite prodati svoje vozilo?</h3>
                <p className="text-white-50 mb-5">
                  Pošaljite nam podatke o vašem automobilu i dobit ćete besplatnu procjenu u najkraćem mogućem roku.
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

export default OtkupVozila;