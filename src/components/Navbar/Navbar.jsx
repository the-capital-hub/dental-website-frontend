
import {
  ArrowUpRight,
  Menu,
  X,
} from "lucide-react";

import { useEffect, useState } from "react";

import {
  motion,
  AnimatePresence,
} from "framer-motion";

import {
  Link,
  useLocation,
} from "react-router-dom";

import "./Navbar.css";


/* =====================================================
   NAVIGATION LINKS
===================================================== */

const navLinks = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "About",
    href: "/about",
  },
  {
    name: "Services",
    href: "/services",
  },
  {
    name: "Our Dentists",
    href: "/doctors",
  },
  {
    name: "Testimonials",
    href: "/patient-testimonials",
  },
  {
    name: "Pricing",
    href: "/pricing",
  },
  {
    name: "WhatsApp",
    href: "/whatsapp",
  },
];


/* =====================================================
   NAVBAR
===================================================== */

const Navbar = () => {

  const [menuOpen, setMenuOpen] = useState(false);

  const location = useLocation();


  /* ===================================================
     CLOSE MENU
  =================================================== */

  const closeMenu = () => {
    setMenuOpen(false);
  };


  /* ===================================================
     CLOSE MENU ON ROUTE CHANGE
  =================================================== */

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);


  /* ===================================================
     PREVENT BODY SCROLL WHEN MENU IS OPEN
  =================================================== */

  useEffect(() => {

    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };

  }, [menuOpen]);


  /* ===================================================
     ACTIVE LINK
  =================================================== */

  const isActive = (href) => {

    if (href === "/") {
      return location.pathname === "/";
    }

    return location.pathname.startsWith(href);
  };


  return (
    <>
      {/* =================================================
          NAVBAR
      ================================================= */}

      <header className="navbar">


        {/* =================================================
            LOGO
        ================================================= */}

        <Link
          to="/"
          className="navbar-logo"
          onClick={closeMenu}
        >

          <span className="navbar-logo-mark">
            O
          </span>

          <span className="navbar-logo-text">

            <strong>
              Oak & Ivory
            </strong>

            <small>
              DENTAL
            </small>

          </span>

        </Link>


        {/* =================================================
            DESKTOP NAVIGATION
        ================================================= */}

        <nav className="navbar-links">

          {navLinks.map((link) => (

            <Link
              key={link.name}
              to={link.href}
              className={`navbar-link ${
                isActive(link.href)
                  ? "active"
                  : ""
              }`}
            >
              {link.name}
            </Link>

          ))}

        </nav>


        {/* =================================================
            DESKTOP ACTIONS
        ================================================= */}

        <div className="navbar-actions">

          <Link
            to="/admin/dashboard"
            className="navbar-admin"
          >
            Dashboard
          </Link>


          <Link
            to="/appointment"
            className="navbar-cta"
          >

            <span>
              Book Appointment
            </span>

            <span className="navbar-cta-arrow">
              <ArrowUpRight size={15} />
            </span>

          </Link>

        </div>


        {/* =================================================
            MOBILE MENU BUTTON
        ================================================= */}

        <button
          type="button"
          className={`navbar-menu-button ${
            menuOpen ? "open" : ""
          }`}
          onClick={() =>
            setMenuOpen(
              (previous) => !previous
            )
          }
          aria-label={
            menuOpen
              ? "Close navigation"
              : "Open navigation"
          }
          aria-expanded={menuOpen}
        >

          {menuOpen ? (
            <X size={20} />
          ) : (
            <Menu size={20} />
          )}

        </button>

      </header>


      {/* =================================================
          MOBILE BACKDROP
      ================================================= */}

      <AnimatePresence>

        {menuOpen && (

          <motion.div
            className="mobile-backdrop"

            initial={{
              opacity: 0,
            }}

            animate={{
              opacity: 1,
            }}

            exit={{
              opacity: 0,
            }}

            transition={{
              duration: 0.2,
            }}

            onClick={closeMenu}
          />

        )}

      </AnimatePresence>


      {/* =================================================
          MOBILE MENU
      ================================================= */}

      <AnimatePresence>

        {menuOpen && (

          <motion.div
            className="mobile-menu"

            initial={{
              opacity: 0,
              y: -15,
              scale: 0.98,
            }}

            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}

            exit={{
              opacity: 0,
              y: -15,
              scale: 0.98,
            }}

            transition={{
              duration: 0.25,
              ease: "easeOut",
            }}
          >

            <div className="mobile-menu-inner">


              {/* =========================================
                  MOBILE LINKS
              ========================================= */}

              <nav className="mobile-navigation">

                {navLinks.map(
                  (link, index) => (

                    <motion.div
                      key={link.name}

                      initial={{
                        opacity: 0,
                        x: -12,
                      }}

                      animate={{
                        opacity: 1,
                        x: 0,
                      }}

                      transition={{
                        delay: index * 0.035,
                        duration: 0.22,
                      }}
                    >

                      <Link
                        to={link.href}
                        className={`mobile-nav-link ${
                          isActive(link.href)
                            ? "active"
                            : ""
                        }`}
                        onClick={closeMenu}
                      >

                        <span className="mobile-nav-number">
                          {String(index + 1).padStart(2, "0")}
                        </span>

                        <strong>
                          {link.name}
                        </strong>

                        <ArrowUpRight size={17} />

                      </Link>

                    </motion.div>

                  )
                )}

              </nav>


              {/* =========================================
                  MOBILE ACTIONS
              ========================================= */}

              <div className="mobile-actions">

                <Link
                  to="/admin/dashboard"
                  className="mobile-admin-link"
                  onClick={closeMenu}
                >

                  <span>
                    Dashboard
                  </span>

                  <ArrowUpRight size={16} />

                </Link>


                <Link
                  to="/appointment"
                  className="mobile-menu-cta"
                  onClick={closeMenu}
                >

                  <span>
                    Book an Appointment
                  </span>

                  <span className="mobile-cta-arrow">
                    <ArrowUpRight size={17} />
                  </span>

                </Link>

              </div>

            </div>

          </motion.div>

        )}

      </AnimatePresence>

    </>
  );
};


export default Navbar;
