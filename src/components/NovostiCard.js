import React from "react";
import { Link } from "react-router-dom";

const NovostiCard = ({ post }) => {
  const image = post._embedded?.["wp:featuredmedia"]?.[0]?.source_url;
  // Formatiramo datum
  const formattedDate = new Date(post.date).toLocaleDateString("hr-HR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric"
  });

  return (
    <div className="col-lg-4 col-md-6 mb-4">
      <div className="novosti-card h-100 d-flex flex-column">
        <div className="card-img-wrapper">
          {image && <img src={image} alt={post.title.rendered} className="card-img-top" />}
        </div>
        
        <div className="card-body d-flex flex-column p-4">
          <h4 className="card-title text-gold mb-1" dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
          
          {/* Datum ispod naslova */}
          <p className="text-white-50 small mb-3">{formattedDate}</p>
          
          <div 
            className="card-text text-white-50 mb-4" 
            dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }} 
          />
          
          {/* Gumb koji će uvijek biti na dnu zbog mt-auto */}
          <Link to={"/novosti/" + post.slug} className="btn btn-gold-rounded mt-auto w-100">
            PROČITAJ VIŠE
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NovostiCard;