import { memo } from "react";

const PromoHero = memo(function PromoHero() {
  return (
    <section className="bg-white py-6 lg:py-8">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">

          {/* ================= LEFT – CONTENT ================= */}
          <div className="flex">
            <div className="w-full rounded-3xl bg-white/70 backdrop-blur-sm p-7 lg:p-8 flex flex-col gap-6">

              {/* Eyebrow */}
              <span className="inline-flex w-fit items-center rounded-full bg-orange-100 px-4 py-1.5 text-sm font-medium text-orange-700">
                Monthly Lucky Draw – The Grooming Room Barbershop
              </span>

              {/* Heading */}
              <h1 className="max-w-lg text-[1.75rem] sm:text-3xl font-semibold leading-tight tracking-tight text-slate-900">
                Get a chance to win when you get a{" "}
                <span className="text-[#FF7A00]">
                  Haircut, Beard trim or Colouring in Kellyville
                </span>
              </h1>

              {/* Description */}
              <div className="flex flex-col gap-3 text-[0.95rem] leading-relaxed text-slate-600">
                <p>
                  Looking for a{" "}
                  <span className="font-semibold">
                    men’s haircut and beard trim near you
                  </span>{" "}
                  and a chance to win cash prizes?
                </p>

                <p>
                  At{" "}
                  <span className="font-semibold">
                    The Grooming Room Barbershop
                  </span>
                  , every visit gives you more than a fresh look — it gives you a
                  chance to win in our{" "}
                  <span className="font-semibold">
                    Monthly Legends Draw
                  </span>
                  .
                </p>

                <p>
                  Whether you’re booking{" "}
                  <span className="font-semibold">
                    professional fades, a haircut, colouring and beard trim
                  </span>
                  , or a full grooming session, every eligible service puts you
                  into the draw automatically.
                </p>
              </div>

              {/* Entry Note */}
              <p className="pt-2 text-xs text-slate-500 border-t border-slate-100">
                One entry per purchase · Multiple winners every month
              </p>
            </div>
          </div>

          {/* ================= RIGHT – IMAGE CARD ================= */}
          <div className="flex">
            <div
              className="
                relative w-full rounded-3xl
                p-5
                bg-gradient-to-br from-orange-100/60 via-orange-50/40 to-transparent
                backdrop-blur-sm
                shadow-[0_20px_40px_rgba(0,0,0,0.08)]
                flex items-center justify-center
              "
            >
              {/* subtle border */}
              <div className="absolute inset-0 rounded-3xl ring-1 ring-orange-200/40" />

              {/* flyer */}
              <div className="relative w-full max-w-[380px] overflow-hidden rounded-2xl bg-[#1F1F1F] shadow-xl">
                <div className="aspect-[3/4]">
                  <img
                    src="https://res.cloudinary.com/dvtbbuxon/image/upload/v1769023240/WhatsApp_Image_2026-01-22_at_00.21.42_nekhqv.jpg"
                    alt="Monthly Lucky Draw $1,000 Coles Voucher Giveaway"
                    className="h-full w-full object-cover"
                    loading="eager"
                    fetchpriority="high"
                  />
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
});

export default PromoHero;
