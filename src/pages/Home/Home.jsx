import Navbar from "../../components/Navbar/Navbar";
import Hero from "../../components/Hero/Hero";
import About from "../../components/About/About";
import Services from "../../components/Services/Services";
import Doctors from "../../components/Doctors/Doctors";
import Experience from "../../components/Experience/Experience";
import Testimonials from "../../components/Testimonials/Testimonials";
import Ivy from "../../components/Ivy/Ivy";
import WhyChooseUs from "../../components/WhyChooseUs/WhyChooseUs";
import Cosmetic from "../../components/Cosmetic/Cosmetic";
import Implants from "../../components/Implants/Implants";
import Emergency from "../../components/Emergency/Emergency";
import FAQ from "../../components/FAQ/FAQ";
import Appointment from "../../components/Appointment/Appointment";
import Contact from "../../components/Contact/Contact";
import Footer from "../../components/Footer/Footer";

const Home = () => {
  return (
    <>
      <Navbar />

      <main>

        {/* ==============================
            HERO
        ============================== */}
        <Hero />

        {/* ==============================
            ABOUT
        ============================== */}
        <About />

        {/* ==============================
            SERVICES
        ============================== */}
        <Services />

        {/* ==============================
            DOCTORS
        ============================== */}
        <Doctors />

        {/* ==============================
            EXPERIENCE
        ============================== */}
        <Experience />

        {/* ==============================
            TESTIMONIALS
        ============================== */}
        <Testimonials />

        {/* ==============================
            AI RECEPTIONIST
        ============================== */}
        <Ivy />

        {/* ==============================
            WHY CHOOSE US
        ============================== */}
        <WhyChooseUs />

        {/* ==============================
            COSMETIC DENTISTRY
        ============================== */}
        <Cosmetic />

        {/* ==============================
            DENTAL IMPLANTS
        ============================== */}
        <Implants />

        {/* ==============================
            EMERGENCY CARE
        ============================== */}
        <Emergency />

        {/* ==============================
            FAQ
        ============================== */}
        

        {/* ==============================
            APPOINTMENT
        ============================== */}
        

        {/* ==============================
            CONTACT
        ============================== */}
       

      </main>

      {/* ==============================
          FOOTER
      ============================== */}

      <Footer />
    </>
  );
};

export default Home;