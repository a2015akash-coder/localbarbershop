import { memo } from "react";
import { Link } from "react-router-dom";

function OurWork() {
  return (
    <section className="bg-slate-50 py-12">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        {/* HEADER */}
        <div className="mb-12 max-w-3xl">
          <h2
            className="font-semibold tracking-tight"
            style={{
              fontSize: "clamp(2rem, 4vw, 2.8rem)",
              backgroundImage: "linear-gradient(90deg, #0f172a, #E6C35C)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Barbering Services in Kellyville
          </h2>

          <p className="mt-4 text-lg text-gray-600">
            We aim to provide consistent barbering services so you leave well-groomed and comfortable. Our barbers work carefully and take the time to get the cut right.
          </p>
        </div>

        {/* SERVICES GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 bg-white">
          {/* MEN'S HAIRCUTS */}
          <Link
            to="/services"
            className="group rounded-2xl overflow-hidden border border-gray-200 hover:shadow-lg transition"
          >
            <div className="relative h-48 overflow-hidden">
              <img
                src="https://res.cloudinary.com/dvtbbuxon/image/upload/f_auto,q_auto,w_900/v1767534115/IMG_5409_shfn4c.jpg"
                alt="Men’s Haircuts"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                loading="lazy"
              />
            </div>

            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Men’s Haircuts
              </h3>

              <ul className="space-y-2 text-sm text-gray-700 list-disc list-inside">
                <li>Classic men’s haircuts</li>
                <li>Modern men’s haircuts</li>
                <li>Skin and taper fades</li>
                <li>Hairline tidy-up and finish</li>
              </ul>
            </div>
          </Link>

          {/* BEARD SERVICES */}
          <Link
            to="/services"
            className="group rounded-2xl overflow-hidden border border-gray-200 hover:shadow-lg transition"
          >
            <div className="relative h-48 overflow-hidden">
              <img
                src="https://res.cloudinary.com/dvtbbuxon/image/upload/v1768167106/WhatsApp_Image_2026-01-11_at_17.25.03_2_f88hyp.jpg"
                alt="Beard Trims and Shaping"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                loading="lazy"
              />
            </div>

            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Beard Trims & Beard Shaping
              </h3>

              <ul className="space-y-2 text-sm text-gray-700 list-disc list-inside">
                <li>Beard trimming and clean-ups</li>
                <li>Beard shaping and line-ups</li>
                <li>Short beard maintenance</li>
                <li>Full beard maintenance</li>
              </ul>
            </div>
          </Link>

          {/* GREY HAIR COLOURING */}
          <Link
            to="/services"
            className="group rounded-2xl overflow-hidden border border-gray-200  hover:shadow-lg transition"
          >
            <div className="relative h-48 overflow-hidden">
              <img
                src="https://res.cloudinary.com/dvtbbuxon/image/upload/v1767626526/25493682304_cipoxh.png"
                alt="Grey Hair Colouring Services"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                loading="lazy"
              />
            </div>

            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Grey Hair Colouring Services
              </h3>

              <ul className="space-y-2 text-sm text-gray-800 list-disc list-inside">
                <li >Full grey coverage</li>
                <li>Regular grooming maintenance</li>
                <li>Personalised consultations</li>
                <li>After-care advice</li>
              </ul>
            </div>
          </Link>
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <Link
            to="/services"
            className="inline-flex items-center justify-center rounded-full
                       border border-orange-300 px-8 py-3 font-semibold
                       text-orange-600 hover:bg-orange-50 transition"
          >
            View All Services
          </Link>
        </div>
      </div>
    </section>
  );
}

export default memo(OurWork);