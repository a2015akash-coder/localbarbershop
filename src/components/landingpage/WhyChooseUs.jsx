import { memo } from "react";
import { Scissors, Star, ShieldCheck, MapPin } from "lucide-react";

const REASONS = [
  {
    Icon: Scissors,
    color: "bg-blue-50 text-blue-600",
    title: "Skilled Barbers",
    text: "We provide haircuts, beard trims, and grooming services for men and children in Kellyville and nearby areas.",
  },
  {
    Icon: Star,
    color: "bg-yellow-50 text-yellow-700",
    title: "Walk-Ins Welcome",
    text: "No booking required. Walk in during opening hours for a haircut or beard trim.",
  },
  {
    Icon: ShieldCheck,
    color: "bg-orange-50 text-orange-600",
    title: "Community Pricing",
    text: "Special pricing is available for kids, seniors, and new customers",
  },
  {
    Icon: MapPin,
    color: "bg-blue-50 text-blue-600",
    title: "Convenient Location",
    text: "Located at Kellyville Village Shopping Centre with free parking and nearby shops.",
  },
];

function WhyChooseUs() {
  return (
    <section className="bg-white section-spacing">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-stretch">

          {/* LEFT COLUMN — GROUPED */}
          <div className="rounded-3xl border border-gray-200 bg-white p-8 flex flex-col gap-10">

            {/* TEXT BLOCK */}
            <div>
             
              <h2
                id="why-choose-us"
                className="mt-6 font-semibold leading-tight tracking-tight"
                style={{
                  fontSize: "clamp(2rem, 4vw, 2.8rem)",
                  backgroundImage: "linear-gradient(90deg, #0f172a, #E6C35C)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Why Visit The Grooming Room Barber Shop
              </h2>

              <p className="mt-5 max-w-lg text-base sm:text-lg text-gray-600 leading-relaxed">
                We focus on the basics done right — quality haircuts,
                friendly service, and a clean, relaxed space that keeps
                locals coming back.
              </p>
            </div>

            {/* IMAGE BLOCK — CENTERED */}
            <div className="overflow-hidden rounded-2xl bg-gray-100">
              <div className="aspect-video">
                <img
                  src="https://res.cloudinary.com/dvtbbuxon/image/upload/f_auto,q_auto,w_1200,c_limit/v1767704060/interro_veoi1z.webp"
                  alt="Inside The Grooming Room Barbershop Kellyville"
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN — SINGLE CARD */}
          <div className="rounded-3xl border border-gray-200 bg-white p-8 flex flex-col justify-center">
            <div className="space-y-10">
              {REASONS.map(({ Icon, color, title, text }) => (
                <div key={title} className="flex gap-6">
                  <div
                    className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full ${color}`}
                  >
                    <Icon size={20} />
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {title}
                    </h3>
                    <p className="mt-2 text-base text-gray-600 leading-relaxed">
                      {text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default memo(WhyChooseUs);
