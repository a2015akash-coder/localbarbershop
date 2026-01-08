import { memo } from "react";

function QuoteCard() {
  return (
      <section className="py-10">
      {/* WIDER CONTAINER */}
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6">
        <div className="relative overflow-hidden rounded-3xl">
          
          {/* BACKGROUND IMAGE */}
          <img
            src="https://res.cloudinary.com/dvtbbuxon/image/upload/v1767705592/back-view-barber-trimming-hair_23-2148298297_ldas6f.jpg"
            alt="Professional barbering in Kellyville"
            className="absolute inset-0 h-full w-full object-cover"
            loading="lazy"
          />

          {/* OVERLAY */}
          <div className="absolute inset-0 bg-black/55" />

          {/* CONTENT */}
          <div className="relative px-6 sm:px-12 py-10 sm:py-12 max-w-3xl">
            <p className="text-xl sm:text-2xl font-semibold text-white leading-snug">
              “Invest in your hair. It’s the crown you never take off.”
            </p>

            <div className="mt-4 flex items-center gap-3 text-sm text-gray-300">
              <span className="h-px w-8 bg-gray-400" />
              <span>Grooming Room Barber</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default memo(QuoteCard);
