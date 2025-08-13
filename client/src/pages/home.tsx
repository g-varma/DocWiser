import { useEffect } from "react";
import Navigation from "@/components/navigation";
import HeroSection from "@/components/hero-section";
import ProblemSection from "@/components/problem-section";
import FeaturesSection from "@/components/features-section";
import DemoSection from "@/components/demo-section";
import TryNowSection from "@/components/try-now-section";

import Footer from "@/components/footer";

export default function Home() {
  useEffect(() => {
    // Fade-in animation on scroll
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, observerOptions);

    // Observe all fade-in elements
    document.querySelectorAll('.fade-in').forEach(el => {
      observer.observe(el);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <HeroSection />
      <ProblemSection />
      <FeaturesSection />
      <DemoSection />
      <TryNowSection />
      
      <Footer />
    </div>
  );
}
