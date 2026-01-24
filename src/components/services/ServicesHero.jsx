import { memo } from "react";

const HERO_IMAGE_URL =
  "https://res.cloudinary.com/dvtbbuxon/image/upload/f_auto,q_auto,w_2400,c_limit/v1767704060/interro_veoi1z.webp";

const ServicesHero = memo(function ServicesHero() {
  return (
    <section className="relative overflow-hidden bg-[#F8F6F2] pt-16 pb-14">
      {/* SEO IMAGE (indexable, not visible) */}
      <img
        src={HERO_IMAGE_URL}
        alt="Interior of The Grooming Room Barbershop in Kellyville showing barber chairs and waiting area"
        title="The Grooming Room Barbershop Interior – Kellyville"
        width="2400"
        height="1600"
        loading="eager"
        fetchpriority="high"
        className="sr-only"
      />

      {/* BACKGROUND IMAGE */}
      <div
        className="absolute inset-0"
        aria-hidden="true"
        style={{
          backgroundImage: `url('${HERO_IMAGE_URL}')`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "left center",
        }}
      />

      {/* OVERLAY */}
      <div
        className="absolute inset-0"
        aria-hidden="true"
        style={{
          background:
            "linear-gradient(90deg, rgba(255,255,255,0.97) 0%, rgba(255,255,255,0.92) 35%, rgba(255,255,255,0.6) 60%, rgba(255,255,255,0.25) 85%, rgba(255,255,255,0.15) 100%)",
        }}
      />

      {/* CONTENT */}
      <div className="relative max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* EYEBROW */}
        <span className="inline-block mb-5 rounded-full bg-orange-50 px-6 py-2 text-base font-semibold text-orange-600">
          Men’s Haircuts & Beard Trims in Kellyville
        </span>

        {/* H1 */}
        <h1
          className="
            font-semibold tracking-tight
            leading-[1.15] sm:leading-tight
            max-w-[22ch]
            bg-clip-text text-transparent
          "
          style={{
            backgroundImage: "linear-gradient(90deg, #0f172a, #E6C35C)",
            fontSize: "clamp(2rem, 4vw, 3rem)",
          }}
        >
          Precision Haircuts & Expert Beard Barbers
        </h1>

        {/* SUPPORTING COPY */}
        <p className="mt-6 max-w-2xl text-base sm:text-lg text-gray-700 leading-relaxed">
          Clean fades. Sharp lines. No rushed appointments. At The Grooming Room
          Barbershop, we provide men’s haircuts, skin fades, taper fades, and hair
          colouring services in Kellyville and the Hills District.
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
          {/* PRIMARY CTA */}
          <a
            href="tel:+61288831729"
            className="inline-flex items-center justify-center rounded-full px-10 py-4 font-semibold text-white bg-[#FF7A00] hover:bg-[#FF6A00] transition shadow-md"
          >
            Talk To Us
          </a>

          {/* SECONDARY CTA – SOFT FILL */}
          <a
            href="https://maps.google.com"
            target="_blank"
            rel="noopener noreferrer"
            className="
              inline-flex items-center justify-center
              rounded-full px-10 py-4
              font-semibold
              text-[#7A3E00]
              bg-[#FFF3E6]
              hover:bg-[#FFE6CF]
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
