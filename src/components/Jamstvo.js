import React, { useEffect, useState } from 'react';
import Loader from "../components/Loader";
import HeroSection from "../components/HeroSection"; // Importaj postojeću komponentu
import "./Jamstvo.css";

const BASE_URL = process.env.REACT_APP_API_URL;

const Jamstvo = () => {
  const [pageData, setPageData] = useState(null);
  const [loading, setLoading] = useState(true);

  console.log(pageData)

useEffect(() => {
  fetch(`${BASE_URL}pages/834?acf_format=standard&_embed`) // Zamijeni redoslijed
    .then((res) => res.json())
    .then((data) => {
       console.log("Novi podaci s embedom:", data); // Provjeri vidi li se sad _embedded
       setPageData(data);
       setLoading(false);
    });
}, []);

  if (loading) return <Loader />;

  return (
    <div className="jamstvo-page-wrapper bg-black">
      {/* Koristimo tvoj HeroSection */}
      {/* Proslijedili smo tip="jamstvo" kako bismo u HeroSectionu mogli sakriti gumb */}
      <HeroSection 
        stranica={pageData} 
        fallback="https://tvoja-domena.com/default-bg.jpg" 
        tip="jamstvo" 
      />

      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-lg-12"> {/* Širimo sadržaj */}
            <div className="jamstvo-content-card">
              <div 
                className="wp-content-render"
                dangerouslySetInnerHTML={{ __html: pageData.content.rendered }} 
              />
              <div className="contact-buttons-wrapper d-flex flex-wrap gap-3 mt-5">
  <a href="mailto:jelena_bukovac@hotmail.com" className="btn btn-gold-rounded">
    <i className="bi bi-envelope-at me-2"></i> Pošalji upit
  </a>
  <a href="tel:+385917394888" className="btn btn-outline-white-rounded">
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

export default Jamstvo;