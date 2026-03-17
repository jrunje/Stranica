import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; 
import Loader from "../components/Loader";
import HeroSection from "../components/HeroSection";
import { Helmet } from "react-helmet-async";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules';
import "./ONama.css";

import onama1 from '../img/onama-1.png'; 
import onama2 from '../img/onama-2.png';
import onama3 from '../img/onama-3.png';
import onama4 from '../img/onama-4.png';
import onama5 from '../img/onama-5.png';
import onama6 from '../img/onama-6.png';
import onama7 from '../img/onama-7.png';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

const BASE_URL = process.env.REACT_APP_API_URL;

const ONama = () => {
  const [pageData, setPageData] = useState(null);
  const [loading, setLoading] = useState(true);

  const lokalneSlike = [onama1, onama2, onama3, onama4, onama5, onama6, onama7];

  useEffect(() => {
    fetch(`${BASE_URL}pages/618?acf_format=standard&_embed`)
      .then((res) => res.json())
      .then((data) => {
        setPageData(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Greška:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <Loader />;

  return (
    <div className="o-nama-page-wrapper bg-black">
      <Helmet>
        <title>O Nama | Runje Automobili</title>
      </Helmet>

      <HeroSection stranica={pageData} tip="o-nama" />

      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-lg-12"> 
            
            {/* KARTICA S TEKSTOM */}
            <div className="about-content-card">
              <div className="wp-about-render text-white">
                <h2 className="mb-4 text-gold text-uppercase fw-bold">Naša priča</h2>
                <div dangerouslySetInnerHTML={{ __html: pageData.content.rendered }} />
              </div>

              <div className="contact-buttons-wrapper d-flex flex-wrap gap-3 mt-5">
                <Link to="/kontakt" className="btn-gold-rounded text-decoration-none">
                  <i className="bi bi-envelope-at me-2"></i> Pošalji upit
                </Link>
                <a href="tel:+385917394888" className="btn-outline-white-rounded text-decoration-none">
                  <i className="bi bi-telephone me-2"></i> Nazovi
                </a>
              </div>
            </div>

            {/* GALERIJA ISPOD KARTICE */}
            <div className="about-gallery-full-width mt-4">
              <Swiper
                modules={[Navigation, Pagination, Autoplay, EffectFade]}
                effect="fade"
                navigation
                pagination={{ clickable: true }}
                autoplay={{ delay: 4000 }}
                className="about-swiper-horizontal rounded-4 shadow-lg"
              >
                {lokalneSlike.map((img, index) => (
                  <SwiperSlide key={index}>
                    <img src={img} alt={`Salon ${index + 1}`} className="about-gallery-img" />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ONama;