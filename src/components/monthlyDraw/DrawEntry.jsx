import { memo } from "react";

const DrawEntry = memo(function DrawEntry() {
  return (
    <section className="py-16 bg-slate-50">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* HEADER */}
        <div className="max-w-2xl mb-12">
          <h2
            className="font-semibold tracking-tight text-gray-900"
            style={{ fontSize: "clamp(2rem, 4vw, 2.6rem)" }}
          >
            Monthly Draw Entry
          </h2>

          <p className="mt-4 text-gray-600">
            After your service, scan the QR code in-store or complete the entry
            form below to enter the Monthly Legends Draw.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          {/* ENTRY FORM */}
          <div className="rounded-3xl bg-white p-6 shadow-sm">
            <div className="h-[3px] w-10 rounded-full bg-orange-500 mb-4" />

            <h3 className="text-lg font-semibold text-gray-900 mb-6">
              Enter the Draw
            </h3>

            <form className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  className="mt-1 w-full rounded-xl border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Mobile Number
                </label>
                <input
                  type="tel"
                  required
                  placeholder="04xx xxx xxx"
                  className="mt-1 w-full rounded-xl border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
                <p className="mt-1 text-xs text-gray-500">
                  Used only to notify winners.
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Service Received
                </label>
                <select
                  required
                  className="mt-1 w-full rounded-xl border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  <option value="">Select a service</option>
                  <option>Haircut</option>
                  <option>Beard Trim</option>
                  <option>Haircut & Beard Trim</option>
                  <option>Other Grooming Service</option>
                </select>
              </div>

              <div className="flex items-start gap-2">
                <input type="checkbox" required className="mt-1" />
                <p className="text-xs text-gray-600">
                  I agree to the Monthly Legends Draw terms and conditions.
                </p>
              </div>

              <button
                type="submit"
                className="
                  w-full rounded-full py-3
                  font-semibold text-white
                  bg-[#FF7A00] hover:bg-[#FF6A00]
                  transition
                "
              >
                Submit Entry
              </button>
            </form>
          </div>

          {/* TERMS */}
          <div className="rounded-3xl bg-white p-6 shadow-sm">
            <div className="h-[3px] w-10 rounded-full bg-orange-500 mb-4" />

            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Terms & Conditions
            </h3>

            <ul className="space-y-2 text-sm text-gray-600">
              <li>• One entry per eligible service</li>
              <li>• Promotion available in-store only</li>
              <li>• Winners notified by SMS</li>
              <li>• Prizes must be collected within 30 days</li>
              <li>
                • The Grooming Room Barbershop reserves the right to amend
                promotion details
              </li>
            </ul>
          </div>

        </div>
      </div>
    </section>
  );
});

export default DrawEntry;