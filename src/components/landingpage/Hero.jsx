import { useState, memo } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Star,
  CheckCircle,
  Scissors,
} from "lucide-react";

/* ------------------ IMAGES ------------------ */
const images = [
  {
    desktop:
      "https://res.cloudinary.com/dvtbbuxon/image/upload/f_auto,q_auto,w_1400/v1767533105/39f80663-2183-43e8-9b0d-a8a8df717517_bfnmjt.jpg",
    mobile:
      "https://res.cloudinary.com/dvtbbuxon/image/upload/f_auto,q_auto,w_700/v1767533105/39f80663-2183-43e8-9b0d-a8a8df717517_bfnmjt.jpg",
  },
  {
    desktop:
      "https://res.cloudinary.com/dvtbbuxon/image/upload/f_auto,q_auto,w_1400/v1767533862/IMG_4985_bhflvo.jpg",
    mobile:
      "https://res.cloudinary.com/dvtbbuxon/image/upload/f_auto,q_auto,w_700/v1767533862/IMG_4985_bhflvo.jpg",
  },
  {
    desktop:
      "https://res.cloudinary.com/dvtbbuxon/image/upload/f_auto,q_auto,w_1400/v1767533885/IMG_7763_mjbc36.jpg",
    mobile:
      "https://res.cloudinary.com/dvtbbuxon/image/upload/f_auto,q_auto,w_700/v1767533885/IMG_7763_mjbc36.jpg",
  },
];

/* ------------------ REVIEWS ------------------ */
const reviews = [
  { text: "Clean fades every time. Best barber in Kellyville.", name: "James R." },
  { text: "Walked in, no wait, perfect cut. Highly recommend.", name: "Daniel M." },
  { text: "Great with kids and very professional service.", name: "Alex P." },
];

function Hero() {
  const [current, setCurrent] = useState(0);
  const total = images.length;

  const next = () => setCurrent((p) => (p + 1) % total);
  const prev = () => setCurrent((p) => (p - 1 + total) % total);

  return (
    <section className="bg-white">
      {/* ================= HERO ================= */}
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 pt-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">

          {/* LEFT CONTENT */}
          <div className="flex flex-col">
            {/* Rating */}
            <div className="inline-flex w-fit items-center gap-3 rounded-full bg-gray-50 px-4 py-2">
              <img
                src="https://www.gstatic.com/images/branding/product/1x/gsa_512dp.png"
                alt="Google"
                className="h-5 w-5"
              />
              <div className="flex gap-[2px] text-[#FFB400]">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={16} fill="currentColor" stroke="none" />
                ))}
              </div>
              <span className="font-semibold">4.4★</span>
              <span className="text-gray-600">from 200+ Reviews</span>
            </div>

            <h1
              className="mt-6 font-bold leading-tight bg-clip-text text-transparent"
              style={{
                backgroundImage: "linear-gradient(90deg, #000000, #E6C35C)",
                fontSize: "clamp(2rem, 5vw, 3.1rem)",
              }}
            >
             Premium Barber Shop 

              <br />
             in Kellyville
            </h1>

            <p className="mt-4 text-gray-700 max-w-xl">
              The Grooming Room Barber Shop provides men’s haircuts, skin fades, coloring and beard trimming services in Kellyville. Walk-ins are welcome.


            </p>

            <ul className="mt-5 space-y-2 list-disc list-inside">
              <li>Walk-ins Welcome</li>
              <li>Free On-Site Parking</li>
              <li>Men & Kids Friendly</li>
            </ul>

            {/* CTA */}
            <div className="mt-7 flex gap-4 flex-wrap">
              <a
                href="tel:+61123456789"
                className="rounded-full bg-[#FF7A00] px-8 py-3 text-white font-semibold hover:opacity-90 transition"
              >
                Call Now
              </a>
              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noreferrer"
                className="rounded-full border px-8 py-3 font-semibold hover:bg-gray-50 transition"
              >
                Get Directions
              </a>
            </div>

            {/* TRUST CHIPS */}
            <div className="mt-5 flex flex-wrap gap-3">
              <div className="inline-flex items-center gap-2 rounded-full bg-gray-50 px-4 py-2 text-sm font-medium">
                <CheckCircle size={16} className="text-green-600" />
                Clear Pricing
              </div>
              <div className="inline-flex items-center gap-2 rounded-full bg-gray-50 px-4 py-2 text-sm font-medium">
                <Scissors size={16} className="text-orange-600" />
                Experienced Local Barbers
              </div>
            </div>
          </div>

          {/* RIGHT IMAGE CARD — MATCHES LEFT HEIGHT */}
         {/* RIGHT IMAGE CARD — HEIGHT MATCHES LEFT */}
{/* RIGHT IMAGE CARD */}
<div className="relative">
  <div
    className="
      relative overflow-hidden rounded-2xl shadow-xl bg-black
      h-[260px] sm:h-[320px] lg:h-full
    "
  >
    <div
      className="absolute inset-0 flex transition-transform duration-500 ease-out"
      style={{ transform: `translateX(-${current * 100}%)` }}
    >
      {images.map((img, i) => (
        <div key={i} className="min-w-full h-full">
          <picture>
            <source media="(max-width:640px)" srcSet={img.mobile} />
            <img
              src={img.desktop}
              alt="Barbershop"
              className="h-full w-full object-cover"
              draggable={false}
            />
          </picture>
        </div>
      ))}
    </div>

    {/* Arrows */}
    <button
      onClick={prev}
      className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 shadow"
    >
      <ChevronLeft size={20} />
    </button>

    <button
      onClick={next}
      className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 shadow"
    >
      <ChevronRight size={20} />
    </button>
  </div>
</div>


        </div>
      </div>

      {/* ================= REVIEW STRIP ================= */}
      <div className="bg-orange-50 mt-10">
        <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {reviews.map((r, i) => (
              <div key={i} className="text-center">
                <p className="text-sm italic text-gray-700">“{r.text}”</p>
                <div className="mt-2 font-semibold">{r.name}</div>
                <div className="mt-1 flex justify-center gap-[2px] text-[#FFB400]">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <Star key={j} size={14} fill="currentColor" stroke="none" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default memo(Hero);
