import React from "react";
import { Link as ScrollLink } from "react-scroll";
import { useLocation, useNavigate } from "react-router-dom";
import './Nav.css';
import { Navbar, Nav, Container } from 'react-bootstrap';
import logo from '../assets/gyaansatralogo.jpg';
import 'bootstrap/dist/css/bootstrap.min.css';

function AppNavbar() {
    const location = useLocation();
    const navigate = useNavigate();
    const isHomePage = location.pathname === "/";

    const handleNavClick = (section) => {
        if (isHomePage) return;

        navigate("/"); // Go to homepage
        // Wait for homepage to render, then scroll
        setTimeout(() => {
            const el = document.querySelector(`[name="${section}"]`);
            if (el) el.scrollIntoView({ behavior: "smooth" });
        }, 100);
    };

    const createNavLink = (to, label) => {
        if (isHomePage) {
            return (
                <Nav.Link
                    as={ScrollLink}
                    to={to}
                    smooth={true}
                    duration={500}
                    offset={-70}
                    className="text-dark fw-semibold mx-2"
                    style={{ cursor: 'pointer' }}
                >
                    {label}
                </Nav.Link>
            );
        } else {
            return (
                <Nav.Link
                    onClick={() => handleNavClick(to)}
                    className="text-dark fw-semibold mx-2"
                    style={{ cursor: 'pointer' }}
                >
                    {label}
                </Nav.Link>
            );
        }
    };

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
                        as={isHomePage ? ScrollLink : "div"}
                        to="home"
                        smooth={true}
                        duration={500}
                        className="fw-bold text-danger d-flex align-items-center gap-2"
                        style={{ cursor: 'pointer' }}
                        onClick={() => {
                            if (!isHomePage) {
                                navigate("/");
                            }
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
                        Gyaan Satra
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="ms-auto">
                            {createNavLink("home", "Home")}
                            {createNavLink("about", "About")}
                            {createNavLink("courses", "Premium Courses")}
                            {createNavLink("ceo", "Meet Our Founder")}
                            {createNavLink("team", "Team")}
                            {createNavLink("contact", "Contact")}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    );
}

export default AppNavbar;
