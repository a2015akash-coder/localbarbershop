import { memo } from "react";

function ContactSection() {
  return (
    <section className="bg-white pt-20 pb-24">

      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">

        {/* HEADER */}
       <div className="max-w-2xl mb-12">

            <h1
              className=" font-bold leading-tight bg-clip-text text-transparent"
              style={{
                backgroundImage: "linear-gradient(90deg, #000000, #E6C35C)",
                fontSize: "clamp(2rem, 5vw, 3.1rem)",
              }}
            >
             Reach Us Today

            </h1>

          <p className="mt-4 text-base sm:text-lg text-gray-600">
            Whether you’re planning a visit or have a quick question,
            reaching us is simple and straightforward.
          </p>

          <p className="mt-3 text-base font-medium text-gray-900">
            Better yet, see us in person!
          </p>
        </div>

        {/* MAIN GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

          {/* LEFT — CONTACT FORM */}
          <div className="rounded-3xl border border-gray-200 bg-white p-8">
            <form className="space-y-6">

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="Your name"
                  className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3 text-sm focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3 text-sm focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Message
                </label>
                <textarea
                  rows={4}
                  placeholder="How can we help?"
                  className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3 text-sm focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20"
                />
              </div>

              <button
                type="submit"
                className="inline-flex items-center justify-center rounded-full px-8 py-4 font-semibold text-white bg-[#FF7A00] hover:bg-[#FF6A00] transition shadow-md"
              >
                Send Message
              </button>

            </form>
          </div>

          {/* RIGHT — ACTION CARDS */}
          <div className="flex flex-col gap-10">

            {/* GET DIRECTIONS */}
            <div className="rounded-3xl border border-gray-200 bg-white p-8">
              <h3 className="text-lg font-semibold text-gray-900">
                Get Directions
              </h3>

              <div className="mt-2 h-[3px] w-10 rounded-full bg-orange-500" />

              <p className="mt-4 text-base text-gray-600 leading-relaxed">
                Find the quickest route to our barbershop and plan your visit
                with ease. We’re easy to reach and conveniently located.
              </p>

              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center justify-center rounded-full px-8 py-3 font-semibold text-white bg-[#FF7A00] hover:bg-[#FF6A00] transition shadow-md"
              >
                Open Maps
              </a>
            </div>

            {/* CALL US */}
            <div className="rounded-3xl border border-gray-200 bg-white p-8">
              <h3 className="text-lg font-semibold text-gray-900">
                Call Us
              </h3>

              <div className="mt-2 h-[3px] w-10 rounded-full bg-orange-500" />

              <p className="mt-4 text-base text-gray-600 leading-relaxed">
                Have a question about services, timings, or availability?
                Give us a quick call and we’ll be happy to help.
              </p>

              <a
                href="tel:+61288831729"
                className="mt-6 inline-flex items-center justify-center rounded-full px-8 py-3 font-semibold text-white bg-[#FF7A00] hover:bg-[#FF6A00] transition shadow-md"
              >
                Call Now
              </a>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}

export default memo(ContactSection);