import { memo } from 'react';
import ContactInfo from '../components/contact/ContactInfo';
import ContactMap from '../components/contact/ContactMap';
import ContactSection from '../components/contact/ContactSection';

const Contact = () => {
  return (
   <main>
  
  
    <ContactInfo/>
    <ContactMap/>
   </main>
  );
};

export default memo(Contact);