import { memo } from "react";

const DrawHero = memo(function DrawHero() {
  return (
    <section className="bg-white pt-20 pb-16">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* EYEBROW */}
        <span className="inline-block mb-6 rounded-full bg-orange-50 px-6 py-2 text-base font-semibold text-orange-600">
                  
Monthly Legends Draw – The Grooming Room Barbershop

        </span>

        {/* HEADING */}
        <h1
          className="font-semibold leading-tight tracking-tight bg-clip-text text-transparent"
          style={{
            backgroundImage: "linear-gradient(90deg, #0f172a 0%, #E6C35C 70%)",
            fontSize: "clamp(2.8rem, 5vw, 3.8rem)",
          }}
        >
          Get a Chance to Win our Monthly Draw

        </h1>

        {/* DESCRIPTION */}
        <p className="mt-6 max-w-2xl text-base sm:text-lg text-gray-600 leading-relaxed">
          Looking for a men’s haircut and beard trim near you and a chance to win cash prizes?
 At The Grooming Room Barbershop, every visit gives you more than a fresh look — it gives you a chance to win in our Monthly Legends Draw.
        </p>

        <p className="mt-3 max-w-2xl text-gray-600">
          Every eligible service automatically enters you into the draw —
          no extra steps required.
        </p>

        {/* TRUST / INFO ROW */}
        <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm font-medium text-gray-700">
          <span className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-orange-500" />
            In-store only
          </span>

          <span className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-orange-500" />
            Monthly winners
          </span>

          <span className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-orange-500" />
            Walk-ins welcome
          </span>
        </div>

        {/* CTA ROW */}
        <div className="mt-10 flex flex-col sm:flex-row gap-4">
          <a
            href="tel:+61288831729"
            className="
              inline-flex items-center justify-center
              rounded-full px-10 py-4
              font-semibold text-white
              bg-[#FF7A00] hover:bg-[#FF6A00]
              transition shadow-md
            "
          >
            Call to Book
          </a>

          <a
            href="/services"
            className="
              inline-flex items-center justify-center
              rounded-full px-10 py-4
              font-semibold text-gray-900
              border border-gray-300
              hover:bg-gray-50
              transition
            "
          >
            View Services
          </a>
        </div>

      </div>
    </section>
  );
});

export default DrawHero;
