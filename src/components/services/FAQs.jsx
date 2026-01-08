import { memo } from "react";

const FAQS = [
  {
    question: "Can I walk in for a haircut, or do I need to make a reservation?",
    answer:
      "We welcome walk-ins every day, and no appointment is required. If the shop is busy, there may be a short wait, but we always do our best to keep things moving without rushing your cut.",
  },
  {
    question: "Do you offer gift cards?",
    answer:
      "Yes, we offer gift cards that can be purchased in-store. They make a great gift for birthdays, holidays, or any special occasion.",
  },
  {
    question: "Do you cut kids’ hair?",
    answer:
      "Absolutely. We provide friendly, patient haircuts for kids of all ages in a comfortable and relaxed environment.",
  },
  {
    question: "Do you offer beard trims and shaves?",
    answer:
      "Yes, we offer professional beard trims, beard shaping, and clean shaves tailored to suit your face shape and style.",
  },
];

function FAQs() {
  return (
    <section className="bg-white section-spacing">
      <div className="mx-auto max-w-screen-md px-4 sm:px-6 lg:px-8">

        {/* HEADER */}
        <div className="mb-12">
          <h2 className="text-3xl sm:text-4xl font-semibold text-gray-900">
            Frequently Asked Questions
          </h2>

          <p className="mt-4 text-base sm:text-lg text-gray-600">
            If you can’t find the answer you’re looking for, feel free to reach
            out at{" "}
            <a
              href="mailto:groomingroombarber@gmail.com"
              className="font-medium text-orange-600 hover:underline"
            >
              groomingroombarber@gmail.com
            </a>
            .
          </p>
        </div>

        {/* FAQ LIST */}
        <div className="divide-y divide-gray-200">
          {FAQS.map((faq, index) => (
            <details
              key={index}
              className="group py-6"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-left">
                <h3 className="text-lg font-medium text-gray-900">
                  {faq.question}
                </h3>

                {/* Chevron */}
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gray-100 transition-transform duration-300 group-open:rotate-180">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-gray-700"
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </span>
              </summary>

              <div className="mt-4 max-w-3xl text-base text-gray-600 leading-relaxed">
                {faq.answer}
              </div>
            </details>
          ))}
        </div>

      </div>
    </section>
  );
}

export default memo(FAQs);