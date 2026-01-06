import { memo } from "react";
const DRAW_IMAGE =
  "https://res.cloudinary.com/dvtbbuxon/image/upload/f_auto,q_auto,w_1200/v1767687174/WhatsApp_Image_2025-12-28_at_20.15.39_1_qi3zrd.jpg";


const MonthlyDrawHero = () => {
  return (
    <section className="bg-white overflow-hidden">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center py-14 lg:py-20">

          {/* LEFT CONTENT */}
          <div className="max-w-xl">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold leading-tight tracking-tight text-black">
              Monthly Legends Draw
              <br />
              <span className="text-[#8B6B2E]">
                The Grooming Room Barbershop
              </span>
            </h1>

            <p className="mt-5 text-base sm:text-lg text-gray-600 leading-relaxed">
              Get a chance to win when you get a haircut or beard trim in
              Kellyville. Every eligible service automatically puts you into our
              Monthly Legends Draw.
            </p>

            {/* Prize Summary */}
            <div className="mt-6 space-y-2 text-sm sm:text-base text-gray-800">
              <p className="font-medium">
                50+ winners every month, including:
              </p>
              <ul className="grid grid-cols-2 gap-x-6 gap-y-2">
                <li>$100 × 1 winner</li>
                <li>$50 × 4 winners</li>
                <li>$30 × 10 winners</li>
                <li>$20 × 10 winners</li>
                <li>$10 × 25 winners</li>
              </ul>
            </div>

            {/* CTA */}
            <div className="mt-8 flex gap-4">
              <a
                href="#how-to-enter"
                className="
                  inline-flex items-center justify-center
                  rounded-full px-7 py-3
                  text-sm font-semibold text-white
                  bg-[#FF7A00] hover:bg-[#FF6A00]
                  transition-colors shadow-md
                "
              >
                How to Enter
              </a>

              <a
                href="https://maps.google.com/?q=90+Wrights+Road,+Kellyville+NSW+2155"
                target="_blank"
                rel="noopener noreferrer"
                className="
                  inline-flex items-center justify-center
                  rounded-full px-7 py-3
                  text-sm font-semibold text-gray-900
                  border border-gray-300
                  hover:bg-gray-100
                  transition-colors
                "
              >
                Visit Barbershop
              </a>
            </div>
          </div>

         {/* RIGHT COLUMN — IMAGE CARD */}
{/* RIGHT COLUMN — IMAGE CARD */}
<div className="relative">
  <div className="rounded-2xl border border-gray-200 shadow-lg overflow-hidden bg-white">

    {/* IMAGE WRAPPER — CONTROLS HEIGHT */}
    <div className="relative h-[320px] sm:h-[360px] lg:h-[400px]">
      <img
        src={DRAW_IMAGE}
        alt="Monthly Legends Draw at The Grooming Room Barbershop Kellyville"
        className="absolute inset-0 w-full h-full object-cover"
        loading="eager"
        decoding="async"
      />
    </div>

    {/* CARD FOOTER (OPTIONAL CONTEXT) */}
    <div className="px-5 py-4 bg-white">
      <p className="text-sm text-gray-600">
        50+ winners every month with eligible haircut and beard trim services.
      </p>
    </div>

  </div>
</div>



        </div>
      </div>
    </section>
  );
};

export default memo(MonthlyDrawHero);
