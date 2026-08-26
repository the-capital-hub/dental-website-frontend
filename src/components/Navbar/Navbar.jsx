import {
  ArrowUpRight,
  Menu,
  X,
} from "lucide-react";

import { useState } from "react";

import {
  motion,
  AnimatePresence,
} from "framer-motion";

import { Link } from "react-router-dom";

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


  /* ===================================================
     CLOSE MOBILE MENU
  =================================================== */

  const closeMenu = () => {
    setMenuOpen(false);
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
              className="navbar-link"
            >
              {link.name}
            </Link>

          ))}

        </nav>


        {/* =================================================
            DASHBOARD
        ================================================= */}

        <Link
          to="/admin/dashboard"
          className="navbar-admin"
        >

          <span>
            Dashboard
          </span>

        </Link>


        {/* =================================================
            APPOINTMENT CTA
        ================================================= */}

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


        {/* =================================================
            MOBILE MENU BUTTON
        ================================================= */}

        <button
          type="button"
          className="navbar-menu-button"
          onClick={() =>
            setMenuOpen(
              (previous) => !previous
            )
          }
          aria-label="Toggle navigation"
          aria-expanded={menuOpen}
        >

          {menuOpen ? (
            <X size={21} />
          ) : (
            <Menu size={21} />
          )}

        </button>

      </header>


      {/* =================================================
          MOBILE MENU
      ================================================= */}

      <AnimatePresence>

        {menuOpen && (

          <motion.div
            className="mobile-menu"

            initial={{
              opacity: 0,
              y: -20,
            }}

            animate={{
              opacity: 1,
              y: 0,
            }}

            exit={{
              opacity: 0,
              y: -20,
            }}

            transition={{
              duration: 0.3,
              ease: "easeOut",
            }}
          >

            <div className="mobile-menu-inner">


              {/* =========================================
                  PUBLIC LINKS
              ========================================= */}

              {navLinks.map(
                (link, index) => (

                  <motion.div
                    key={link.name}

                    initial={{
                      opacity: 0,
                      x: -20,
                    }}

                    animate={{
                      opacity: 1,
                      x: 0,
                    }}

                    transition={{
                      delay: index * 0.045,
                      duration: 0.25,
                    }}
                  >

                    <Link
                      to={link.href}
                      className="mobile-nav-link"
                      onClick={closeMenu}
                    >

                      <span className="mobile-nav-number">

                        {String(
                          index + 1
                        ).padStart(
                          2,
                          "0"
                        )}

                      </span>


                      <strong>
                        {link.name}
                      </strong>


                      <ArrowUpRight
                        size={16}
                      />

                    </Link>

                  </motion.div>

                )
              )}


              {/* =========================================
                  DASHBOARD
              ========================================= */}

              <motion.div

                initial={{
                  opacity: 0,
                  x: -20,
                }}

                animate={{
                  opacity: 1,
                  x: 0,
                }}

                transition={{
                  delay:
                    navLinks.length * 0.045,
                  duration: 0.25,
                }}
              >

                <Link
                  to="/admin/dashboard"
                  className="mobile-admin-link"
                  onClick={closeMenu}
                >

                  <span className="mobile-nav-number">

                    {String(
                      navLinks.length + 1
                    ).padStart(
                      2,
                      "0"
                    )}

                  </span>


                  <strong>
                    Dashboard
                  </strong>


                  <ArrowUpRight
                    size={16}
                  />

                </Link>

              </motion.div>


              {/* =========================================
                  APPOINTMENT CTA
              ========================================= */}

              <motion.div

                initial={{
                  opacity: 0,
                  y: 10,
                }}

                animate={{
                  opacity: 1,
                  y: 0,
                }}

                transition={{
                  delay:
                    (navLinks.length + 1) *
                    0.045,
                  duration: 0.25,
                }}
              >

                <Link
                  to="/appointment"
                  className="mobile-menu-cta"
                  onClick={closeMenu}
                >

                  <span>
                    Book an Appointment
                  </span>


                  <ArrowUpRight
                    size={17}
                  />

                </Link>

              </motion.div>

            </div>

          </motion.div>

        )}

      </AnimatePresence>

    </>
  );
};


export default Navbar;