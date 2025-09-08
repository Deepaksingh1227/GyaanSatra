import React from "react";
import { scroller } from "react-scroll";
import { Link as ScrollLink } from "react-scroll";
import { useLocation, useNavigate, Link } from "react-router-dom";
import './Nav.css';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import logo from '../assets/logo.jpg';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useAuth } from '../context/AuthContext';

function AppNavbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const isHomePage = location.pathname === "/";

  // ✅ Function to scroll to specific section
  const scrollToSection = (section) => {
    scroller.scrollTo(section, {
      duration: 800,
      delay: 0,
      smooth: 'easeInOutQuart',
      offset: -70, // adjust if your navbar is covering content
    });
  };

  const handleNavClick = (section) => {
    if (!isHomePage) {
      navigate("/");
      setTimeout(() => scrollToSection(section), 300); // allow DOM to load first
    } else {
      scrollToSection(section);
    }
  };

  const createNavLink = (to, label) => (
    <Nav.Link
      onClick={() => handleNavClick(to)}
      className="text-dark fw-semibold mx-2"
      style={{ cursor: 'pointer' }}
    >
      {label}
    </Nav.Link>
  );

  return (
    <div>
      <Navbar
        collapseOnSelect
        expand="lg"
        bg="light"
        variant="light"
        fixed="top"
        style={{ boxShadow: "0 4px 6px rgba(0,0,0,0.1)" }}
      >
        <Container>
        <Navbar.Brand
  as={isHomePage ? ScrollLink : 'div'}
  to="home"
  smooth={true}
  duration={500}
  className="fw-bold d-flex align-items-center gap-2 text-cyan-400 neon-text"
  style={{ cursor: 'pointer' }}
  onClick={() => {
    if (!isHomePage) navigate("/");
    else scrollToSection("home");
  }}
>

            <img
              src={logo}
              width="50"
              height="50"
              className="d-inline-block align-top"
              alt="Logo"
              style={{ objectFit: "contain", borderRadius: "8px" }}
            />
            EviSphere Tech
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav " />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="ms-auto align-items-center">
              {createNavLink("home", "Home")}
              {createNavLink("about", "About")}
              {createNavLink("courses", "Premium Courses")}
              {createNavLink("ceo", "Meet Our Founder")}
              {createNavLink("team", "Team")}
              {createNavLink("contact", "Contact")}

              {/* Role-based Links */}
              {user ? (
                <>
                  <Nav.Link as={Link} to="/notes" className="text-dark fw-semibold mx-2">
                    Study Notes
                  </Nav.Link>
                  <Button variant="outline-danger" size="sm" onClick={logout} className="mx-2">
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Nav.Link as={Link} to="/login" className="text-dark fw-semibold mx-2">
                    Login
                  </Nav.Link>
                  <Nav.Link as={Link} to="/signup" className="text-dark fw-semibold mx-2">
                    Sign Up
                  </Nav.Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default AppNavbar;
