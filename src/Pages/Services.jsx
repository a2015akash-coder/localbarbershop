import { memo } from 'react';
  import ProductsSection from '../components/services/ProductsSection';
import FAQs from '../components/services/FAQs';
import QuoteBanner from '../components/services/QuoteCard.jsx';
import OurService from '../components/services/OurService.jsx';

const Services = () => {
  return (
    <main>
     <OurService/>
<ProductsSection/>
<QuoteBanner/>
<FAQs/>
    </main>
  );
};

export default memo(Services);