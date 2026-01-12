import { memo } from "react";
import { Link } from "react-router-dom";

function MonthlyLuckyDrawSection() {
  return (
    <section className="bg-slate-50 py-20">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div
          className="
            grid grid-cols-1 lg:grid-cols-2
            gap-10
            rounded-3xl
            bg-white
            shadow-lg
            overflow-hidden
          "
        >
          {/* LEFT: IMAGE */}
          <div className="flex items-center justify-center bg-[#d3742a]/10 p-10">
            <div className="w-full max-w-md aspect-[4/5] flex items-center justify-center">
              <img
                src="https://res.cloudinary.com/dvtbbuxon/image/upload/v1767687174/WhatsApp_Image_2025-12-28_at_20.15.39_1_qi3zrd.jpg"
                alt="Monthly Lucky Draw Poster"
                className="w-full h-full object-contain"
                loading="lazy"
              />
            </div>
          </div>

          {/* RIGHT: CONTENT */}
          <div className="flex flex-col justify-center p-10 lg:p-14">
            <span className="text-sm font-medium uppercase tracking-wide text-orange-600">
              Multiple winners every month
            </span>

            <h2 className="mt-4 text-4xl sm:text-5xl font-semibold tracking-tight text-gray-900">
              Monthly Lucky Draw
            </h2>

            <p className="mt-6 text-lg text-gray-600 leading-relaxed">
              Every eligible visit gives you a chance to win exciting prizes.
              Simple entry, multiple winners, and fair monthly draws —
              our way of giving back to our local community.
            </p>

            <Link
              to="/terms-and-conditions"
              className="mt-6 inline-block text-base font-medium text-orange-600 underline underline-offset-4 hover:opacity-80"
            >
              Terms & Conditions
            </Link>

            {/* CTA */}
            <div className="mt-10">
              <a
                href="https://the-grooming-room-barbershop.square.site/win"
                target="_blank"
                rel="noopener noreferrer"
                className="
                  inline-flex items-center justify-center
                  rounded-xl
                  bg-orange-600
                  px-10 py-4
                  text-lg font-semibold
                  text-white
                  shadow-md
                  hover:bg-orange-700
                  hover:shadow-lg
                  transition
                "
              >
                I want to WIN my Free Gift
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default memo(MonthlyLuckyDrawSection);
