import { Link, useLocation } from "react-router-dom";
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap'; // Uvozimo komponente
import logo from "../img/runje-logo.svg";
import "./Nav.css";

const Navigation = () => {
  const location = useLocation();

  return (
    <Navbar collapseOnSelect expand="lg" variant="dark" className="py-3" style={{ backgroundColor: "#111" }}>
      <Container>
        {/* Logo */}
        <Navbar.Brand as={Link} to="/">
          <img src={logo} alt="Runje Automobili" height="45" />
        </Navbar.Brand>

        {/* Hamburger gumb - react-bootstrap se brine za funkcionalnost */}
        <Navbar.Toggle aria-controls="responsive-navbar-nav" className="border-0" />

        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ms-auto text-uppercase fw-semibold align-items-center">
            
            {/* 1. Ponuda vozila Dropdown */}
            <NavDropdown title="Ponuda vozila" id="ponuda-dropdown" className="px-2">
              <NavDropdown.Item as={Link} to="/vozila">Sva vozila</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/vozila-akcija">Vozila na akciji</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/vozila-u-dolasku">Vozila u dolasku</NavDropdown.Item>
            </NavDropdown>

            {/* 2. Dodatne usluge Dropdown */}
            <NavDropdown title="Dodatne usluge" id="usluge-dropdown" className="px-2">
              <NavDropdown.Item as={Link} to="/uvoz-vozila">Uvoz vozila</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/otkup-vozila">Otkup vozila</NavDropdown.Item>
            </NavDropdown>

            <Nav.Link as={Link} to="/jamstvo" className="px-2">Jamstvo</Nav.Link>
            <Nav.Link as={Link} to="/novosti" className="px-2">Novosti</Nav.Link>
            <Nav.Link as={Link} to="/o-nama" className="px-2">O nama</Nav.Link>
            <Nav.Link as={Link} to="/kontakt" className="px-2">Kontakt</Nav.Link>

            {/* WhatsApp Ikona */}
            <Nav.Link 
              href="https://wa.me/385917394888" 
              target="_blank" 
              className="ms-lg-4 p-0 whatsapp-link"
              style={{ color: "#d4af37" }}
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