import { memo } from "react";

const ServicesHero = memo(function ServicesHero() {
  return (
    <section className="bg-white pt-16 pb-14">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* EYEBROW */}
        <span className="inline-block mb-5 rounded-full bg-orange-50 px-6 py-2 text-base font-semibold text-orange-600">
         Men’s Haircuts & Beard Trims in Kellyville

        </span>

        {/* H1 */}
        <h1
          className="font-semibold leading-tight tracking-tight bg-clip-text text-transparent"
          style={{
            backgroundImage: "linear-gradient(90deg, #0f172a, #E6C35C)",
            fontSize: "clamp(2.6rem, 5vw, 3.6rem)",
          }}
        >
          Precision Haircuts & Expert Beard Barbers

        </h1>

        {/* SUPPORTING COPY */}
        <p className="mt-6 max-w-2xl text-base sm:text-lg text-gray-600 leading-relaxed">
          Clean fades, sharp lines, and professional grooming services delivered by
          experienced barbers. Walk-ins welcome at The Grooming Room Barbershop.
        </p>

        {/* TRUST SIGNAL ROW */}
        <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm font-medium text-gray-700">
          <span className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-orange-500" />
            Walk-ins Welcome
          </span>

          <span className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-orange-500" />
            Kellyville Local
          </span>

          <span className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-orange-500" />
            Experienced Barbers
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
            Talk To Us
          </a>

          <a
            href="https://maps.google.com"
            target="_blank"
            rel="noopener noreferrer"
            className="
              inline-flex items-center justify-center
              rounded-full px-10 py-4
              font-semibold text-gray-900
              border border-gray-300
              hover:bg-gray-50
              transition
            "
          >
            Get Directions
          </a>
        </div>

      </div>
    </section>
  );
});

export default ServicesHero;
