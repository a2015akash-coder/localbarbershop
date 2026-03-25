import { memo } from "react";
import { MapPin, Scissors, ShieldCheck, Star } from "lucide-react";
import { Card } from "../ui/card";
import SectionHeading from "../ui/section-heading";

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
    text: "Special pricing is available for kids, seniors, and new customers.",
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
    <section className="cv-auto bg-gray-50 section-spacing">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-stretch gap-16 lg:grid-cols-2 lg:gap-20">
          <Card className="flex flex-col gap-10 p-8 lg:p-10">
            <div id="why-choose-us">
              <SectionHeading
                eyebrow="Why Choose Us"
                title="Why visit The Grooming Room Barber Shop"
                description="We focus on the basics done right - quality haircuts, friendly service, and a clean, relaxed space that keeps locals coming back."
                className="max-w-lg"
                titleClassName="text-[clamp(1.85rem,3.2vw,2.6rem)]"
              />
            </div>

            <div className="overflow-hidden rounded-[24px] bg-gray-100">
              <div className="aspect-video">
                <img
                  src="https://res.cloudinary.com/dvtbbuxon/image/upload/f_auto,q_auto,w_1200,c_limit/v1767704060/interro_veoi1z.webp"
                  alt="Interior of The Grooming Room Barbershop in Kellyville showing barber chairs, reception counter, and waiting area"
                  title="The Grooming Room Barbershop interior - Kellyville"
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </Card>

          <Card className="flex flex-col justify-center p-8 lg:p-10">
            <div className="space-y-5">
              {REASONS.map(({ Icon, color, title, text }) => (
                <div
                  key={title}
                  className="flex gap-5 rounded-[24px] bg-[var(--muted)]/60 p-5"
                >
                  <div
                    className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${color}`}
                  >
                    <Icon size={20} />
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-slate-900">
                      {title}
                    </h3>
                    <p className="mt-2 text-base leading-relaxed text-slate-600">
                      {text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}

export default memo(WhyChooseUs);
