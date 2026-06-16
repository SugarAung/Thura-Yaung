import HeroSection from '@/components/landing/HeroSection';
import HowItWorksSection from '@/components/landing/HowItWorksSection';
import CategoriesPreview from '@/components/landing/CategoriesPreview';
import PrivacyHighlightSection from '@/components/landing/PrivacyHighlightSection';
import FeaturedProfessionals from '@/components/landing/FeaturedProfessionals';
import CtaSection from '@/components/landing/CtaSection';

export default function LandingPage() {
  return (
    <>
      <HeroSection />
      <HowItWorksSection />
      <CategoriesPreview />
      <PrivacyHighlightSection />
      <FeaturedProfessionals />
      <CtaSection />
    </>
  );
}
