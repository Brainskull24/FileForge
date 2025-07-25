import TextUtils from "./TextUtils";
import Features from "./Features";
import PricingTeaser from "./PricingTeaser";
import Social from "./SocialProof";
import Footer from "./Footer";
import Header from "./Header";
import HeroSection from "./HeroSection";

export default function Homepage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <HeroSection />

      {/* Text Utils Section */}
      <TextUtils />

      {/* Features Showcase */}
      <Features />

      {/* Social Proof Section */}
      <Social />

      {/* Pricing Teaser */}
      <PricingTeaser />

      {/* Footer */}
      <Footer />
    </div>
  );
}
