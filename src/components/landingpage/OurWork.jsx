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
            We provide consistent barbering services so you leave well-groomed
            and comfortable. Our barbers take the time to get the cut right.
          </p>
        </div>

        {/* SERVICES GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* MEN’S HAIRCUTS */}
          <Link
            to="/mens-haircuts-beard-trims-kellyville"
            className="group rounded-2xl overflow-hidden border border-gray-200 bg-white hover:shadow-lg transition"
          >
            <div className="relative aspect-[4/3] overflow-hidden">
              <img
                src="https://res.cloudinary.com/dvtbbuxon/image/upload/c_fill,g_auto:faces,w_800,h_600,f_auto,q_auto/v1767534115/IMG_5409_shfn4c.jpg"
                alt="Barbers and customer posing inside The Grooming Room Barbershop in Kellyville"
                className="
                  h-full w-full object-cover
                  transition-transform duration-500
                  group-hover:scale-[1.04]
                "
              title="Friendly team at The Grooming Room Barbershop – Kellyville"
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
            to="/mens-haircuts-beard-trims-kellyville"
            className="group rounded-2xl overflow-hidden border border-gray-200 bg-white hover:shadow-lg transition"
          >
            <div className="relative aspect-[4/3] overflow-hidden">
              <img
                src="https://res.cloudinary.com/dvtbbuxon/image/upload/c_fill,g_auto:faces,w_800,h_600,f_auto,q_auto/v1768167106/WhatsApp_Image_2026-01-11_at_17.25.03_2_f88hyp.jpg"
                alt="Professional barber cutting men’s hair at The Grooming Room Barbershop in Kellyville"
                className="
                  h-full w-full object-cover
                  transition-transform duration-500
                  group-hover:scale-[1.04]
                "
                title= "Men’s Beard service in progress – The Grooming Room Kellyville"
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
            to="/mens-haircuts-beard-trims-kellyville"
            className="group rounded-2xl overflow-hidden border border-gray-200 bg-white hover:shadow-lg transition"
          >
            <div className="relative aspect-[4/3] overflow-hidden">
              <img
                src="https://res.cloudinary.com/dvtbbuxon/image/upload/v1768167322/WhatsApp_Image_2026-01-11_at_17.25.03_vi332u.jpg"
                alt="Clean fade haircut with coloured top finished at The Grooming Room Barbershop in Kellyville"
                className="
                  h-full w-full object-cover
                  transition-transform duration-500
                  group-hover:scale-[1.04]
                "
                title="Clean fade haircut result – Kellyville barber"
                loading="lazy"
              />
            </div>

            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Grey Hair Colouring Services
              </h3>

              <ul className="space-y-2 text-sm text-gray-800 list-disc list-inside">
                <li>Full grey coverage</li>
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
            to="/mens-haircuts-beard-trims-kellyville"
            className="
              inline-flex items-center justify-center
              rounded-full bg-[#FFF3E6]  text-[#7A3E00]  hover:bg-[#FFE6CF]
              px-8 py-3 font-semibold 
            "
          >
            View All Services
          </Link>
        </div>

      </div>
    </section>
  );
}

export default memo(OurWork);
