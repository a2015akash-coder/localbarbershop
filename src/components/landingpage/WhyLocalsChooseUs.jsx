import { memo } from "react";

const FEATURES = [
  {
    title: "200+ Google Reviews",
    subtitle: "Trusted by Kellyville locals",
    image:
      "https://res.cloudinary.com/dvtbbuxon/image/upload//f_auto,q_auto,w_900/v1767729569/Gemini_Generated_Image_5citxn5citxn5cit_wmnse9.png",
  },
  {
    title: "Clean fades. Every time.",
    subtitle: "Experienced local barbers",
    image:
      "https://res.cloudinary.com/dvtbbuxon/image/upload/f_auto,q_auto,w_900/v1767728661/IMG_5410_gxlp6v.jpg",
  },
  {
    title: "Great with kids",
    subtitle: "Relaxed, friendly service",
    image:
      "https://res.cloudinary.com/dvtbbuxon/image/upload/f_auto,q_auto,w_900/v1767728468/IMG_7487_ivehgz.jpg",
  },
];

function WhyLocalsChooseUs() {
  return (
    <section className="bg-slate-50 py-12">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">

        {/* HEADER */}
        <div className="mb-10 max-w-3xl">
          <h2
            className="font-semibold tracking-tight"
            style={{
              fontSize: "clamp(2.4rem, 4.5vw, 3.4rem)",
              backgroundImage:
                "linear-gradient(90deg, #0f172a 0%, #a88c3a 60%, #e6c35c 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Why Locals Choose Us
          </h2>

       <p className="mt-4 text-lg text-gray-600 leading-relaxed lg:whitespace-nowrap">
  We focus on the basics done right — quality haircuts, friendly service, and a clean, relaxed space that keeps locals coming back.
</p>

        </div>

        {/* CARDS */}
      {/* CARDS */}
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
  {FEATURES.map((item, i) => (
    <div
      key={i}
      className="
        group rounded-3xl bg-white
        shadow-md hover:shadow-xl
        transition-all duration-500 ease-out
        hover:-translate-y-1
        overflow-hidden
      "
    >
      {/* IMAGE */}
      <div className="relative aspect-[5/4] overflow-hidden">

        <img
          src={item.image}
          alt={item.title}
          className="
            h-full w-full object-cover
            transition-transform duration-700 ease-out
            group-hover:scale-[1.06]
          "
          loading="lazy"
        />
      </div>

      {/* TEXT BELOW IMAGE */}
      <div className="px-6 py-6 text-center">
        <h3 className="text-xl font-semibold text-gray-900">
          {item.title}
        </h3>

        <p className="mt-2 text-sm text-gray-600">
          {item.subtitle}
        </p>
      </div>
    </div>
  ))}
</div>




        {/* CTA ROW */}
       <div className="mt-12 flex flex-col sm:flex-row items-center gap-4">

          <a
            href="tel:+61288831729"
            className="inline-flex items-center justify-center rounded-full
                       bg-orange-500 px-10 py-4 font-semibold text-white
                       hover:bg-orange-600 transition"
          >
            Call Now
          </a>

          <a
            href="https://maps.google.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-full
                       border border-gray-300 px-10 py-4 font-semibold
                       text-gray-900 hover:bg-gray-50 transition"
          >
            Get Directions
          </a>
        </div>



      </div>
    </section>
  );
}

export default memo(WhyLocalsChooseUs);
