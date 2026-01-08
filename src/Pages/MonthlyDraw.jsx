import { memo } from "react";
import DrawHero from "../components/monthlyDraw/DrawHero";
import DrawDetails from "../components/monthlyDraw/DrawDetails";
import DrawWhyUs from "../components/monthlyDraw/DrawWhyUs";
import DrawEntry from "../components/monthlyDraw/DrawEntry";



const MonthlyDraw = memo(function MonthlyDraw() {
  return (
    <main className="bg-white">
     <DrawHero/>
     <DrawDetails/>
     <DrawWhyUs/>
     <DrawEntry/>
    </main>
  );
});

export default MonthlyDraw;