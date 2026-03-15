import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Loader from "../components/Loader";
import Yoast from "../components/Yoast";
import "./NovostiSingle.css";

const BASE_URL = process.env.REACT_APP_API_URL;

const NovostiSingle = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    fetch(`${BASE_URL}posts?slug=${slug}&_embed`)
      .then((res) => res.json())
      .then((data) => setPost(data[0]));
  }, [slug]);

  if (!post) return <Loader />;

  const featuredImage = post._embedded?.["wp:featuredmedia"]?.[0]?.source_url;
  const formattedDate = new Date(post.date).toLocaleDateString("hr-HR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric"
  });

  return (
    <>
      <Yoast yoastHeadJson={post.yoast_head_json} />
      <div className="novosti-single-wrapper bg-black">
        
        {/* HERO SEKCIJA ČLANKA */}
        <div 
          className="novosti-single-hero"
          style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.8)), url(${featuredImage})` }}
        >
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-10 text-center text-white">
                <p className="text-gold fw-bold mb-2 text-uppercase">{formattedDate}</p>
                <h1 className="display-4 fw-bold mb-4" dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
                <div className="gold-divider mx-auto"></div>
              </div>
            </div>
          </div>
        </div>

        {/* SADRŽAJ ČLANKA */}
        <div className="container py-5">
          <div className="row justify-content-center">
            <div className="col-lg-10">
              <div className="novosti-content-card">
                <div 
                  className="wp-content-render"
                  dangerouslySetInnerHTML={{ __html: post.content.rendered }} 
                />
                
                <hr className="border-secondary my-5" />
                
                <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">
                  <Link to="/novosti" className="btn btn-outline-white-rounded">
                    <i className="bi bi-arrow-left me-2"></i> NATRAG NA NOVOSTI
                  </Link>
                  
                 
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NovostiSingle;