import {
  ArrowUpRight,
  Clock3,
  Mail,
  MapPin,
  Phone,
  
} from "lucide-react";

import {
  FaInstagram,
  FaFacebookF,
  FaLinkedinIn,
} from "react-icons/fa";

import "./Footer.css";

const quickLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Services", href: "/services" },
  { name: "Our Dentists", href: "/doctors" },
  { name: "Ivy", href: "/ai-receptionist" },
];

const patientLinks = [
  { name: "Appointment", href: "/appointment" },
  {
    name: "Testimonials",
    href: "/patient-testimonials",
  },
  { name: "Pricing", href: "/pricing" },
  { name: "FAQ", href: "/faq" },
  { name: "WhatsApp", href: "/whatsapp" },
];

const Footer = () => {
  return (
    <footer className="footer">

      <div className="footer-container">

        {/* CTA */}

        <section className="footer-cta">

          <div className="footer-cta-content">

            <span className="footer-eyebrow">
              YOUR SMILE, OUR PRIORITY
            </span>

            <h2>
              Ready to take care
              <br />
              of your smile?
            </h2>

            <p>
              Book a consultation with our
              dental team and take the next
              step toward a healthier smile.
            </p>

          </div>

          <a
            href="/appointment"
            className="footer-cta-button"
          >
            <span>Book an Appointment</span>
            <ArrowUpRight size={16} />
          </a>

        </section>


        {/* MAIN FOOTER */}

        <div className="footer-main">

          {/* BRAND */}

          <div className="footer-brand">

            <a
              href="/"
              className="footer-logo"
            >

              <span className="footer-logo-mark">
                O
              </span>

              <span className="footer-logo-text">

                <strong>
                  Oak & Ivory
                </strong>

                <small>
                  DENTAL
                </small>

              </span>

            </a>

            <p>
              Thoughtful dental care,
              modern technology and
              a better patient experience.
            </p>


            {/* IVY STATUS */}

            <a
              href="/ai-receptionist"
              className="footer-ivy-badge"
            >

              <span className="footer-ivy-dot" />

              <div>
                <strong>
                  Ivy is ready
                </strong>

                <small>
                  AI dental assistant
                </small>
              </div>

              <ArrowUpRight size={13} />

            </a>

          </div>


          {/* QUICK LINKS */}

          <div className="footer-column">

            <span className="footer-column-title">
              QUICK LINKS
            </span>

            <nav className="footer-links">

              {quickLinks.map((link) => (

                <a
                  key={link.name}
                  href={link.href}
                >
                  <span>
                    {link.name}
                  </span>

                  <ArrowUpRight size={12} />
                </a>

              ))}

            </nav>

          </div>


          {/* PATIENT CARE */}

          <div className="footer-column">

            <span className="footer-column-title">
              PATIENT CARE
            </span>

            <nav className="footer-links">

              {patientLinks.map((link) => (

                <a
                  key={link.name}
                  href={link.href}
                >
                  <span>
                    {link.name}
                  </span>

                  <ArrowUpRight size={12} />
                </a>

              ))}

            </nav>

          </div>


          {/* CONTACT */}

          <div className="footer-column footer-contact">

            <span className="footer-column-title">
              CONTACT
            </span>


            <div className="footer-socials">

  <a
    href="https://www.instagram.com/YOUR_USERNAME/"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Instagram"
  >
    <FaInstagram size={18} />
  </a>

  <a
    href="https://www.facebook.com/YOUR_USERNAME"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Facebook"
  >
    <FaFacebookF size={18} />
  </a>

  <a
    href="https://www.linkedin.com/company/YOUR_COMPANY/"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="LinkedIn"
  >
    <FaLinkedinIn size={18} />
  </a>

</div>

            <a
              href="/contact"
              className="footer-contact-main"
            >
              Contact our clinic
              <ArrowUpRight size={13} />
            </a>


            <div className="footer-contact-item">

              <Phone size={14} />

              <div>
                <span>Phone</span>

                <a href="tel:+919876543210">
                  +91 98765 43210
                </a>
              </div>

            </div>


            <div className="footer-contact-item">

              <Mail size={14} />

              <div>
                <span>Email</span>

                <a href="mailto:hello@oakivory.com">
                  hello@oakivory.com
                </a>
              </div>

            </div>


            <div className="footer-contact-item">

              <MapPin size={14} />

              <div>
                <span>Location</span>

                <p>
                  New Delhi, India
                </p>
              </div>

            </div>


            <div className="footer-contact-item">

              <Clock3 size={14} />

              <div>
                <span>Opening Hours</span>

                <p>
                  Mon – Sat · 9:00 AM – 6:00 PM
                </p>
              </div>

            </div>

          </div>

        </div>


        {/* BOTTOM */}

        <div className="footer-bottom">

          <p>
            © 2026 Oak & Ivory Dental.
            All rights reserved.
          </p>

          <div className="footer-bottom-links">

            <a href="/contact">
              Contact
            </a>

            <a href="/faq">
              FAQ
            </a>

            <a href="/appointment">
              Book Appointment
            </a>

          </div>

        </div>

      </div>

    </footer>
  );
};

export default Footer;