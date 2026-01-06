import { memo } from "react";
import { Link } from "react-router-dom";

function OurWork() {
  return (
    <section className="bg-white py-10">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">

        {/* HEADER */}
        <div className="mb-10 max-w-2xl">
          <h2
            className="font-semibold leading-tight tracking-tight"
            style={{
              fontSize: "clamp(2.2rem, 4.6vw, 3.1rem)",
              backgroundImage: "linear-gradient(90deg, #0f172a, #E6C35C)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Services & Pricing
          </h2>

          <p className="mt-4 max-w-lg text-base sm:text-lg text-gray-600 leading-relaxed">
            Simple pricing. No surprises.
          </p>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* PRIMARY CARD */}
          <Link
            to="/services"
            className="lg:col-span-2 group rounded-3xl bg-white overflow-hidden shadow-md hover:shadow-lg transition"
          >
            {/* IMAGE */}
            <div className="relative h-[340px] overflow-hidden">
              <img
                src="https://res.cloudinary.com/dvtbbuxon/image/upload/f_auto,q_auto,w_1200/v1767534115/IMG_5409_shfn4c.jpg"
                alt="Men’s cuts and grooming"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                loading="lazy"
              />
            </div>

            {/* CONTENT */}
            <div className="px-6 py-5">
              <h3 className="text-xl font-semibold text-gray-900">
                Men’s Cuts & Grooming
              </h3>

              <p className="mt-1 text-sm font-medium text-orange-600">
                From $30
              </p>

              <p className="mt-2 max-w-xl text-sm text-gray-600">
                Clean fades, classic styles, and sharp beard grooming — done right, every time.
              </p>
            </div>
          </Link>

          {/* SECONDARY CARDS */}
          <div className="flex flex-col gap-6">
            {[
              {
                title: "Beard Grooming",
                price: "From $25",
                text: "Sharp beard trims, clean shaves, and precise line-ups for a polished look.",
                src: "https://res.cloudinary.com/dvtbbuxon/image/upload/v1767626521/624158178e487621a677f49a_Parramatta-175_mexn85.jpg",
              },
              {
                title: "Hair Design",
                price: "From $20",
                text: "Custom hair designs and detailed line work for a bold, unique look.",
                src: "https://res.cloudinary.com/dvtbbuxon/image/upload/v1767626526/25493682304_cipoxh.png",
              },
            ].map((item) => (
              <Link
                key={item.title}
                to="/services"
                className="group rounded-3xl bg-white overflow-hidden shadow-md hover:shadow-lg transition"
              >
                {/* IMAGE */}
                <div className="relative h-[160px] overflow-hidden">
                  <img
                    src={item.src}
                    alt={item.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    loading="lazy"
                  />
                </div>

                {/* CONTENT */}
                <div className="px-4 py-4">
                  <h3 className="text-base font-semibold text-gray-900">
                    {item.title}
                  </h3>

                  <p className="mt-0.5 text-sm font-medium text-orange-600">
                    {item.price}
                  </p>

                  <p className="mt-1 text-sm text-gray-600">
                    {item.text}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-10 text-center">
          <Link
            to="/services"
            className="inline-flex items-center justify-center rounded-full px-8 py-3 font-semibold text-orange-600 border border-orange-200 hover:bg-orange-50 transition-colors"
          >
            View All Services
          </Link>
        </div>

      </div>
    </section>
  );
}

export default memo(OurWork);
