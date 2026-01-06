import { memo } from "react";
import { Star, ExternalLink } from "lucide-react";

/* ------------------ REVIEWS ------------------ */
const REVIEWS = [
  {
    name: "Bruce Wright",
    rating: 5,
    text: "Dani is the ultimate barber. Been following him around for years and the quality is always consistent.",
  },
  {
    name: "Paul Jefferson",
    rating: 5,
    text: "A wonderful service. Dilen does an excellent job every time. Highly recommended.",
  },
  {
    name: "TM Hng",
    rating: 4,
    text: "Great service and friendly staff. Always a good experience.",
  },
];

function Testimonials() {
  return (
   <section className="bg-white section-spacing">

      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">

        {/* HEADER */}
        <div className="mb-16 max-w-2xl">
          {/* LABEL */}
          <span className="inline-block rounded-full bg-orange-50 px-5 py-2 text-base font-semibold tracking-wide text-orange-600">
            Testimonials
          </span>

          {/* HEADING */}
          <h2
            className="mt-7 font-semibold leading-tight tracking-tight"
            style={{
              fontSize: "clamp(2.3rem, 4.8vw, 3.2rem)",
              backgroundImage: "linear-gradient(90deg, #0f172a, #E6C35C)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Trusted by Local Clients
          </h2>

          {/* DESCRIPTION */}
          <p className="mt-6 max-w-lg text-base sm:text-lg text-gray-600 leading-relaxed">
            Real feedback from clients who trust us for consistent,
            high-quality grooming.
          </p>
        </div>

        {/* GOOGLE SUMMARY */}
        <div className="mb-12 flex items-center gap-4">
          <div className="flex items-center gap-1 text-[#FFB400]">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={18} fill="currentColor" stroke="none" />
            ))}
          </div>

          <p className="text-gray-700 font-medium">
            4.4 out of 5 based on 200+ Google reviews
          </p>
        </div>

        {/* REVIEWS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {REVIEWS.map((review) => (
            <div
              key={review.name}
              className="rounded-2xl border border-gray-100 p-6 shadow-sm transition-shadow hover:shadow-lg"
            >
              {/* PROFILE */}
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-200 text-sm font-semibold text-gray-700">
                  {review.name.charAt(0)}
                </div>

                <div>
                  <p className="font-semibold text-gray-900">
                    {review.name}
                  </p>

                  <div className="flex items-center gap-1 text-[#FFB400]">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star
                        key={i}
                        size={14}
                        fill="currentColor"
                        stroke="none"
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* REVIEW TEXT */}
              <p className="mt-4 text-gray-700 leading-relaxed">
                “{review.text}”
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <a
            href="https://www.google.com/maps/place/The+Grooming+Room+Barber+Shop+%E2%80%93+Kellyville+Barber/@-33.7129269,150.9722231,17z/data=!3m1!4b1!4m6!3m5!1s0x6b12a1c8d7851943:0x7afe96792994c1c0!8m2!3d-33.7129269!4d150.9722231!16s%2Fg%2F11clwnkk_c?entry=ttu&g_ep=EgoyMDI1MTIwOS4wIKXMDSoKLDEwMDc5MjA3MUgBUAM%3D"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-orange-200 px-8 py-3 font-semibold text-orange-600 hover:bg-orange-50 transition-colors"
          >
            Read all reviews on Google
            <ExternalLink size={16} />
          </a>
        </div>

      </div>
    </section>
  );
}

export default memo(Testimonials);
