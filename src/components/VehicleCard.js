import { Link } from "react-router-dom";

const VehicleCard = ({ vehicle }) => {
  const image = vehicle._embedded?.["wp:featuredmedia"]?.[0]?.source_url || 'https://via.placeholder.com/400x250';
  
  // Izvlačenje podataka iz ACF-a
  const { cijena, kilometraza, godina, snaga_motora } = vehicle.acf;

  return (
    <div className="col-md-6 col-xl-4 mb-4">
      {/* Dodana klasa 'gold-border-card' za onaj efekt s naslovnice */}
      <div className="card h-100 bg-white text-dark vehicle-card-simple gold-border-card">
        <Link to={"/vozila/" + vehicle.slug} className="position-relative">
          <img src={image} className="card-img-top object-fit-cover" style={{ height: '200px' }} alt={vehicle.title.rendered} />
        </Link>
        
        <div className="card-body p-3">
          <Link to={"/vozila/" + vehicle.slug} className="text-decoration-none text-dark">
            <h5 className="fw-bold mb-3 lh-base text-uppercase" style={{ fontSize: '1rem', minHeight: '3rem' }}>
              {vehicle.title.rendered}
            </h5>
          </Link>
          
          <div className="d-flex justify-content-between align-items-center py-3 border-top border-bottom text-muted small mb-3">
            <span className="spec-item"><i className="bi bi-speedometer2"></i> {kilometraza} km</span>
            <span className="spec-item"><i className="bi bi-lightning-charge"></i> {snaga_motora} KS</span>
            <span className="spec-item"><i className="bi bi-calendar3"></i> {godina}</span>
          </div>

          <div className="d-flex justify-content-between align-items-center">
            <span className="h5 fw-bold text-warning mb-0">{cijena} €</span>
            <Link to={"/vozila/" + vehicle.slug} className="text-muted"><i className="bi bi-plus-lg"></i></Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VehicleCard;