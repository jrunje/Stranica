import { Link, useLocation } from "react-router-dom";
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';
import logo from "../img/runje-logo.svg";
import "./Nav.css";

const Navigation = () => {
  const location = useLocation();

  return (
    <Navbar collapseOnSelect expand="lg" variant="dark" className="py-2 custom-navbar" style={{ backgroundColor: "#111" }}>
      <Container>
        {/* Logo s klasom za veličinu */}
        <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
          <img 
            src={logo} 
            alt="Runje Automobili" 
            className="navbar-logo" 
          />
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="responsive-navbar-nav" className="border-0" />

        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ms-auto text-uppercase fw-semibold align-items-center">
            <Nav.Link as={Link} to="/">Naslovnica</Nav.Link>
            
             <Nav.Link as={Link} to="/vozila">Ponuda vozila</Nav.Link>

            <NavDropdown title="Dodatne usluge" id="usluge-dropdown">
              <NavDropdown.Item as={Link} to="/uvoz-vozila">Uvoz vozila</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/otkup-vozila">Otkup vozila</NavDropdown.Item>
            </NavDropdown>
             <Nav.Link as={Link} to="/novosti">Novosti</Nav.Link>
            <Nav.Link as={Link} to="/jamstvo">Jamstvo</Nav.Link>
           
            <Nav.Link as={Link} to="/o-nama">O nama</Nav.Link>
            <Nav.Link as={Link} to="/kontakt">Kontakt</Nav.Link>

            <Nav.Link 
              href="https://wa.me/385917394888" 
              target="_blank" 
              className="ms-lg-4 p-0 whatsapp-link"
            >
              <i className="bi bi-whatsapp fs-3 whatsapp-icon"></i>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>   
  );
};

export default Navigation;