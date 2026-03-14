import React, { useEffect, useState } from 'react';
import Loader from "../components/Loader";
import HeroSection from "../components/HeroSection";
import { Helmet } from "react-helmet-async";
import "./ONama.css";

const BASE_URL = process.env.REACT_APP_API_URL;

const ONama = () => {
  const [pageData, setPageData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${BASE_URL}pages/618?acf_format=standard&_embed`) // Zamijeni redoslijed
    .then((res) => res.json())
    .then((data) => {
       console.log("Novi podaci s embedom:", data); // Provjeri vidi li se sad _embedded
       setPageData(data);
       setLoading(false);
      })
      .catch(err => console.error("Greška pri dohvatu stranice O nama:", err));
  }, []);

  if (loading) return <Loader />;

  return (
    <div className="o-nama-page-wrapper bg-black">
      <Helmet>
        <title>O Nama | Runje Automobili</title>
      </Helmet>

      <HeroSection 
        stranica={pageData} 
        tip="o-nama" 
      />

      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-lg-12">
            <div className="about-content-card">
              {/* Sadržaj iz WordPressa */}
              <div 
                className="wp-about-render"
                dangerouslySetInnerHTML={{ __html: pageData.content.rendered }} 
              />

              {/* Gumbi za kontakt na dnu kartice */}
              <div className="contact-buttons-wrapper d-flex flex-wrap gap-3 mt-5">
                <a href="mailto:jelena_bukovac@hotmail.com" className="btn-gold-rounded text-decoration-none">
                  <i className="bi bi-envelope-at me-2"></i> Pošalji upit
                </a>
                <a href="tel:+385917394888" className="btn-outline-white-rounded text-decoration-none">
                  <i className="bi bi-telephone me-2"></i> Nazovi
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ONama;