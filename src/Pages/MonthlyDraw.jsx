import { memo } from "react";
import MonthlyLuckyDrawSection from "../components/monthlyDraw/MonthlyLuckyDrawSection";

const MonthlyDraw = memo(function MonthlyDraw() {
  return (
    <main className="bg-white">
      <MonthlyLuckyDrawSection />
    </main>
  );
});

export default MonthlyDraw;
