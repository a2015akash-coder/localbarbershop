import { memo } from "react";

import ProductsSection from "../components/services/ProductsSection";
import FAQs from "../components/services/FAQs";
import QuoteBanner from "../components/services/QuoteCard.jsx";
import OurService from "../components/services/OurService.jsx";
import ServicesHero from "../components/services/ServicesHero.jsx";
import WhyChooseUs from "../components/services/WhyChooseUs.jsx";

import SEO from "../components/SEO";
import { seoPages } from "../seo/pages";

const Services = () => {
  return (
    <main>
      {/* Page-level SEO */}
      <SEO {...seoPages.services} />

      {/* Page content */}
      <ServicesHero />
      <OurService />
      <ProductsSection />
      <WhyChooseUs />
      <QuoteBanner />
      <FAQs />
    </main>
  );
};

export default memo(Services);
