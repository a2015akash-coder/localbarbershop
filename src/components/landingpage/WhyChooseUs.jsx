import { memo } from "react";
import { Scissors, Star, ShieldCheck, MapPin } from "lucide-react";

const REASONS = [
  {
    Icon: Scissors,
    color: "bg-blue-50 text-blue-600",
    title: "Skilled Barbers, Consistent Results",
    text: "Experienced barbers who take the time to get your cut right — clean fades, sharp beards, and styles that suit you.",
  },
  {
    Icon: Star,
    color: "bg-yellow-50 text-yellow-700",
    title: "Walk In When It Suits You",
    text: "No appointments needed. We keep things moving without rushing your cut or cutting corners.",
  },
  {
    Icon: ShieldCheck,
    color: "bg-orange-50 text-orange-600",
    title: "Clean, Comfortable Environment",
    text: "A hygienic, relaxed space where adults and kids alike can sit back and enjoy the experience.",
  },
  {
    Icon: MapPin,
    color: "bg-blue-50 text-blue-600",
    title: "Trusted by Kellyville Locals",
    text: "Proudly serving the local community with loyal regulars and hundreds of positive reviews.",
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
              <span className="inline-block rounded-full bg-orange-50 px-5 py-2 text-base font-semibold tracking-wide text-orange-600">
                Why Choose Us
              </span>

              <h2
                id="why-choose-us"
                className="mt-6 font-semibold leading-tight tracking-tight"
                style={{
                  fontSize: "clamp(2.2rem, 4.6vw, 3.1rem)",
                  backgroundImage: "linear-gradient(90deg, #0f172a, #E6C35C)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                A Local Barbershop You Can Rely On
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
