import { memo } from 'react';
import Hero from '../components/landingpage/Hero';
import WhyChooseUs from '../components/landingpage/WhyChooseUs';
import OurWork from '../components/landingpage/OurWork';
import LocationHours from '../components/landingpage/LocationHours';
import InstagramSection from '../components/landingpage/InstagramSection';
import WhyLocalsChooseUs from '../components/landingpage/WhyLocalsChooseUs';
import AboutUs from '../components/landingpage/AboutUs';
import Testimonials from '../components/landingpage/Testimonials';
import { seoPages } from '../seo/pages';
import SEO from '../components/SEO';
const Home = () => {
  return (
    <main>
<SEO {...seoPages.home} />
      <Hero />
      <AboutUs />
      <OurWork />
      <WhyLocalsChooseUs />
      <WhyChooseUs />
      <InstagramSection />
      <Testimonials/>
      <LocationHours />
    </main>
  );
};

export default memo(Home);