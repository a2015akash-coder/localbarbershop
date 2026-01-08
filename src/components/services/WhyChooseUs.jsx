import { memo } from "react";

const BULLETS = [
  {
    title: "Experienced Barbers",
    text: "Our barbers are trained in men’s haircuts, skin fades, beard trims, and colouring services, delivering consistent results across all services.",
  },
  {
    title: "Customer-Focused Service",
    text: "We take the time to understand what you’re after so your haircut or grooming service suits your routine and preferences.",
  },
  {
    title: "Attention to Detail",
    text: "From clean fades to tidy finishes, we focus on accuracy, balance, and proper execution with every service.",
  },
  {
    title: "Comfortable Environment",
    text: "Our barbershop provides a clean, relaxed space where clients can feel comfortable during their visit.",
  },
  {
    title: "Clear Service Expectations",
    text: "Services are discussed before starting, so you know what to expect and can ask questions if needed.",
  },
  {
    title: "Convenient Kellyville Location",
    text: "Located in Kellyville and serving the Hills District, with walk-ins welcome during opening hours.",
  },
];

const WhyChooseUs = memo(function WhyChooseUs() {
  return (
    <section className="bg-slate-50 py-16">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-stretch">

          {/* LEFT CARD */}
          <div className="flex flex-col rounded-3xl border border-gray-200 bg-white p-8">

            <h2
              className="font-semibold leading-tight tracking-tight bg-clip-text text-transparent"
              style={{
                backgroundImage: "linear-gradient(90deg, #0f172a, #E6C35C)",
                fontSize: "clamp(1.9rem, 3.5vw, 2.4rem)",
              }}
            >
              Why Choose The Grooming Room Barbershop?
            </h2>

            {/* IMAGE */}
            <div className="mt-8 overflow-hidden rounded-2xl bg-gray-100">
              <div className="aspect-video">
                <img
                  src="https://res.cloudinary.com/dvtbbuxon/image/upload/f_auto,q_auto,w_1200,c_limit/v1767729569/Gemini_Generated_Image_5citxn5citxn5cit_wmnse9.png"
                  alt="Inside the barbershop"
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>

            {/* CTA — DESKTOP ONLY */}
            <div className="mt-auto pt-8 hidden lg:flex flex-row gap-4">
              <a
                href="tel:+61288831729"
                className="
                  inline-flex items-center justify-center
                  rounded-full px-8 py-3
                  font-semibold text-white
                  bg-[#FF7A00] hover:bg-[#FF6A00]
                  transition shadow-sm
                "
              >
                Call to Book
              </a>

              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="
                  inline-flex items-center justify-center
                  rounded-full px-8 py-3
                  font-semibold text-gray-900
                  border border-gray-300
                  hover:bg-gray-50
                  transition
                "
              >
                Get Directions
              </a>
            </div>
          </div>

          {/* RIGHT CARD */}
          <div className="rounded-3xl border border-gray-200 bg-white p-8 flex flex-col justify-center">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {BULLETS.map((item) => (
                <div key={item.title}>
                  <h3 className="text-base font-semibold text-gray-900">
                    {item.title}
                  </h3>

                  <div className="mt-2 h-[3px] w-8 rounded-full bg-orange-500" />

                  <p className="mt-3 text-sm text-gray-600 leading-relaxed">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA — MOBILE ONLY (below BOTH cards) */}
          <div className="flex lg:hidden flex-col gap-4">
            <a
              href="tel:+61288831729"
              className="
                inline-flex items-center justify-center
                rounded-full px-8 py-3
                font-semibold text-white
                bg-[#FF7A00] hover:bg-[#FF6A00]
                transition shadow-sm
              "
            >
              Call to Book
            </a>

            <a
              href="https://maps.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="
                inline-flex items-center justify-center
                rounded-full px-8 py-3
                font-semibold text-gray-900
                border border-gray-300
                hover:bg-gray-50
                transition
              "
            >
              Get Directions
            </a>
          </div>

        </div>
      </div>
    </section>
  );
});

export default WhyChooseUs;
