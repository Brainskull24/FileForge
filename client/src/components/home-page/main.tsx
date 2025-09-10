// import TextUtils from "./TextUtils";
import Features from "./Features";
import PricingTeaser from "./PricingTeaser";
import Social from "./SocialProof";
import Footer from "./Footer";
import Header from "./Header";
import HeroSection from "./HeroSection";

export default function Homepage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <HeroSection />
      <Features />
      <Social />
      <PricingTeaser />
      <Footer />
    </div>
  );
}
