import { Link } from "react-router-dom";

const VehicleCard = ({ vehicle }) => {
  const image = vehicle._embedded?.["wp:featuredmedia"]?.[0]?.source_url || 'https://via.placeholder.com/400x250';
  const { cijena, kilometraza, godina, snaga_motora } = vehicle.acf;

  return (
    <div className="col-md-6 col-xl-4 mb-4">
      <div className="card h-100 gold-border-card">
        <Link to={"/vozila/" + vehicle.slug} className="position-relative">
          {/* Dodana klasa vehicle-img-top-fixed za ujednačavanje visine slika */}
          <img src={image} className="card-img-top vehicle-img-top-fixed" alt={vehicle.title.rendered} />
        </Link>
        
        <div className="card-body">
          <Link to={"/vozila/" + vehicle.slug} className="text-decoration-none">
            <h5 className="mb-3 lh-base">{vehicle.title.rendered}</h5>
          </Link>
          
          {/* Maknuli smo d-flex i border-top/bottom da stavke idu jedna ispod druge */}
          <div className="vehicle-card-specs">
            <span className="spec-item"><i className="bi bi-speedometer2"></i> {kilometraza} km</span>
            <span className="spec-item"><i className="bi bi-lightning-charge"></i> {snaga_motora} KS</span>
            <span className="spec-item"><i className="bi bi-calendar3"></i> {godina}</span>
          </div>

          <div className="d-flex justify-content-between align-items-center mt-3">
            <span className="card-price">{cijena} €</span>
            <Link to={"/vozila/" + vehicle.slug} className="plus-icon"><i className="bi bi-plus"></i></Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VehicleCard;