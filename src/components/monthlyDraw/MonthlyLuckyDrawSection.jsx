import { memo } from "react";
import { Link } from "react-router-dom";

function MonthlyLuckyDrawSection() {
  return (
    <section className="bg-[#d3742a] min-h-screen flex items-start pt-6 sm:pt-10 lg:pt-0 lg:items-center">

      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 w-full">
        <div
          className="
            grid grid-cols-1 lg:grid-cols-2
            gap-8 lg:gap-12
            items-center
          "
        >
          {/* ================= RIGHT (MOBILE FIRST): FORM ================= */}
          <div className="order-1 lg:order-2 w-full">
            <div className="relative overflow-hidden rounded-2xl bg-white shadow-xl">
              {/* Header */}
              <div className="border-b border-gray-200 px-5 py-4">
                <h3 className="text-base font-semibold text-gray-900">
                  Enter the Monthly Lucky Draw
                </h3>
                <p className="mt-1 text-xs text-gray-600">
                  Secure entry • Powered by Google Forms
                </p>
              </div>

              {/* Iframe */}
              <div className="relative w-full h-[520px] sm:h-[560px]">
                <iframe
                  src="https://docs.google.com/forms/d/e/1FAIpQLSd1c3H80EL86usVkKmOCxFRyt0Xxw9vcvmfsChgjvbhVZXzyg/viewform?usp=sharing&ouid=109555669226479084952"
                  title="Monthly Lucky Draw Entry"
                  loading="lazy"
                  className="absolute inset-0 h-full w-full"
                  frameBorder="0"
                  allow="payment"
                />
              </div>
            </div>

            <p className="mt-3 text-center text-xs text-white/80">
              Your details are secure and never shared.
            </p>
          </div>

          {/* ================= LEFT: CONTENT ================= */}
          <div className="order-2 lg:order-1 text-white max-w-xl">
            {/* Poster (scaled to fit viewport) */}
            <div className="mb-6 max-w-md">
              <img
                src="https://res.cloudinary.com/dvtbbuxon/image/upload/v1768606203/WhatsApp_Image_2026-01-17_at_04.59.15_t75n4b.jpg"
                alt="Monthly Lucky Draw Poster"
                className="w-full rounded-xl shadow-lg object-contain"
                loading="lazy"
                decoding="async"
              />
            </div>

            {/* Eyebrow */}
            <span className="inline-block text-xs font-semibold tracking-[0.2em] uppercase text-white/80">
              Multiple winners every month
            </span>

            {/* Headline */}
            <h2 className="mt-3 text-3xl sm:text-4xl font-bold leading-tight tracking-tight">
              Monthly Lucky Draw
            </h2>

            {/* Copy */}
            <p className="mt-3 text-sm sm:text-base text-white/90 max-w-lg">
              Enter now for your chance to win exclusive grooming rewards and
              free gifts. Takes less than a minute.
            </p>

            {/* Terms */}
            <div className="mt-4">
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
