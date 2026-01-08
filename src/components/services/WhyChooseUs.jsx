import { memo } from "react";

const WhyChooseUs = memo(function WhyChooseUs() {
  return (
    <section className="bg-slate-50 py-16">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* HEADER */}
        <div className="max-w-2xl mb-12">
          <span className="inline-block mb-4 rounded-full bg-orange-50 px-6 py-2 text-base font-semibold text-orange-600">
            Why Choose Us
          </span>

          <h2
            className="font-semibold leading-tight tracking-tight bg-clip-text text-transparent"
            style={{
              backgroundImage: "linear-gradient(90deg, #0f172a, #E6C35C)",
              fontSize: "clamp(2.2rem, 4.5vw, 3rem)",
            }}
          >
            Straightforward barbering you can rely on
          </h2>

          <p className="mt-5 text-base sm:text-lg text-gray-600">
            We focus on delivering clean, consistent grooming services with clear
            expectations — no rushed appointments, no surprises.
          </p>
        </div>

        {/* POINTS GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
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
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-3xl bg-white p-6 shadow-sm hover:shadow-md transition"
            >
              <h3 className="text-lg font-semibold text-gray-900">
                {item.title}
              </h3>

              <div className="mt-2 h-[3px] w-10 rounded-full bg-orange-500" />

              <p className="mt-4 text-sm text-gray-600 leading-relaxed">
                {item.text}
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-14 flex flex-col sm:flex-row justify-center gap-4">
          <a
            href="tel:+61288831729"
            className="
              inline-flex items-center justify-center
              rounded-full px-10 py-4
              font-semibold text-white
              bg-[#FF7A00] hover:bg-[#FF6A00]
              transition shadow-md
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
              rounded-full px-10 py-4
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
    </section>
  );
});

export default WhyChooseUs;
