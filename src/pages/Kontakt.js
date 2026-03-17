import React, { useEffect, useState, useRef } from 'react';
import emailjs from '@emailjs/browser';
import Loader from "../components/Loader";
import HeroSection from "../components/HeroSection";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faLocationDot, faClock } from "@fortawesome/free-solid-svg-icons";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import "./Kontakt.css";

const BASE_URL = process.env.REACT_APP_API_URL;

const Kontakt = () => {
  const [pageData, setPageData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSent, setIsSent] = useState(false);
  const form = useRef();

  useEffect(() => {
    fetch(`${BASE_URL}pages/324?acf_format=standard&_embed`)
      .then((res) => res.json())
      .then((data) => {
        setPageData(data);
        setLoading(false);
      });
  }, []);

  const sendEmail = (e) => {
    e.preventDefault();
    emailjs
      .sendForm(
        "service_7pftx4a", 
        "template_8oapnro", 
        form.current,
        "hOjEcF4F2zhH2ZwbL"
      )
      .then(
        () => {
          setIsSent(true);
          form.current.reset();

          // NOVO: Resetiranje gumba nakon 5 sekundi
          setTimeout(() => {
            setIsSent(false);
          }, 5000);
        },
        (error) => {
          console.log("FAILED...", error.text);
        }
      );
  };

  if (loading) return <Loader />;

  return (
    <div className="kontakt-page-wrapper bg-black">
      <HeroSection stranica={pageData} tip="o-nama" />

      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-lg-12">
            <div className="kontakt-content-card">
              
              {/* Tekst iz WP-a */}
              <div 
                className="wp-content-render mb-5"
                dangerouslySetInnerHTML={{ __html: pageData.content.rendered }} 
              />

              <div className="row g-4 align-items-stretch">
                {/* LIJEVO: Kontakt podaci */}
                <div className="col-md-5">
                  <h3 className="text-gold mb-4">Kontakt podaci</h3>
                  <div className="kontakt-info-list">
                    
                    <div className="d-flex align-items-start mb-3">
                      <div className="icon-circle me-3"><FontAwesomeIcon icon={faLocationDot} /></div>
                      <span className="text-white">Koludrovac 8, 21217 Kaštel Štafilić</span>
                    </div>

                    <div className="d-flex align-items-start mb-3">
                      <div className="icon-circle me-3"><FontAwesomeIcon icon={faClock} /></div>
                      <div className="text-white">
                        <div>Pon - Pet: 09:00h – 17:00h</div>
                        <div>Nedjelja: Zatvoreno</div>
                      </div>
                    </div>

                    <div className="d-flex align-items-center mb-3">
                      <div className="icon-circle me-3"><FontAwesomeIcon icon={faPhone} /></div>
                      <a href="tel:+385917394888" className="text-white text-decoration-none">091 739 4888</a>
                    </div>

                    <div className="d-flex align-items-center mb-3">
                      <div className="icon-circle me-3"><FontAwesomeIcon icon={faEnvelope} /></div>
                      <a href="mailto:runje.automobili@gmail.com" className="text-white text-decoration-none">runje.automobili@gmail.com</a>
                    </div>
                  </div>
                </div>

                {/* DESNO: Google Karta*/}
                <div className="col-md-7">
                  <div className="map-holder" style={{ height: '100%', minHeight: '350px', borderRadius: '15px', overflow: 'hidden', border: '1px solid #333' }}>
                    <iframe 
                      title="Lokacija"
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2891.564778136362!2d16.33644027668636!3d43.553118958814764!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x133568c046e7f867%3A0xc695b23d9b4c6001!2sKoludrovac%20ul.%208%2C%2021217%2C%20Ka%C5%A1tel%20%C5%A0tafili%C4%87!5e0!3m2!1shr!2shr!4v1710455000000!5m2!1shr!2shr"
                      width="100%" 
                      height="100%" 
                      style={{ border: 0 }} 
                      allowFullScreen="" 
                      loading="lazy" 
                      referrerPolicy="no-referrer-when-downgrade">
                    </iframe>
                  </div>
                </div>
              </div>

              <hr className="border-secondary my-5" />

              {/* FORMA */}
              <div className="row justify-content-center">
                <div className="col-lg-10">
                  <h3 className="text-gold text-center mb-5">Pošaljite upit</h3>
                  <form ref={form} onSubmit={sendEmail} className="kontakt-form">
                    <div className="row">
                      <div className="col-md-6 mb-3">
                        <label className="form-label text-white-50">Ime</label>
                        <input type="text" name="user_name" className="form-control custom-input" required />
                      </div>
                      <div className="col-md-6 mb-3">
                        <label className="form-label text-white-50">Prezime</label>
                        <input type="text" name="user_surname" className="form-control custom-input" required />
                      </div>
                    </div>
                    <div className="mb-3">
                      <label className="form-label text-white-50">Email adresa</label>
                      <input type="email" name="user_email" className="form-control custom-input" required />
                    </div>
                    <div className="mb-4">
                      <label className="form-label text-white-50">Vaša poruka</label>
                      <textarea name="message" rows="4" className="form-control custom-input" required></textarea>
                    </div>
                    <button type="submit" className="btn btn-gold-rounded w-100 py-3" disabled={isSent}>
                      {isSent ? "PORUKA JE USPJEŠNO POSLANA ✓" : "POŠALJITE PORUKU"}
                    </button>
                  </form>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Kontakt;