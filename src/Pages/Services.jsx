import { memo } from 'react';
  import ProductsSection from '../components/services/ProductsSection';
import FAQs from '../components/services/FAQs';
import QuoteBanner from '../components/services/QuoteCard.jsx';
import OurService from '../components/services/OurService.jsx';
import ServicesHero from '../components/services/ServicesHero.jsx';
import WhyChooseUs from '../components/services/WhyChooseUs.jsx';

const Services = () => {
  return (
    <main>
      <ServicesHero/>
     <OurService/>
<ProductsSection/>
<QuoteBanner/>
<WhyChooseUs/>
<FAQs/>
    </main>
  );
};

export default memo(Services);