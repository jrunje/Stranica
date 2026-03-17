import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Ovo se izvršava automatski čim se promijeni URL (pathname)
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant", // Bolje je "instant" za promjenu stranice da ne "leti" pred očima
    });
  }, [pathname]);

  return null; // Ova komponenta ne renderira ništa, samo radi u pozadini
};

export default ScrollToTop;