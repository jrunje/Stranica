import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { Link } from 'react-router-dom';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const VozilaSwiper = ({ vozila }) => {
  return (
    <div className="swiper-container-wrapper py-5">
      <div className="container">
        <h2 className="text-white text-uppercase mt-2 mb-5 letter-spacing-2 text-center text-md-start">
          Izdvajamo <span style={{ color: '#d4af37' }}>iz ponude</span>
        </h2>
        
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          breakpoints={{
            992: { slidesPerView: 2 },
          }}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000 }}
        >
          {vozila.map((auto) => {
            const slika = auto._embedded?.['wp:featuredmedia']?.[0]?.source_url || "https://placehold.co/600x400";
            
            return (
              <SwiperSlide key={auto.id}>
                <div className="card car-horizontal-card border-0">
                  <div className="h-100 row g-0"> {/* g-0 uklanja razmak između stupaca */}
                    {/* Lijeva strana: Slika */}
                    <div className="col-md-6 img-column">
                      <div className="img-wrapper">
                        <img src={slika} alt={auto.title.rendered} className="img-fluid" />
                      </div>
                    </div>
                    {/* Desna strana: Podaci */}
                    <div className="col-md-6 bg-white p-4 d-flex flex-column justify-content-between text-dark">
                      <div>
                        <h4 className="fw-bold mb-1 text-truncate">{auto.title.rendered}</h4>
                        <div className="price-tag mb-3">
                          <span className="fs-3 fw-bold text-gold">{auto.acf?.cijena || "72.900"} €</span>
                        </div>
                        
                        <ul className="list-unstyled car-specs-list">
                          <li>
                            <span><i className="bi bi-gear-fill me-2"></i> Mjenjač</span>
                            <strong>{auto.acf?.mjenjac || "Automatski"}</strong>
                          </li>
                          <li>
                            <span><i className="bi bi-speedometer2 me-2"></i> Kilometraža</span>
                            <strong>{auto.acf?.kilometraza || "48.900"} km</strong>
                          </li>
                          <li>
                            <span><i className="bi bi-calendar3 me-2"></i> Godište</span>
                            <strong>{auto.acf?.godina || "2024"}</strong>
                          </li>
                          <li>
                            <span><i className="bi bi-fuel-pump-fill me-2"></i> Motor</span>
                            <strong>{auto.acf?.motor || "Diesel"}</strong>
                          </li>
                        </ul>
                      </div>
                      
                      <Link to={`/vozila/${auto.slug}`} className="btn btn-warning w-100 fw-bold hero-btn py-2 mt-3">
  SAZNAJ VIŠE
</Link>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </div>
  );
};

export default VozilaSwiper;