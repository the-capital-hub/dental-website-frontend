import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";

// =====================================================
// PUBLIC PAGES
// =====================================================

import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import Services from "./pages/Services/Services";
import Doctors from "./pages/Doctors/Doctors";
import AIReceptionist from "./pages/AIReceptionist/AIReceptionist";
import Contact from "./pages/Contact/Contact";
import FAQ from "./pages/FAQ/FAQ";
import PatientTestimonials from "./pages/PatientTestimonials/PatientTestimonials";
import Pricing from "./pages/Pricing/Pricing";
import WhatsApp from "./pages/WhatsApp/WhatsApp";
import Appointment from "./pages/Appointment/Appointment";

// =====================================================
// ADMIN PAGES
// =====================================================

import AdminLogin from "./admin/pages/AdminLogin";
import Dashboard from "./admin/pages/Dashboard";
import Appointments from "./admin/pages/Appointments";
import Patients from "./admin/pages/Patients";
import Leads from "./admin/pages/Leads";
import DoctorsA from "./admin/pages/Doctors";
import IvyConversations from "./admin/pages/IvyConversations";
import Reviews from "./admin/pages/Reviews";
import ServicesA from "./admin/pages/Services";
import Settings from "./admin/pages/Settings";

// =====================================================
// PROTECTED ADMIN ROUTE
// =====================================================

const ProtectedAdminRoute = ({
  children,
}) => {
  const localToken =
    localStorage.getItem("adminToken");

  const sessionToken =
    sessionStorage.getItem("adminToken");

  const token =
    localToken || sessionToken;

  if (!token) {
    return (
      <Navigate
        to="/admin/login"
        replace
      />
    );
  }

  return children;
};

// =====================================================
// IVY PUBLIC ONLY
// =====================================================

const PublicIvy = () => {
  const location = useLocation();

  const isAdminPage =
    location.pathname.startsWith("/admin");

  if (isAdminPage) {
    return null;
  }

  return <AIReceptionist />;
};

// =====================================================
// APP
// =====================================================

const App = () => {
  return (
    <BrowserRouter>

      <Routes>

        {/* =================================================
            PUBLIC WEBSITE
        ================================================= */}

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/about"
          element={<About />}
        />

        <Route
          path="/services"
          element={<Services />}
        />

        <Route
          path="/doctors"
          element={<Doctors />}
        />

        <Route
          path="/patient-testimonials"
          element={
            <PatientTestimonials />
          }
        />

        <Route
          path="/contact"
          element={<Contact />}
        />

        <Route
          path="/faq"
          element={<FAQ />}
        />

        <Route
          path="/pricing"
          element={<Pricing />}
        />

        <Route
          path="/whatsapp"
          element={<WhatsApp />}
        />

        <Route
          path="/appointment"
          element={<Appointment />}
        />

        {/* =================================================
            ADMIN LOGIN
        ================================================= */}

        <Route
          path="/admin/login"
          element={<AdminLogin />}
        />

        {/* =================================================
            PROTECTED ADMIN ROUTES
        ================================================= */}

        <Route
          path="/admin/dashboard"
          element={
            <ProtectedAdminRoute>
              <Dashboard />
            </ProtectedAdminRoute>
          }
        />

        <Route
          path="/admin/appointments"
          element={
            <ProtectedAdminRoute>
              <Appointments />
            </ProtectedAdminRoute>
          }
        />

        <Route
          path="/admin/patients"
          element={
            <ProtectedAdminRoute>
              <Patients />
            </ProtectedAdminRoute>
          }
        />

        <Route
          path="/admin/leads"
          element={
            <ProtectedAdminRoute>
              <Leads />
            </ProtectedAdminRoute>
          }
        />

        <Route
          path="/admin/doctors"
          element={
            <ProtectedAdminRoute>
              <DoctorsA />
            </ProtectedAdminRoute>
          }
        />

        <Route
          path="/admin/ivy-conversations"
          element={
            <ProtectedAdminRoute>
              <IvyConversations />
            </ProtectedAdminRoute>
          }
        />

        <Route
          path="/admin/reviews"
          element={
            <ProtectedAdminRoute>
              <Reviews />
            </ProtectedAdminRoute>
          }
        />

        <Route
          path="/admin/services"
          element={
            <ProtectedAdminRoute>
              <ServicesA />
            </ProtectedAdminRoute>
          }
        />

        <Route
          path="/admin/settings"
          element={
            <ProtectedAdminRoute>
              <Settings />
            </ProtectedAdminRoute>
          }
        />

        {/* =================================================
            FALLBACK
        ================================================= */}

        <Route
          path="*"
          element={
            <Navigate
              to="/"
              replace
            />
          }
        />

      </Routes>

      {/* =================================================
          IVY AI RECEPTIONIST
          PUBLIC WEBSITE ONLY
      ================================================= */}

      <PublicIvy />

    </BrowserRouter>
  );
};

export default App;