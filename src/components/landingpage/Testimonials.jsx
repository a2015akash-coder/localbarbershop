import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
  {
    name: "Alex Parker",
    date: "07 Dec 2025",
    initial: "A",
    text: "Great with kids and very professional service.",
    color: "bg-pink-100 text-pink-700",
  },
  {
    name: "Paul Jefferson",
    date: "15 Dec 2025",
    initial: "P",
    text: "Wonderful service. Dilen does an excellent job every time.",
    color: "bg-orange-100 text-orange-700",
  },
  {
    name: "Anthony Coombs",
    date: "15 Dec 2025",
    initial: "A",
    text: "Fantastic job. Dylan says I look five years younger.",
    color: "bg-yellow-100 text-yellow-700",
  },
  {
    name: "Michael Turner",
    date: "10 Dec 2025",
    initial: "M",
    text: "Clean shop, great fades, and friendly staff. Highly recommend.",
    color: "bg-blue-100 text-blue-700",
  },
  {
    name: "Bruce Wright",
    date: "17 Dec 2025",
    initial: "B",
    text: "Dani is the ultimate barber. Been following him around for years.",
    color: "bg-green-100 text-green-700",
  },
];

const CARD_WIDTH = 380;
const GAP = 32;
const SLIDE_DISTANCE = CARD_WIDTH + GAP;
const VISIBLE = 3;

export default function Testimonials() {
  const [items, setItems] = useState(testimonials);
  const [offset, setOffset] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const trackRef = useRef(null);

  const slideNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setOffset(-SLIDE_DISTANCE);
  };

  const slidePrev = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setOffset(SLIDE_DISTANCE);
  };

  useEffect(() => {
    if (!isAnimating || !trackRef.current) return;

    const handleEnd = () => {
      setItems((prev) =>
        offset < 0
          ? [...prev.slice(1), prev[0]]
          : [prev[prev.length - 1], ...prev.slice(0, -1)]
      );
      setOffset(0);
      setIsAnimating(false);
    };

    const el = trackRef.current;
    el.addEventListener("transitionend", handleEnd, { once: true });

    return () => el.removeEventListener("transitionend", handleEnd);
  }, [isAnimating, offset]);

  return (
    <section className="cv-auto bg-orange-50 section-spacing">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">

        {/* HEADER */}
        <div className="mb-12 max-w-2xl">
          <h2
            className="font-semibold tracking-tight"
            style={{
              fontSize: "clamp(1.9rem, 3.5vw, 2.6rem)",
              backgroundImage:
                "linear-gradient(90deg, #0f172a 0%, #a88c3a 60%, #e6c35c 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            What Our Clients Say
          </h2>

          <p className="mt-3 text-base text-slate-600">
            Rated 4.4★ on Google by 200+ locals for consistent results.
          </p>
        </div>

        {/* MOBILE – SCROLL SNAP */}
        <div className="lg:hidden -mx-4 px-4 overflow-x-auto snap-x snap-mandatory">
          <div className="flex gap-4 pb-6">
            {testimonials.map((t, i) => (
              <div
                key={i}
                className="snap-center flex-shrink-0 w-[85vw] max-w-sm"
              >
                <div className="rounded-3xl bg-white p-7 shadow-sm text-center">
                  <div
                    className={`mx-auto mb-5 flex h-18 w-18 items-center justify-center rounded-full text-lg font-semibold ${t.color}`}
                  >
                    {t.initial}
                  </div>

                  <div className="mb-3 text-orange-500 text-lg">★★★★★</div>

                  <p className="text-sm text-slate-600 leading-relaxed">
                    “{t.text}”
                  </p>

                  <div className="mt-4 font-semibold text-slate-900">
                    {t.name}
                  </div>

                  <div className="text-xs text-slate-500">{t.date}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* DESKTOP – CAROUSEL */}
        <div className="relative hidden lg:block">

          {/* FRAME */}
          <div className="overflow-hidden py-8">
            <div
              ref={trackRef}
              className="flex gap-8 will-change-transform"
              style={{
                transform: `translateX(${offset}px)`,
                transition: isAnimating
                  ? "transform 620ms cubic-bezier(0.22, 1, 0.36, 1)"
                  : "none",
              }}
            >
              {items.slice(0, VISIBLE + 1).map((t, i) => (
                <div key={i} className="flex-shrink-0 w-[380px]">
                  <div className="rounded-3xl bg-white p-9 shadow-sm text-center">
                    <div
                      className={`mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full text-xl font-semibold ${t.color}`}
                    >
                      {t.initial}
                    </div>

                    <div className="mb-4 text-orange-500 text-lg">★★★★★</div>

                    <p className="text-base text-slate-600 leading-relaxed">
                      “{t.text}”
                    </p>

                    <div className="mt-6 font-semibold text-slate-900">
                      {t.name}
                    </div>

                    <div className="mt-1 text-sm text-slate-500">
                      {t.date}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CONTROLS */}
          <button
            onClick={slidePrev}
            className="
              absolute -left-6 top-1/2 -translate-y-1/2
              h-12 w-12 rounded-full
              bg-white shadow-md
              hover:bg-orange-50 transition
              flex items-center justify-center
            "
            aria-label="Previous review"
          >
            <ChevronLeft size={22} />
          </button>

          <button
            onClick={slideNext}
            className="
              absolute -right-6 top-1/2 -translate-y-1/2
              h-12 w-12 rounded-full
              bg-white shadow-md
              hover:bg-orange-50 transition
              flex items-center justify-center
            "
            aria-label="Next review"
          >
            <ChevronRight size={22} />
          </button>
        </div>
      </div>
    </section>
  );
}
