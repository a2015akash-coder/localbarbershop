import { memo } from "react";

const ContactMap = memo(function ContactMap() {
  return (
    <section className="bg-white section-spacing">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="rounded-3xl border border-gray-200 bg-white p-8">

          {/* HEADER */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900">
              Find Us on the Map
            </h3>

            <p className="mt-2 text-base text-gray-600">
              We’re conveniently located and easy to find.
            </p>
          </div>

          {/* MAP (LAZY-LOADED, ALWAYS VISIBLE) */}
          <div className="aspect-[16/9] overflow-hidden rounded-2xl border border-gray-200">
            <iframe
              title="The Grooming Room Barbershop Location"
              src="https://www.google.com/maps?q=The+Grooming+Room+Barbershop+90+Wrights+Road+Kellyville+NSW+2155&output=embed"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-full w-full border-0"
            />
          </div>

        </div>
      </div>
    </section>
  );
});

export default ContactMap;
