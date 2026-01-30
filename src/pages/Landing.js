//this is the landing page
import { Header } from "../components/Common/Header";
import { Hero } from "../components/Common/Hero";
import { InputsOutputs } from "../components/Common/InputsOutputs";
import { Features } from "../components/Common/Features";
import { HowItWorks } from "../components/Common/HowItWorks";
import { CTA } from "../components/Common/CTA";
import { Footer } from "../components/Common/Footer";

export default function Landing({ onGetStarted, onLogoClick }) {
  return (
    <div className="min-h-screen bg-white">
      <Header onLogoClick={onLogoClick} />
      <main>
        <Hero />
        <InputsOutputs />
        <Features />
        <HowItWorks />
        <CTA onGetStarted={onGetStarted} />
      </main>
      <Footer />
    </div>
  );
}
