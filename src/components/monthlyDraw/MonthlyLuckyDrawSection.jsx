import { memo } from "react";
import { Link } from "react-router-dom";

function MonthlyLuckyDrawSection() {
  return (
    <section className="bg-[#d3742a] py-20">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div
          className="
            grid grid-cols-1 lg:grid-cols-2
            items-center
            gap-12
          "
        >
          {/* LEFT: POSTER IMAGE */}
          <div className="flex justify-center lg:justify-start">
            <div className="w-full max-w-lg">
              <img
                src="https://res.cloudinary.com/dvtbbuxon/image/upload/v1768606203/WhatsApp_Image_2026-01-17_at_04.59.15_t75n4b.jpg"
                alt="Monthly Lucky Draw Poster"
                className="
                  w-full
                  rounded-xl
                  shadow-lg
                  object-contain
                "
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>

          {/* RIGHT: CONTENT */}
         {/* RIGHT: CONTENT */}
<div className="text-center lg:text-left text-white max-w-xl">
  {/* Eyebrow */}
  <span className="inline-block text-xs font-semibold tracking-[0.2em] uppercase text-white/80">
    Multiple winners every month
  </span>

  {/* Headline */}
  <h2 className="mt-4 text-4xl sm:text-5xl font-bold leading-tight tracking-tight">
    Monthly Lucky Draw
  </h2>

  {/* Supporting copy */}
  <p className="mt-4 text-base sm:text-lg text-white/90">
    Enter now for your chance to win exclusive grooming rewards and free gifts.
  </p>

  {/* CTA */}
  <div className="mt-8">
    <a
      href="https://the-grooming-room-barbershop.square.site/win"
      target="_blank"
      rel="noopener noreferrer"
      className="
        inline-flex items-center justify-center
        rounded-lg
        bg-white
        px-10 py-4
        text-lg font-semibold
        text-gray-900
        shadow-md
        hover:bg-gray-100
        transition
      "
    >
      I want to WIN my Free Gift
    </a>
  </div>

  {/* Terms */}
  <div className="mt-6">
    <Link
      to="/terms-and-conditions"
      className="text-sm text-white/80 underline underline-offset-4 hover:text-white transition"
    >
      Terms & Conditions apply
    </Link>
  </div>
</div>

        </div>
      </div>
    </section>
  );
}

export default memo(MonthlyLuckyDrawSection);
