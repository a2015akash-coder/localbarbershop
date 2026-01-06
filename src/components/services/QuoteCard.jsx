import { memo } from "react";

function QuoteCard() {
  return (
    <section className="bg-white section-spacing">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">

        {/* CARD */}
        <div className="overflow-hidden rounded-3xl border border-gray-200 bg-black">
          <div className="relative h-[220px] sm:h-[260px] lg:h-[300px]">

            {/* IMAGE */}
            <img
              src="https://res.cloudinary.com/dvtbbuxon/image/upload/v1767705592/back-view-barber-trimming-hair_23-2148298297_ldas6f.jpg"
              alt="Barber at work at The Grooming Room"
              loading="lazy"
              decoding="async"
              className="absolute inset-0 h-full w-full object-cover opacity-65"
            />

            {/* OVERLAY */}
            <div className="absolute inset-0 bg-black/55" />

            {/* CONTENT */}
            <div className="relative z-10 flex h-full items-center">
              <div className="max-w-2xl px-6 sm:px-10">

                {/* QUOTE */}
                <p className="text-2xl sm:text-3xl lg:text-4xl font-semibold leading-snug text-white">
                  <span className="block text-4xl opacity-50 mb-2">“</span>
                  Invest in your hair.
                  <br />
                  It’s the crown you never take off.
                </p>

                {/* AUTHOR */}
                <div className="mt-4 flex items-center gap-4">
                  <span className="h-px w-8 bg-white/60" />
                  <span className="text-sm sm:text-base text-white/80">
                    Grooming Room Barber
                  </span>
                </div>

              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}

export default memo(QuoteCard);
