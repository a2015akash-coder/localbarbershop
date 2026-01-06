import { memo } from "react";

const ContactInfo = memo(function ContactInfo() {
  return (
   <section className="bg-slate-50 section-spacing">

      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="max-w-2xl mb-16">
          <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900">
            Contact Details
          </h2> 

          <p className="mt-4 text-gray-600 text-base sm:text-lg">
            Everything you need to know before visiting — location,
            contact details, and opening hours.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

          {/* Address (Wide) */}
          <div className="lg:col-span-2 rounded-xl border border-gray-200 bg-gray-50 p-6">
            <h3 className="text-sm font-semibold text-gray-900">
              Address
            </h3>

            <div className="mt-2 h-1 w-10 bg-orange-500 rounded-full" />

            <p className="mt-4 text-gray-700 leading-relaxed">
              90 Wrights Road,<br />
              Kellyville, New South Wales 2155,<br />
              Australia
            </p>

            <p className="mt-3 text-sm text-gray-500">
              Easy access with nearby parking available.
            </p>
          </div>

          {/* Phone */}
          <div className="rounded-xl border border-gray-200 bg-white p-6">
            <h3 className="text-sm font-semibold text-gray-900">
              Phone
            </h3>

            <div className="mt-2 h-1 w-10 bg-orange-500 rounded-full" />

            <p className="mt-4 text-gray-700 text-lg font-medium">
              (02) 8883 1729
            </p>

            <p className="mt-2 text-sm text-gray-500">
              Call us for quick questions or availability.
            </p>
          </div>

          {/* Email */}
          <div className="rounded-xl border border-gray-200 bg-white p-6">
            <h3 className="text-sm font-semibold text-gray-900">
              Email
            </h3>

            <div className="mt-2 h-1 w-10 bg-orange-500 rounded-full" />

            <p className="mt-4 text-gray-700 break-all">
              groomingroombarber@gmail.com
            </p>

            <p className="mt-2 text-sm text-gray-500">
              For general enquiries only.
            </p>
          </div>

          {/* Opening Hours (Tall) */}
          <div className="lg:col-span-2 rounded-xl border border-gray-200 bg-gray-50 p-6">
            <h3 className="text-sm font-semibold text-gray-900">
              Opening Hours
            </h3>

            <div className="mt-2 h-1 w-10 bg-orange-500 rounded-full" />

            <ul className="mt-4 space-y-2 text-gray-700">
              <li>Mon – Wed,Fri: 09:00 – 17:30</li>
               <li>Thursday: 09:00 – 21:00</li>
              <li>Saturday: 09:00 – 17:00</li>
              <li>Sunday: 09:00 – 16:00</li>
            </ul>   

            <p className="mt-3 text-sm text-gray-500">
              Walk-ins welcome during business hours.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
});

export default ContactInfo;
