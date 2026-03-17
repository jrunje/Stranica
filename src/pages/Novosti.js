import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import ReactPaginate from "react-paginate";
import Loader from "../components/Loader";
import HeroSection from "../components/HeroSection";
import NovostiCard from "../components/NovostiCard";
import "./Novosti.css";

const BASE_URL = process.env.REACT_APP_API_URL;

const Novosti = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  const per_page = 3;

  useEffect(() => {
    setLoading(true);
  
    let url = `${BASE_URL}posts?_embed&per_page=${per_page}&page=${currentPage + 1}&author=11`;

    fetch(url)
      .then((response) => {
        const totalPages = response.headers.get("X-WP-TotalPages");
        setPageCount(Number(totalPages));
        return response.json();
      })
      .then((data) => {
        setPosts(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [currentPage]);

  return (
    <div className="novosti-page-wrapper bg-black">
      <Helmet>
        <title>Novosti | Runje Automobili</title>
      </Helmet>

      {/* Hero sekcija s fiksnim naslovom jer Novosti nisu jedna WP stranica */}
      <div className="novosti-hero">
          <div className="container">
              <h1 className="display-3 fw-bold text-white text-uppercase">Novosti</h1>
              
          </div>
      </div>

      <div className="container py-5">
        {loading ? (
          <Loader />
        ) : (
          <>
            <div className="row">
              {posts.map((post) => (
                <NovostiCard key={post.id} post={post} />
              ))}
            </div>

            <div className="d-flex justify-content-center mt-5">
              <ReactPaginate
                previousLabel={"←"}
                nextLabel={"→"}
                pageCount={pageCount}
                onPageChange={(e) => {
                    setCurrentPage(e.selected);
                    window.scrollTo(0, 0);
                }}
                containerClassName={"pagination custom-pagination"}
                pageClassName={"page-item"}
                pageLinkClassName={"page-link"}
                previousLinkClassName={"page-link"}
                nextLinkClassName={"page-link"}
                activeClassName={"active"}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Novosti;