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
    // Dohvaćamo točno stranicu s ID-om 618
    fetch(`${BASE_URL}pages/618?_embed&acf_format=standard`)
      .then((res) => res.json())
      .then((data) => {
        setPageData(data);
        setLoading(false);
      })
      .catch(err => console.error("Greška pri dohvatu stranice O nama:", err));
  }, []);

  if (loading) return <Loader />;

  return (
    <div className="o-nama-page-wrapper bg-black text-white">
      <Helmet>
        <title>O Nama | Runje Automobili</title>
      </Helmet>

      {/* HeroSection koristi sliku postavljenu u WP (Featured Image) */}
      <HeroSection 
        stranica={pageData} 
        tip="o-nama" 
      />

      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-lg-10">
            <div className="about-content-card">
              {/* Naslov iz WP-a */}
              <h1 className="display-4 fw-bold mb-4 gold-text">
                {pageData.title.rendered}
              </h1>
              
              {/* Glavni sadržaj iz WP-a */}
              <div 
                className="wp-about-render"
                dangerouslySetInnerHTML={{ __html: pageData.content.rendered }} 
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ONama;