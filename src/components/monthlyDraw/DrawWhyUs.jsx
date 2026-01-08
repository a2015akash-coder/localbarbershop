import { memo } from "react";

const reasons = [
  {
    title: "Local Kellyville Barbers",
    text: "Men’s haircuts delivered by experienced barbers serving Kellyville and the Hills District.",
  },
  {
    title: "Professional Beard Grooming",
    text: "Beard trimming, shaping, and clean line-ups tailored to your face shape and style.",
  },
  {
    title: "Haircut & Beard Combos",
    text: "Convenient haircut and beard trim combinations completed in one visit.",
  },
  {
    title: "Clean, Modern Styles",
    text: "Sharp fades, tidy finishes, and modern barber styles executed with attention to detail.",
  },
  {
    title: "Walk-Ins Welcome",
    text: "No appointment required — walk in during opening hours and get looked after.",
  },
];

const DrawWhyUs = memo(function DrawWhyUs() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* HEADER */}
        <div className="max-w-2xl mb-12">
          <h2
            className="font-semibold tracking-tight text-gray-900"
            style={{ fontSize: "clamp(2rem, 4vw, 2.6rem)" }}
          >
            Why The Grooming Room Barbershop?
          </h2>

          <p className="mt-4 text-gray-600">
            We focus on delivering reliable grooming services with clear
            expectations and consistent results.
          </p>
        </div>

        {/* CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {reasons.map((item) => (
            <div
              key={item.title}
              className="
                rounded-3xl bg-slate-50 p-6
                hover:bg-white hover:shadow-md
                transition
              "
            >
              <div className="h-[3px] w-10 rounded-full bg-orange-500 mb-4" />

              <h3 className="text-lg font-semibold text-gray-900">
                {item.title}
              </h3>

              <p className="mt-3 text-sm text-gray-600 leading-relaxed">
                {item.text}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
});

export default DrawWhyUs;