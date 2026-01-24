import { memo } from 'react';
import ContactInfo from '../components/contact/ContactInfo';
import ContactMap from '../components/contact/ContactMap';
import SEO from '../components/SEO';
import { seoPages } from '../seo/pages';

const Contact = () => {
  return (
   <main>
  
  <SEO {...seoPages.contact} />

    <ContactInfo/>
    <ContactMap/>
   </main>
  );
};

export default memo(Contact);