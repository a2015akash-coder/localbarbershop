import { memo } from "react";
import MonthlyLuckyDrawSection from "../components/monthlyDraw/MonthlyLuckyDrawSection";

const MonthlyDraw = memo(function MonthlyDraw() {
  return (
    <main className="bg-white">
      <MonthlyLuckyDrawSection />

      {/* ================== DRAW FORM ================== */}
      <section className="mx-auto max-w-3xl px-6 pb-20">
        {/* Header */}
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-semibold text-gray-900">
            Enter the Monthly Lucky Draw
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Takes less than a minute. Winners drawn monthly.
          </p>
        </div>

        {/* Form Container */}
        <div className="relative overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
          {/* Aspect-ratio wrapper (prevents layout shift) */}
          <div className="relative w-full" style={{ height: "620px" }}>
            <iframe
              src="https://the-grooming-room-barbershop.square.site/win"
              title="Monthly Lucky Draw Entry"
              loading="lazy"
              className="absolute inset-0 h-full w-full"
              frameBorder="0"
              allow="payment"
            />
          </div>
        </div>

        {/* Trust note */}
        <p className="mt-4 text-center text-xs text-gray-500">
          Powered by Square • Secure submission
        </p>
      </section>
    </main>
  );
});

export default MonthlyDraw;
