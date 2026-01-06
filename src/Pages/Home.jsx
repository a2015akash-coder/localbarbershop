import { memo } from 'react';
import Hero from '../components/landingpage/Hero';
import WhyChooseUs from '../components/landingpage/WhyChooseUs';
import OurWork from '../components/landingpage/OurWork';
import LocationHours from '../components/landingpage/LocationHours';
import InstagramSection from '../components/landingpage/InstagramSection';
import WhyLocalsChooseUs from '../components/landingpage/WhyLocalsChooseUs';
const Home = () => {
  return (
    <main>

      <Hero />
      <WhyLocalsChooseUs />
      <OurWork/>
      
      <InstagramSection />


      <LocationHours />
    </main>
  );
};

export default memo(Home);