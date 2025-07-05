import { Routes, Route } from "react-router-dom";
import AuthPage from "./components/Authpage/Login";
import Homepage from "./components/Homepage/Homepage";
import PricingPage from "./components/Pricing/Pricing";
import { UniversalConverterDashboard } from "./components/FileConversion/universal-converter-dashboard";
import Base64Tool from "./components/Base64Encoder";
import AccountSettingsPage from "./components/Account/main";
import BillingCredits from "./components/analytics/billing-analytics";
import HelpCenter from "./components/support/main";
import SecurityPrivacyPage from "./components/privacy/main";
import TermsOfService from "./components/terms/main";
import Maintenance from "./components/maintainence/main";
import AdminDashboard from "./components/Admin/main";
import ContactSupportPage from "./components/contact/main";
import CloudIntegrationPage from "./components/Cloud/main";
import CLIDocsPage from "./components/CLI/main";
import ForgotPasswordPage from "./components/Authpage/ForgotPassword";

import ProtectedRoute from "./routes/ProtectedRoute";
import PublicRoute from "./routes/PublicRoute";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route
        path="/login"
        element={
          <PublicRoute>
            <AuthPage />
          </PublicRoute>
        }
      />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/pricing" element={<PricingPage />} />
      <Route path="/terms" element={<TermsOfService />} />
      <Route path="/policy" element={<SecurityPrivacyPage />} />
      <Route path="/maintainence" element={<Maintenance />} />
      <Route path="/api/docs" element={<div>API Docs</div>} />
      <Route path="/contact" element={<ContactSupportPage />} />
      <Route path="/help" element={<HelpCenter />} />

      {/* Protected Routes */}
      <Route
        path="/convertor"
        element={
          <ProtectedRoute>
            <UniversalConverterDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/tools/base64"
        element={
          <ProtectedRoute>
            <Base64Tool />
          </ProtectedRoute>
        }
      />
      <Route
        path="/account"
        element={
          <ProtectedRoute>
            <AccountSettingsPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/analytics"
        element={
          <ProtectedRoute>
            <BillingCredits />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/cloud"
        element={
          <ProtectedRoute>
            <CloudIntegrationPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/cli"
        element={
          <ProtectedRoute>
            <CLIDocsPage />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
