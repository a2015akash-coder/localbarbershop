import { memo } from "react";

const PRIZES = [
  { amount: "$100", count: "1 winner" },
  { amount: "$50", count: "6 winners" },
  { amount: "$20", count: "30 winners" },
];

const MonthlyPrizePool = memo(function MonthlyPrizePool() {
  return (
    <section className="bg-gray-50 py-10 lg:py-14">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">

        {/* HEADER */}
        <div className="max-w-xl mb-8">
          <h2 className="text-2xl sm:text-3xl font-semibold text-slate-900">
            Monthly Prize Pool:{" "}
            <span className="text-[#FF7A00]">$1,000</span>{" "}
            <span className="text-slate-500 font-medium">
              | 37 Winners
            </span>
          </h2>

          <p className="mt-2 text-slate-600 text-sm sm:text-base">
            February Draw: Shopping Vouchers
          </p>
        </div>

        {/* PRIZE CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {PRIZES.map((prize, i) => (
            <div
              key={i}
              className="
                rounded-3xl
                bg-[#FFF7ED]
                p-6
                text-center
                ring-1 ring-orange-100
              "
            >
              <div className="text-4xl font-semibold text-[#FF7A00]">
                {prize.amount}
              </div>

              <div className="mt-2 text-sm font-medium text-slate-700">
                {prize.count}
              </div>
            </div>
          ))}
        </div>

        {/* FOOTNOTE / TERMS */}
        <div className="mt-8 max-w-2xl">
          <p className="text-xs text-slate-500 leading-relaxed">
            T&Cs apply. Promotion period:{" "}
            <strong>1st February – 28th February 2026</strong>.
          </p>

          <a
            href=""
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-block text-xs font-medium text-[#FF7A00] hover:underline"
          >
            View full Terms & Conditions →
          </a>
        </div>

      </div>
    </section>
  );
});

export default MonthlyPrizePool;
