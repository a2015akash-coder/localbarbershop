import SEO from "../components/SEO";
import { seoPages } from "../seo/pages";

import HowToEnterDraw from "../components/promotion/HowToEnterDraw";
import MonthlyPrizePool from "../components/promotion/MonthlyPrizePool";
import PromoFinalCTA from "../components/promotion/PromoFinalCTA";
import PromoHero from "../components/promotion/PromoHero";

const Promotion = () => {
  const seo = seoPages.promotions;

  return (
    <>
      <SEO
        title={seo.title}
        description={seo.description}
        canonical={seo.canonical}
      />

      <div>
        <PromoHero />
        <MonthlyPrizePool />
        <HowToEnterDraw />
        <PromoFinalCTA />
      </div>
    </>
  );
};

export default Promotion;
