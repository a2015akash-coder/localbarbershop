import { memo } from "react";

const prizes = [
  { amount: "$100", winners: "1 winner" },
  { amount: "$50", winners: "4 winners" },
  { amount: "$30", winners: "10 winners" },
  { amount: "$20", winners: "10 winners" },
  { amount: "$10", winners: "25 winners" },
];

const steps = [
  "Get a haircut, beard trim, or eligible grooming service.",
  "Scan the QR code at the counter.",
  "Submit the short entry form.",
  "Spin the wheel in-store on the 24th of the month.",
  "Winners are notified by SMS.",
];

const DrawDetails = memo(function DrawDetails() {
  return (
    <section className="py-16 bg-slate-50">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* SECTION HEADER */}
        <div className="max-w-2xl mb-12">
          <h2 className="font-semibold tracking-tight text-gray-900 text-2xl sm:text-3xl">
            Monthly Draw Prizes & Entry
          </h2>

          <p className="mt-4 text-gray-600">
            Over 50 winners every month — just for getting a haircut or beard trim.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

          {/* PRIZES */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-6">
              Monthly Draw Prizes
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {prizes.map((prize) => (
                <div
                  key={prize.amount}
                  className="
                    rounded-2xl bg-white p-5
                    shadow-sm hover:shadow-md transition
                  "
                >
                  <div className="text-2xl font-semibold text-gray-900">
                    {prize.amount}
                  </div>

                  <div className="mt-1 text-sm text-gray-600">
                    {prize.winners}
                  </div>

                  <div className="mt-3 h-[3px] w-8 rounded-full bg-orange-500" />
                </div>
              ))}
            </div>
          </div>

          {/* HOW TO ENTER */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-6">
              How to Enter
            </h3>

            <ol className="space-y-4">
              {steps.map((step, index) => (
                <li
                  key={index}
                  className="flex items-start gap-4"
                >
                  <span className="
                    flex h-8 w-8 shrink-0 items-center justify-center
                    rounded-full bg-orange-500 text-white
                    text-sm font-semibold
                  ">
                    {index + 1}
                  </span>

                  <p className="text-gray-700 leading-relaxed">
                    {step}
                  </p>
                </li>
              ))}
            </ol>
          </div>

        </div>
      </div>
    </section>
  );
});

export default DrawDetails;
