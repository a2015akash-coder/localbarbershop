import { memo } from "react";
import { Link } from "react-router-dom";

function AboutUs() {
  return (
    <section className="bg-white py-16">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* IMAGE BLOCK */}
          <div className="relative">
            <div className="absolute -inset-4 rounded-3xl bg-slate-100 hidden lg:block" />
            <div className="relative overflow-hidden rounded-3xl">
              <img
                src="https://res.cloudinary.com/dvtbbuxon/image/upload/f_auto,q_auto,w_900/v1767623965/IMG_2628_wzzrmi.jpg"
                alt="Inside the barbershop in Kellyville"
                className="h-[320px] w-full object-cover"
                loading="lazy"
              />
            </div>
          </div>

          {/* CONTENT PANEL */}
          <div className="relative bg-white rounded-3xl p-8 lg:p-10 shadow-sm">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-500">
              About Us
            </h3>

            <h2
              className="mt-3 font-semibold tracking-tight"
              style={{
                fontSize: "clamp(2rem, 4vw, 2.8rem)",
                backgroundImage:
                  "linear-gradient(90deg, #0f172a 0%, #a88c3a 60%, #e6c35c 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Straightforward barbering in Kellyville
            </h2>

            <p className="mt-5 text-base text-gray-600 leading-relaxed">
              We offer men’s haircuts, colouring, beard trims, and grooming
              services for everyday wear.
            </p>

            <p className="mt-4 text-base text-gray-600 leading-relaxed">
              Our barbers focus on clean cuts, tidy finishes, and consistent
              results.
            </p>

            {/* CTA */}
            <div className="mt-7">
              <Link
                to="/contact"
               className="rounded-full bg-[#FF7A00] px-8 py-3 text-white font-semibold hover:opacity-90 transition"
              >
                Get in Touch
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default memo(AboutUs);