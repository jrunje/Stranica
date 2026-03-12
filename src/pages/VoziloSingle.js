import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Thumbs, FreeMode } from 'swiper/modules';
import Loader from "../components/Loader";
import Yoast from "../components/Yoast";
import "./VoziloSingle.css";

// Swiper stilovi
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import 'swiper/css/free-mode';

const BASE_URL = process.env.REACT_APP_API_URL;

const VoziloSingle = () => {
  const { slug } = useParams();
  const [vozilo, setVozilo] = useState(null);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [images, setImages] = useState([]);

  useEffect(() => {
    // Dohvaćamo vozila s parametrima za slug i embed
    fetch(`${BASE_URL}vozila?slug=${slug}&_embed&acf_format=standard`)
      .then((res) => res.json())
      .then((data) => {
        if (data && data[0]) {
          const v = data[0];
          setVozilo(v);

          // IZVLAČENJE SLIKA IZ TVOG API-JA
          const loadedImages = [];
          
          // 1. Provjera galerije unutar galerija[0]
          const galerijaData = v.acf?.photo_gallery?.galerija;
          if (Array.isArray(galerijaData) && Array.isArray(galerijaData[0])) {
            galerijaData[0].forEach(item => {
              if (item.full_image_url) {
                loadedImages.push(item.full_image_url);
              }
            });
          }

          // 2. Ako je galerija prazna, uzmi barem featured image
          if (loadedImages.length === 0 && v._embedded?.['wp:featuredmedia']?.[0]?.source_url) {
            loadedImages.push(v._embedded['wp:featuredmedia'][0].source_url);
          }
          
          setImages(loadedImages);
        }
      });
  }, [slug]);

  if (!vozilo) return <Loader />;

  const { acf } = vozilo;

  const getTaxName = (taxType) => {
    const taxArray = vozilo._embedded[`wp:term`]?.find(t => t[0]?.taxonomy === taxType);
    return taxArray ? taxArray[0].name : "-";
  };

  return (
    <>
      <Yoast yoastHeadJson={vozilo.yoast_head_json} />
      
      <div className="single-vehicle-wrapper bg-black text-white min-vh-100 pb-5">
        <div className="container pt-4">
          <div className="mb-3 mt-3">
          <Link to="/vozila" className="back-to-offers">
      <i className="bi bi-arrow-left me-2"></i>
      Povratak na ponudu
    </Link>
          </div>
          <div className="row g-0 vehicle-main-row">
            
            {/* 1. GALERIJA SLIKA (Lijeva strana) */}
            <div className="col-lg-8 d-flex flex-column">
              <Swiper
                spaceBetween={10}
                navigation={true}
                thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
                modules={[FreeMode, Navigation, Thumbs]}
                className="main-swiper w-100"
              >
                {images.map((img, idx) => (
                  <SwiperSlide key={idx}>
                    <img src={img} alt="Vozilo" className="main-view-img" />
                  </SwiperSlide>
                ))}
              </Swiper>

              {/* Thumbnaili - poravnati na dno */}
              <Swiper
                onSwiper={setThumbsSwiper}
                spaceBetween={10}
                slidesPerView={4}
                freeMode={true}
                watchSlidesProgress={true}
                modules={[FreeMode, Navigation, Thumbs]}
                className="thumb-swiper w-100 mt-2"
              >
                {images.map((img, idx) => (
                  <SwiperSlide key={idx}>
                    <img src={img} alt="Thumbnail" className="thumb-img" />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>

            {/* 2. INFORMACIJE O VOZILU (Desna strana) */}
            <div className="col-lg-4">
              <div className="vehicle-info-card h-100">
                <h1 className="fw-bold h2 text-uppercase mb-1">{vozilo.title.rendered}</h1>
                <p className="text-muted mb-3 small">{getTaxName('marka')} {getTaxName('model-vozila')}</p>
                
                <div className="price-tag mb-4">{acf.cijena} €</div>
                
                <div className="spec-list flex-grow-1">
                  <div className="spec-row-item">
                    <span className="label"><i className="bi bi-calendar3"></i> Godina:</span>
                    <span className="value">{acf.godina}.</span>
                  </div>
                  <div className="spec-row-item">
                    <span className="label"><i className="bi bi-speedometer2"></i> Kilometri:</span>
                    <span className="value">{acf.kilometraza} km</span>
                  </div>
                  <div className="spec-row-item">
                    <span className="label"><i className="bi bi-lightning-charge"></i> Snaga:</span>
                    <span className="value">{acf.snaga_motora}</span>
                  </div>
                  <div className="spec-row-item">
                    <span className="label"><i className="bi bi-fuel-pump"></i> Motor:</span>
                    <span className="value">{getTaxName('vrsta-motora')}</span>
                  </div>
                  <div className="spec-row-item">
                    <span className="label"><i className="bi bi-gear"></i> Mjenjač:</span>
                    <span className="value">{getTaxName('mjenjac')}</span>
                  </div>
                </div>

                <Link to="/kontakt" className="btn btn-warning w-100 py-3 fw-bold text-uppercase mt-auto">
                  Pošalji upit
                </Link>
              </div>
            </div>
          </div>

          {/* 3. OPIS VOZILA */}
          <div className="row mt-5">
            <div className="col-lg-12">
              <h3 className="section-title">Opis vozila</h3>
              <div 
                className="vehicle-content mt-3"
                dangerouslySetInnerHTML={{ __html: vozilo.content.rendered }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default VoziloSingle;